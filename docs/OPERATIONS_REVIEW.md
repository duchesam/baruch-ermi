# Acquisition Operations review — November 5, 2026

## Audit and implemented scope

The prior review branch had property research, probate grouping, inquiries, saved financing scenarios, and a twelve-service catalog. It lacked a shared execution layer for opportunity responsibility, dated actions, diligence gates, task completion, and source outcome reporting. This change adds that layer without rewriting or migrating Lead Desk records.

Industry references inspected: Follow Up Boss lead routing, reporting and speed-to-lead documentation (https://www.followupboss.com/features/lead-routing and https://help.followupboss.com/hc/en-us/articles/11483993704087-Reporting-Overview); InvestorFuse action-based workflow and campaign tracking (https://www.investorfuse.com/features/core/action-based-system and https://www.investorfuse.com/features/core/campaigns). These inform operational patterns, not claims of feature parity, affiliation, or guaranteed returns.

## Delivered

- `/operations`: owner-authenticated execution workspace; navigation and portal entry.
- `/api/operations`: owner-only read and command-based write API, same-origin protection, 32KB request cap, server validation, revision conflict rejection, retry deduplication, server actor/time history. History is application-controlled, not an immutable regulatory audit log.
- `/operations-demo`: public, clearly fictional, page-local demonstration using the same UI and domain rules. Refresh/reset discards changes. No company records, messages or paid calls.
- Opportunities link stable existing property/inquiry IDs; original source and label snapshot are retained. One opportunity per source record. A property and its separate inquiry can each be linked; no automatic cross-type identity merge is implied.
- Seven stages; documented ownership/authority, title, underwriting, executed agreement checks required before Under contract; closing statement review and positive confirmed purchase price before Closed. These are staff attestations, not third-party or legal verification.
- Responsible-person labels, next actions/dates, manually recorded first response, dated tasks/milestones, completion/reopening, review notes, and actor/time history.
- Attention metrics: active, overdue tasks, missing next action/date, unassigned, response not recorded. Original-source totals and recorded outcomes. Purchase volume is confirmed acquisition price, explicitly not revenue/profit/ROI.
- JSON full-history backup export and spreadsheet-safe pipeline CSV. No restore operation is introduced; preserve exports before any future restore or migration.
- Property-to-financing navigation uses existing sessionStorage selection and a clean route; no personal/deal details in URL.

## Storage and rollout

`initializeCRM` adds `crm_operations(id, revision, data)` and an empty company record using idempotent CREATE IF NOT EXISTS / ON CONFLICT DO NOTHING. Existing CRM, inquiries, scenarios and browser-local original Lead Desk data are untouched. No live migration has run.

Before hosted private use, configure an isolated PostgreSQL database, Better Auth secret/URL and owner account as described in UNIFIED_REBRAND_REVIEW.md. Back up the target database, confirm the selected environment, and run the reviewed additive schema setup only with authorization. For an existing initialized preview database, the narrower reviewed script is `OPERATIONS_MIGRATION_APPROVED=isolated-preview node scripts/migrate-operations.mjs` (uses the selected DATABASE_URL). No migration was executed here; production must wait for owner approval. Missing tables/configuration fail closed. Current access remains owner-only; responsibility labels do not create users or grant access. No billing, messages, telephony, calendar integration, background notifications or paid services are activated.

Rollback: redeploy the previous review commit. Retain crm_operations and its backup; old code ignores the additive table. Do not drop the table or overwrite original CRM data. Production branch/domain remain unchanged.

## Verification

19 automated tests pass: existing auth/CRM/probate/scenario/calculator/inquiry tests plus authenticated Operations persistence/reload, anonymous denial, cross-origin rejection, stale revision conflict, retry idempotency, duplicate/missing source rejection, stage gates and evidence requirements, invalid dates/amounts, closed volume, response timestamp retention, completed tasks, lost reason and CSV formula escaping. Fixtures use a disposable SQLite database; hosted PostgreSQL/browser E2E remain separate checks. The 39 original Lead Desk regression tests also pass. Production build checks all routes. See final handoff for preview availability and browser verification limits.
