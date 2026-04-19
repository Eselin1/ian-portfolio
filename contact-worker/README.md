# Repsher Contact Worker

This Worker receives contact form submissions from approved sites and sends the messages through Zoho SMTP with `helper@repsher.dev` as the sender.

## Zoho setup

For a free Zoho Mail account, the default SMTP settings are:

```text
SMTP_HOST=smtp.zoho.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=helper@repsher.dev
```

If the account has 2FA enabled, create a Zoho app-specific password and use it as `SMTP_PASS`.

## Cloudflare setup

1. Deploy this Worker from `contact-worker/`.
2. Add a custom domain such as `contact.repsher.dev`.
3. Add each site to `CONTACT_SITE_CONFIG` in `wrangler.toml`.
4. Add `SMTP_USER` and `SMTP_PASS` as Worker secrets.

Each site needs:

- `label`: shown in the email subject/body.
- `to`: destination email address.
- `origins`: exact browser origins allowed to submit.

Example:

```json
{
  "site-id": {
    "label": "Example Site",
    "to": "owner@example.com",
    "origins": ["https://example.com", "https://www.example.com"]
  }
}
```

## Deploy

```bash
cd contact-worker
npx wrangler secret put SMTP_USER
npx wrangler secret put SMTP_PASS
npx wrangler deploy
```

## Portfolio Pages variables

Set these on the Cloudflare Pages project:

```text
VITE_CONTACT_WORKER_URL=https://contact.repsher.dev
VITE_CONTACT_SITE_ID=ian-portfolio
```
