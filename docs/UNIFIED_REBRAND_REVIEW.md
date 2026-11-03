# Baruch-Ermi unified company platform — review build

Prepared November 3, 2026. No production deployment, live database mutation, DNS changes, or outreach activation.

## Source audit and decisions

- Canonical company hostname confirmed in Vercel: `baruch-ermi.org`. Company main baseline: `56ee544b04b59b8cb528d25888259a37ce71686d`, Next.js 13.5.6 static export. The company project had no configured environment variables.
- Financing baseline: `b75fcaa578d17307bd87d1af6766d7b48cacbe20`, Vite/React. Existing calculator, printable sheet, presets, strategy guide, pitch generator and form components are retained under `vendor/finance` with attribution in `SOURCE_PROVENANCE.md`.
- Original Lead Desk project: `appgprj_6acbc90edc7c8191aba7df2446649628`; recovered source commit `7bb04e7cdd1660d69c6a1a43c5a4a4b14924409f`, Version 4. Its data is browser-local, not D1 or PostgreSQL. Original origin and records remain untouched. Existing tests and original modules are retained under `vendor/lead`.
- Reviewed both prior draft PRs. This PR supersedes the company link-only portal design. Financing's standalone PR remains optional; it is not required for the unified company deployment. Neither prior PR should be merged as a prerequisite to this design.
- Upgrade the existing Next.js Pages Router to Next.js 16 with server rendering/API routes. Remove static export, which cannot serve authenticated data endpoints. Financing is a native React page. Lead Desk is its existing native HTML/ES-module application served by an authorized Next.js route at `/lead-desk`, with same-origin API persistence. No external redirects or iframes are used for either tool.

## Public website

Restrained navy, ivory and gold visual system; original architectural illustration (not a real listing or borrowed property photograph); responsive navigation; seller, investor and agent journeys; local-market copy; contact, about, options, FAQ and privacy/terms pages. No fabricated testimonials, results, biographies, listings or promised returns. Contact phone/email preserved from existing source.

Public routes: `/`, `/sell-your-property`, `/investors`, `/agent-partners`, `/about`, `/contact`, `/options`, `/services`, `/faq`, `/privacy-policy`, `/terms`.

Permanent legacy redirects: `/get-offer` → `/sell-your-property`; `/agent-partner` → `/agent-partners`; `/team-portal` → `/portal`.

Public inquiry capture now uses a same-origin API instead of the previous Formspree endpoints. The original deployed forms remain unchanged until a production cutover is approved. This is a deliberate replacement, not a claim of Formspree/CRM dual delivery. Form fields are validated server-side; inquiry-related and promotional SMS consent are independent and unchecked by default. Honeypot, minimum elapsed time, same-origin checks, durable email-based throttling, and retry deduplication are implemented. A production spam provider can be added later if abuse warrants it. No automated email/SMS is sent.

## Protected workspace and shared data

Better Auth email/password sessions with public registration disabled and server-side owner-email authorization on every private page and data endpoint. Eight-hour sessions, no public caching, same-origin mutations. No real owner account or credentials are included in source. Configure OWNER_EMAIL and bootstrap the authorized account through the isolated migration script.

Storage is PostgreSQL in deployed environments. SQLite is supported only for explicitly configured local review; the app refuses that fallback on Vercel. No in-memory or ephemeral serverless storage is presented as durable storage. Missing config fails closed. Schema includes workspace, inquiries, scenarios, and request-limit tables, alongside the auth library's tables.

The existing Version 4 workspace is retained as a validated JSON envelope with optimistic revision compare-and-swap writes. Probate parsing, grouping, source/party merges, verification, research notes, contact history, opt-outs, exports and backup restore logic are reused. Restore is additive and retains conflict recovery copies. A failed queued cloud save locks further saves and asks for a backup; never reload before exporting pending work. Editing multiple sessions can cause a revision conflict by design rather than silently overwriting data.

Inquiries are stored with type, source, timestamp, and explicit consent. Seller/agent inquiries with an address create one unverified property record using the stable inquiry ID. Investor/general inquiries remain distinct. Retries reuse the inquiry and property ID.

