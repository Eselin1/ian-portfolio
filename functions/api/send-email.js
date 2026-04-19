const MAX_BODY_LENGTH = 5000;
const MAX_MESSAGE_LENGTH = 500;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
    },
  });

const clean = (value, maxLength) =>
  String(value || '')
    .replace(/[\r\n\t]/g, ' ')
    .trim()
    .slice(0, maxLength);

const isAllowedOrigin = (request, env) => {
  const origin = request.headers.get('Origin') || '';
  if (!origin) return true;

  const url = new URL(request.url);
  const defaults = [
    `${url.protocol}//${url.host}`,
    'http://localhost:5173',
    'http://localhost:8788',
    'http://localhost:3000',
  ];
  const configured = (env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  return [...configured, ...defaults].includes(origin);
};

const verifyTurnstile = async (request, env, token) => {
  if (!env.TURNSTILE_SECRET_KEY) return true;
  if (!token || typeof token !== 'string' || !token.trim()) return false;

  const params = new URLSearchParams();
  params.set('secret', env.TURNSTILE_SECRET_KEY);
  params.set('response', token);

  const ip = request.headers.get('CF-Connecting-IP') || '';
  if (ip) params.set('remoteip', ip);

  const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  const verifyJson = await verifyRes.json();
  return Boolean(verifyJson?.success);
};

const sendEmail = async (env, { name, email, message }) => {
  const accountId = env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = env.CLOUDFLARE_EMAIL_API_TOKEN;
  const to = env.CONTACT_TO_EMAIL || 'ian@repsher.dev';
  const from = env.CONTACT_FROM_EMAIL;

  if (!accountId || !apiToken || !from) {
    throw new Error('Email transport is not configured');
  }

  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/email/sending/send`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        from,
        reply_to: email,
        subject: `New message from ${name} via portfolio`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      }),
    }
  );

  const result = await res.json().catch(() => null);
  if (!res.ok || result?.success === false) {
    console.error('Cloudflare Email send failed', result || res.statusText);
    throw new Error('Failed to send email');
  }
};

export async function onRequest({ request, env }) {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  if (!isAllowedOrigin(request, env)) {
    return json({ error: 'Forbidden origin' }, 403);
  }

  if (!request.headers.get('content-type')?.includes('application/json')) {
    return json({ error: 'Unsupported Media Type' }, 415);
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_LENGTH) {
    return json({ error: 'Payload too large' }, 413);
  }

  let body;
  try {
    body = JSON.parse(raw || '{}');
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const { hp = '', turnstileToken = '' } = body;
  if (typeof hp === 'string' && hp.trim()) {
    return json({ ok: true });
  }

  try {
    const turnstileOk = await verifyTurnstile(request, env, turnstileToken);
    if (!turnstileOk) {
      return json({ error: 'Captcha verification failed' }, 403);
    }
  } catch {
    return json({ error: 'Captcha verification unavailable' }, 503);
  }

  const name = clean(body.name, 100);
  const email = clean(body.email, 200);
  const message = clean(body.message, MAX_MESSAGE_LENGTH + 1);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  if (!name || !emailRegex.test(email) || !message) {
    return json({ error: 'Invalid input' }, 400);
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return json({ error: 'Message too long (max 500)' }, 400);
  }

  try {
    await sendEmail(env, { name, email, message });
    return json({ ok: true });
  } catch (error) {
    console.error('Email send failed', error);
    return json({ error: 'Failed to send email' }, 500);
  }
}
