import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Basic origin check (CORS-like enforcement for same-site requests)
  const { ALLOWED_ORIGINS } = process.env;
  try {
    const origin = req.headers.origin || '';
    const host = req.headers.host || '';
    const defaults = [`https://${host}`, `http://${host}`];
    const allowed = (ALLOWED_ORIGINS ? ALLOWED_ORIGINS.split(',') : []).map((s) => s.trim()).filter(Boolean);
    const allowList = [...allowed, ...defaults, 'http://localhost:5173', 'http://localhost:3000'];
    if (origin && !allowList.includes(origin)) {
      return res.status(403).json({ error: 'Forbidden origin' });
    }
  } catch (_) {
    // Non-fatal: proceed without origin block if header parsing fails
  }

  // Enforce JSON content and a small payload size
  if (!req.headers['content-type']?.includes('application/json')) {
    return res.status(415).json({ error: 'Unsupported Media Type' });
  }
  const raw = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {});
  if (raw.length > 5000) {
    return res.status(413).json({ error: 'Payload too large' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const { name = '', email = '', message = '', hp = '', turnstileToken = '' } = body;

  // Honeypot: silently accept and do nothing
  if (hp && typeof hp === 'string' && hp.trim().length > 0) {
    return res.status(200).json({ ok: true });
  }

  // Turnstile (server-side) verification: only used on form submit, never blocks page load
  const { TURNSTILE_SECRET_KEY } = process.env;
  if (TURNSTILE_SECRET_KEY) {
    // If a secret is configured, require a token and verify it.
    if (!turnstileToken || typeof turnstileToken !== 'string' || turnstileToken.trim().length === 0) {
      return res.status(400).json({ error: 'Missing captcha token' });
    }

    try {
      const ip = (req.headers['x-forwarded-for'] || '').toString().split(',')[0].trim();
      const params = new URLSearchParams();
      params.set('secret', TURNSTILE_SECRET_KEY);
      params.set('response', turnstileToken);
      if (ip) params.set('remoteip', ip);

      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      const verifyJson = await verifyRes.json();
      if (!verifyJson?.success) {
        return res.status(403).json({ error: 'Captcha verification failed' });
      }
    } catch (e) {
      // If verification infrastructure fails, do not send email
      return res.status(503).json({ error: 'Captcha verification unavailable' });
    }
  }

  // Basic validation and sanitization
  const safe = (s) => String(s || '').replace(/[\r\n\t]/g, ' ').trim();
  const nameSafe = safe(name).slice(0, 100);
  const emailSafe = safe(email).slice(0, 200);
  const messageSafe = safe(message);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if (!nameSafe || !emailRegex.test(emailSafe) || !messageSafe) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  // Enforce server-side message length limit (500 chars)
  if (messageSafe.length > 500) {
    return res.status(400).json({ error: 'Message too long (max 500)' });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, FROM_EMAIL } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return res.status(500).json({ error: 'Email transport is not configured' });
  }

  try {
    const port = Number(SMTP_PORT);
    const secure = SMTP_SECURE === 'true' || port === 465;

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const to = 'ian@repsher.dev';
    const from = FROM_EMAIL || SMTP_USER;

    await transporter.sendMail({
      from,
      to,
      subject: `New message from ${nameSafe} via portfolio`,
      replyTo: emailSafe,
      text: `Name: ${nameSafe}\nEmail: ${emailSafe}\n\nMessage:\n${messageSafe}`,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Email send failed', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
