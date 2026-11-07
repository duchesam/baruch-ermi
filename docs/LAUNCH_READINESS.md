# Launch readiness — November 5, 2026

## Current decision: HOLD production

The unified review branch is implemented, but it is not approved or verified for production cutover. No production deployment, domain change, service purchase, outreach or live migration has occurred.

## Historical environment audit before Neon authorization

- Vercel team: ermias-seyoums-projects, project baruch-ermi (prj_I0aRfJ08Wbm5sLvcFLqy0jlGN0zj).
- Canonical project domain: baruch-ermi.org.
- Project environment inventory: zero variables, including no DATABASE_URL, BETTER_AUTH_SECRET, BETTER_AUTH_URL or OWNER_EMAIL.
- Installed Vercel database/integration configurations: none.
- No authenticated Vercel CLI token/development OIDC token or database credential is present in the execution environment. The connected hosting tools can inspect deployments and manage project configuration, but do not expose a PostgreSQL provisioning operation.
- Neon account management connection was discovered and offered; it is not yet installed/connected. No provider resource or billable plan was created.
- Hosted previews require Vercel Authentication. Automatic approval review rejected creation of a temporary share link because anyone possessing the link would gain preview access. No bypass or protection change was attempted.
- Managed local preview started, but the browser route returned ERR_CONNECTION_REFUSED and the preview daemon subsequently reported stopped. Browser verification remains unavailable through that environment; no network changes were made.

## Work completed in this pass

- Added a complete company backup download in the authenticated portal. API includes CRM/probate workspace, inquiry provenance/consent, financing scenarios and Operations history. It excludes auth accounts/sessions/credentials.
- Backup reads use one consistent read-only database snapshot (PostgreSQL REPEATABLE READ or separate local SQLite read transaction), rather than independently reading tables that could change mid-export.
- Backup checksum covers the complete payload including counts. Standalone integrity check and original Lead Desk backup inspection report counts/checksums without printing private record content. They do not import or modify anything.
- Added hosted configuration/schema/owner readiness checks. Missing setup fails explicitly; bootstrap password leftovers, weak secrets, invalid auth origins and local database configuration are flagged.
- Preview migration scripts now reject Production and require an exact DATABASE_URL SHA-256 confirmation, in addition to the isolated-preview approval flag. This helps prevent accidentally targeting a different database; it does not replace verifying isolation.

## Actual records and migration boundary

The original Lead Desk stores data in the browser at its original origin. Repository source and the captured Library page contain no recoverable current records. Search found the saved application page, not a full JSON workspace backup. No real records have been exported, imported or declared migrated.

An existing browser backup must be obtained before moving those records. The original workspace remains untouched. Same-origin browser isolation prevents the new company site from silently reading storage on the old hostname. Source code cannot substitute for that backup. Do not accept an empty new workspace as evidence of a successful migration.

## Commands prepared (not run on a remote database)

1. After the authorized provider account is connected, inspect its plan, region and isolation before creating/connecting a preview database. Do not enable a paid plan without separate approval.
2. Configure branch-scoped Preview DATABASE_URL, a generated high-entropy BETTER_AUTH_SECRET, an exact stable BETTER_AUTH_URL, verified OWNER_EMAIL. Keep paid providers disabled. Use separate Production credentials later.
3. Confirm the selected database and set MIGRATION_DATABASE_SHA256 to the SHA-256 of its DATABASE_URL without printing the URL. Supply BOOTSTRAP_PASSWORD only to the setup process. Run the reviewed migrate-isolated.mjs script with MIGRATION_APPROVED=isolated-preview. Existing initialized preview databases can use the narrower migrate-operations.mjs with OPERATIONS_MIGRATION_APPROVED=isolated-preview and the same target-fingerprint guard.
4. Remove BOOTSTRAP_PASSWORD afterward. Run `node scripts/check-readiness.mjs` with the configured environment (Node scripts do not auto-load .env.local). Offline configuration-only mode is `--offline`.
5. Run `node scripts/inspect-lead-backup.mjs <original-v4-backup.json>` before an approved import. Keep original bytes untouched. Merge only through the authenticated additive restore workflow and compare record/case/source/suppression/history counts afterward; preserve conflict recovery copies.
6. Download the new full company backup; verify with `node scripts/verify-company-backup.mjs <company-backup.json>`. It is a private archive, not a public repository artifact or an automatic full-company restore endpoint.

## Remaining launch gates (updated below after Neon authorization)

- Hosted isolated PostgreSQL provisioning, migrations, owner setup and persistence/reload testing.
- Original browser backup availability, approved migration and before/after comparison.
- Browser sign-in/out, protected pages, form-to-CRM capture, probate imports/reimport, property-to-financing handoff, multiple scenario persistence, printing, mobile and keyboard verification.
- Owner approval of exact production build, any paid service and live migration.

## Rollback reference

Current production deployment remains dpl_2AR1Npa7bPUxFqqmQRCA8SNjxznK, source main commit 56ee544b04b59b8cb528d25888259a37ce71686d. It is READY and marked as a rollback candidate. Review changes have not replaced it. Before cutover, recheck that this reference remains current. Preserve all post-cutover inquiries/scenarios/operations and database snapshots during rollback; never overwrite a new database with an older export.


## Verification evidence for this pass

22 application/domain/API tests pass, including owner-only full backup export, stable snapshot content, checksum verification, tamper rejection, preserved property/case data during additive restore, and configuration/target-fingerprint guards. The production build passes on the prepared source. The original 39 Lead Desk tests passed earlier in the same review cycle and their source is unchanged. Hosted PostgreSQL and browser tests remain unverified; no test result is presented as proof of real-data migration.


## Neon authorization completed — current status

The earlier missing-integration/configuration findings are resolved for the isolated review branch: a Free-plan Neon project and empty schema are initialized, a verified preview owner account exists, a restricted runtime role is configured, and all five Preview variables are set. See NEON_PREVIEW_SETUP.md for IDs, generated SQL, verification evidence and credential-handling boundaries. Production variables are unchanged. Local application-to-database verification is blocked by DNS EAI_AGAIN; hosted browser/API persistence checks, secure owner credential handoff, actual Lead Desk backup migration and production approval remain open. No claim of complete launch readiness is made.
