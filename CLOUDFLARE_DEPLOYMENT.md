# Cloudflare Pages Deployment

This project is configured for Cloudflare Pages.

## Build settings

- Framework preset: `React (Vite)`
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: `20.x`

## Runtime variables

Set these in Cloudflare Pages under Settings > Environment variables:

- `VITE_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_EMAIL_API_TOKEN`
- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL`
- `ALLOWED_ORIGINS`

`CONTACT_FROM_EMAIL` must be a sender allowed by Cloudflare Email Service. `CONTACT_TO_EMAIL` defaults to `ian@repsher.dev` if omitted.

For local Pages Functions testing, use Wrangler and add secrets with `wrangler pages secret put`.