Lead Desk opens Creative Financing via a temporary browser-stored property ID (no contact details in URLs). Financing reloads the authenticated property record, leaves unknown amounts at zero, and stores named scenarios against its stable property ID. Existing calculator assumptions, including the simplified 20% operating allowance, are labeled. This is not a full amortization/loan-origination engine.

## Credential finding

The original public financing source contained a hard-coded RentCast API credential. The migrated client removes it; the provider endpoint reads only server-side configuration and remains disabled unless RENTCAST_ENABLED=true. Rotate the original credential in RentCast and clean up the original app/history as appropriate before further exposure. No provider requests were made in this work. Do not enable a potentially billable provider without approval.

## Verification

- 39 original Lead Desk tests passed against retained original assets.
- 12 new tests passed: authenticated owner session, anonymous page/API rejection, public signup rejection, form-to-property capture, source/consent retention, inquiry deduplication, investor separation, origin/spam/validation checks, server-persisted probate grouping/reimport, stale-write rejection, multiple scenario save/reload, invalid scenario rejection, provider disabled state, durable rate limiting, and retained calculation formulas/zero and negative cases.
- Next.js production build and TypeScript checking passed before final packaging; rerun on final source SHA in CI.
- Tests use disposable local SQLite and fictional values only. PostgreSQL adapter and hosted migrations require verification on an isolated preview database before production approval.
- Managed local browser QA was blocked by browser policy / unavailable preview routing. No browser workaround was attempted. Responsive appearance, keyboard flow, file-picker import, print dialog, and the full browser → API → database flow remain unverified. API/auth tests are direct handler integrations, not a substitute for browser E2E testing.
- The hosted review preview intentionally has no database/auth secrets. Public pages can be reviewed; forms and private tools report configuration requirements rather than claiming persistence. Configure isolated preview storage and auth before accepting real inquiries or testing protected screens.

## Isolated preview configuration

Do not reuse production credentials or production data.

1. Select/provision a separate PostgreSQL database through an approved provider. Check cost/terms first; none is provisioned by this PR.
2. Set branch-scoped Preview variables: DATABASE_URL, BETTER_AUTH_SECRET (random 32+ characters), OWNER_EMAIL, and BETTER_AUTH_URL using the stable review preview origin. Do not expose secrets in chat or git. Keep RENTCAST_ENABLED=false.
3. Locally point DATABASE_URL at that confirmed isolated database, supply a strong BOOTSTRAP_PASSWORD through the environment, set MIGRATION_APPROVED=isolated-preview, and run `node scripts/migrate-isolated.mjs`. This initializes schema and the owner account. Remove BOOTSTRAP_PASSWORD afterward; it is not a runtime variable.
4. Redeploy only the review branch preview. Sign in and test the private pages, form capture, two CSV imports + repeat, backup export/restore, property handoff, two scenarios, session expiry/logout, keyboard/mobile layouts, and printing. Do not send outreach.
5. This database setup has not been executed against any remote database. The authorized owner chooses the real password securely; the local disposable test owner is not a production account.

## Production rollout — approval required

1. Approve final design and verify contact information/privacy text. Confirm domain remains baruch-ermi.org.
2. Export a full V4 JSON backup from the existing Lead Desk browser containing actual records; verify counts, cases, sources, notes, histories, suppression and recovery copies. Keep an untouched offline copy. The agent cannot retrieve browser-local production records from repository source.
3. Back up the existing company/financing deployments and record rollback deployment IDs. Freeze source changes during cutover.
4. Configure a separate production database and authentication; inspect the generated migration before applying. All live database/schema changes require approval.
5. With approval, initialize empty production storage and the owner account, then restore the verified V4 backup through the authorized Lead Desk restore workflow. Compare exports and totals. Do not delete or overwrite the original origin's records.
6. Promote only the approved exact company commit; validate redirects, inquiry delivery, protected access, data retention, file import, financing handoff and print. No DNS/subdomain changes are required.
7. Keep the original Lead Desk and financing deployments as read-only references until migration is accepted. Avoid split editing; their browser data does not sync automatically.

## Rollback

Re-promote the recorded prior company deployment and preserve the new database intact. Export inquiries/scenarios received after cutover before any rollback; the old static site cannot display them. Do not restore an old database over newly captured records. Re-enable the old website forms only through its previous deployment; no automatic outreach is activated. Original Lead Desk browser records remain available at their original origin throughout.
