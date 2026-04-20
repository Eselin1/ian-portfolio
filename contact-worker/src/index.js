import { connect } from 'cloudflare:sockets';

const MAX_BODY_LENGTH = 5000;
const MAX_MESSAGE_LENGTH = 500;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const encoder = new TextEncoder();
const decoder = new TextDecoder();

class SmtpError extends Error {
  constructor(code, message) {
    super(message);
    this.name = 'SmtpError';
    this.code = code;
  }
}

const json = (body, status = 200, origin = '') =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': origin || 'null',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
      Vary: 'Origin',
    },
  });

const clean = (value, maxLength) =>
  String(value || '')
    .replace(/[\r\n\t]/g, ' ')
    .trim()
    .slice(0, maxLength);

const cleanMessage = (value) =>
  String(value || '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim()
    .slice(0, MAX_MESSAGE_LENGTH + 1);

const escapeHeader = (value) => clean(value, 200).replace(/"/g, "'");

const parseSiteConfig = (env) => {
  try {
    return JSON.parse(env.CONTACT_SITE_CONFIG || '{}');
  } catch {
    return {};
  }
};

const getSite = (env, siteId) => {
  const sites = parseSiteConfig(env);
  return sites[siteId] || null;
};

const isOriginAllowed = (site, origin) => {
  if (!origin || !site?.origins?.length) return false;
  return site.origins.includes(origin);
};

const findSiteByOrigin = (env, origin) => {
  const sites = parseSiteConfig(env);
  return Object.values(sites).find((site) => isOriginAllowed(site, origin)) || null;
};

const formatDate = () => new Date().toUTCString();

const dotStuff = (value) => value.replace(/\r?\n/g, '\r\n').replace(/^\./gm, '..');

const buildEmail = ({ sender, recipient, site, name, email, subject, message }) => {
  const safeSubject = escapeHeader(subject || `New message from ${name} via ${site.label}`);
  const text = [
    `Site: ${site.label}`,
    `Name: ${name}`,
    `Email: ${email}`,
    '',
    'Message:',
    message,
  ].join('\n');

  return [
    `From: "${escapeHeader(site.label)}" <${sender}>`,
    `To: <${recipient}>`,
    `Reply-To: <${email}>`,
    `Subject: ${safeSubject}`,
    `Date: ${formatDate()}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    '',
    dotStuff(text),
  ].join('\r\n');
};

const parseSmtpCode = (line) => Number(line.slice(0, 3));

const classifySmtpResponse = (response) => {
  const message = response.lines.join(' | ').toLowerCase();
  const code = response.code;

  if ([535, 534, 530].includes(code)) return 'SMTP_AUTH_FAILED';
  if ([550, 551, 553, 554].includes(code)) return 'SMTP_RECIPIENT_OR_SENDER_REJECTED';
  if (code === 421) return 'SMTP_SERVICE_UNAVAILABLE';
  if (code === 454) return 'SMTP_TEMPORARY_AUTH_FAILURE';
  if (message.includes('daily')) return 'SMTP_DAILY_LIMIT';
  if (message.includes('quota')) return 'SMTP_QUOTA';

  return `SMTP_UNEXPECTED_${code || 'RESPONSE'}`;
};


const createSmtpClient = async ({ host, port, secure }) => {
  const socket = connect(
    { hostname: host, port },
    { secureTransport: secure ? 'on' : 'starttls' }
  );
  await socket.opened;

  let activeSocket = socket;
  let reader = activeSocket.readable.getReader();
  let writer = activeSocket.writable.getWriter();
  let buffer = '';

  const close = async () => {
    try {
      reader.releaseLock();
      writer.releaseLock();
      await activeSocket.close();
    } catch {
      // Best-effort cleanup only.
    }
  };

  const writeLine = async (line) => {
    await writer.write(encoder.encode(`${line}\r\n`));
  };

  const readResponse = async () => {
    const lines = [];

    while (true) {
      const newlineIndex = buffer.indexOf('\n');
      if (newlineIndex >= 0) {
        const rawLine = buffer.slice(0, newlineIndex + 1);
        buffer = buffer.slice(newlineIndex + 1);
        const line = rawLine.replace(/\r?\n$/, '');
        lines.push(line);

        if (/^\d{3} /.test(line)) {
          return { code: parseSmtpCode(line), lines };
        }
      } else {
        const { value, done } = await reader.read();
        if (done) {
          throw new SmtpError('SMTP_CONNECTION_CLOSED', 'SMTP connection closed unexpectedly');
        }
        buffer += decoder.decode(value, { stream: true });
      }
    }
  };

  const expect = async (expectedCodes) => {
    const response = await readResponse();
    if (!expectedCodes.includes(response.code)) {
      throw new SmtpError(
        classifySmtpResponse(response),
        `Unexpected SMTP response ${response.code}`
      );
    }
    return response;
  };

  const command = async (line, expectedCodes) => {
    await writeLine(line);
    return expect(expectedCodes);
  };

  const startTls = async () => {
    await command(`EHLO ${host}`, [250]);
    await command('STARTTLS', [220]);

    reader.releaseLock();
    writer.releaseLock();
    activeSocket = activeSocket.startTls();
    await activeSocket.opened;
    reader = activeSocket.readable.getReader();
    writer = activeSocket.writable.getWriter();
    buffer = '';
    await command(`EHLO ${host}`, [250]);
  };

  const sendRaw = async ({ username, password, from, to, rawEmail }) => {
    await expect([220]);

    if (secure) {
      await command(`EHLO ${host}`, [250]);
    } else {
      await startTls();
    }

    await command('AUTH LOGIN', [334]);
    await command(btoa(username), [334]);
    await command(btoa(password), [235]);
    await command(`MAIL FROM:<${from}>`, [250]);
    await command(`RCPT TO:<${to}>`, [250, 251]);
    await command('DATA', [354]);
    await writer.write(encoder.encode(`${rawEmail}\r\n.\r\n`));
    await expect([250]);
    await command('QUIT', [221]);
  };

  return { close, sendRaw };
};

const sendSmtpEmail = async (env, { to, rawEmail }) => {
  const host = env.SMTP_HOST || 'smtp.zoho.com';
  const port = Number(env.SMTP_PORT || 465);
  const secure = String(env.SMTP_SECURE || 'true') === 'true';
  const username = env.SMTP_USER;
  const password = env.SMTP_PASS;
  const from = env.CONTACT_SENDER || username;

  if (!host || !port || !username || !password || !from) {
    throw new SmtpError('SMTP_NOT_CONFIGURED', 'SMTP is not configured');
  }

  const smtp = await createSmtpClient({ host, port, secure });
  try {
    await smtp.sendRaw({ username, password, from, to, rawEmail });
  } finally {
    await smtp.close();
  }
};

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    if (request.method === 'OPTIONS') {
      if (!findSiteByOrigin(env, origin)) {
        return json({ error: 'Forbidden origin' }, 403, origin);
      }
      return json({ ok: true }, 200, origin);
    }

    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, origin);
    }

    if (!request.headers.get('content-type')?.includes('application/json')) {
      return json({ error: 'Unsupported Media Type' }, 415, origin);
    }

    const raw = await request.text();
    if (raw.length > MAX_BODY_LENGTH) {
      return json({ error: 'Payload too large' }, 413, origin);
    }

    let body;
    try {
      body = JSON.parse(raw || '{}');
    } catch {
      return json({ error: 'Invalid JSON' }, 400, origin);
    }

    const siteId = clean(body.siteId || 'ian-portfolio', 80);
    const site = getSite(env, siteId);
    if (!site) {
      return json({ error: 'Unknown site' }, 400, origin);
    }

    if (!isOriginAllowed(site, origin)) {
      return json({ error: 'Forbidden origin' }, 403, origin);
    }

    if (typeof body.hp === 'string' && body.hp.trim()) {
      return json({ ok: true }, 200, origin);
    }

    const sender = env.CONTACT_SENDER || env.SMTP_USER || 'helper@repsher.dev';
    const name = clean(body.name, 100);
    const email = clean(body.email, 200);
    const subject = clean(body.subject, 180);
    const message = cleanMessage(body.message);

    if (!name || !EMAIL_REGEX.test(email) || !message) {
      return json({ error: 'Invalid input' }, 400, origin);
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return json({ error: 'Message too long' }, 400, origin);
    }

    if (!site.to || !EMAIL_REGEX.test(site.to)) {
      return json({ error: 'Recipient is not configured' }, 500, origin);
    }

    const rawEmail = buildEmail({
      sender,
      recipient: site.to,
      site,
      name,
      email,
      subject,
      message,
    });

    try {
      await sendSmtpEmail(env, { to: site.to, rawEmail });
      return json({ ok: true }, 200, origin);
    } catch (error) {
      console.error('Email send failed', error);
      return json(
        {
          error: 'Failed to send message',
          code: error?.code || 'SMTP_SEND_FAILED',
        },
        502,
        origin
      );
    }
  },
};
