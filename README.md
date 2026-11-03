# Baruch-Ermi LLC — unified company platform

Next.js company website with same-origin authenticated Lead Desk and Creative Financing routes. See `docs/UNIFIED_REBRAND_REVIEW.md` for audit findings, configuration, data preservation, verification limits, rollout and rollback.

## Development

`npm ci`, then configure a local `.env.local` using `.env.example`. For isolated local review, set LOCAL_DATABASE_PATH, OWNER_EMAIL, BETTER_AUTH_SECRET, BETTER_AUTH_URL and a strong temporary BOOTSTRAP_PASSWORD. Run `node --env-file=.env.local scripts/setup-local.mjs`; remove BOOTSTRAP_PASSWORD afterward. Use the managed preview command where provided, otherwise `npm run dev`.

## Verification

- `npm test`
- `cd vendor/lead && node --test test.mjs api-test.mjs outreach-test.mjs v4-test.mjs`
- `npm run build`

Public routes are reviewable without a database. Data capture and private tools fail closed until storage/auth are configured. Never use ephemeral serverless SQLite for production persistence. Do not publish, migrate live data, or activate paid provider calls without owner approval.
