# Cloudflare Pages Deployment

This project is configured for Cloudflare Pages.

## Build settings

- Framework preset: `React (Vite)`
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: `20.x`

## Runtime variables

Set these in Cloudflare Pages under Settings > Environment variables:

- `VITE_CONTACT_WORKER_URL`
- `VITE_CONTACT_SITE_ID`

Recommended values:

```text
VITE_CONTACT_WORKER_URL=https://contact.repsher.dev
VITE_CONTACT_SITE_ID=ian-portfolio
```

The contact Worker is managed in a separate private repository at `/Users/ianrepsher/contact-worker` and sends through Zoho SMTP with `helper@repsher.dev` as the sender.
