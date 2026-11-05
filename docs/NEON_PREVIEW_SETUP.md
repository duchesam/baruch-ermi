# Neon preview setup — November 5, 2026

## Executed successfully

The newly authorized Neon organization is on the Free plan. It contained no projects before this setup. Created one separate preview project, baruch-ermi-preview, in aws-us-east-1 (matching Vercel's US East region), with fixed 0.25 CU compute. No paid plan, production database, production branch, or real customer/lead data was created or modified. The provider rejected a custom suspend interval on Free; creation was retried without that unsupported setting after verifying no project had been created.

Project ID: empty-tooth-51866658. Branch ID: br-jolly-dream-bb8tcgvs, named review-unified-platform. Database: baruch_ermi_preview.

Confirmed public schema empty before applying the generated Better Auth PostgreSQL schema and the additive company schema. The SQL is tracked in migrations/001_auth_postgres.sql and migrations/002_company_postgres.sql. The auth SQL was compiled from the installed Better Auth 1.7 migration generator for a confirmed empty PostgreSQL database; no manually invented auth columns.

Neon verification confirms 10 tables, one initialized owner account, one credential account, CRM revision zero, Operations revision zero, and no property/inquiry/scenario records. The owner identity was verified from the sole organization administrator. Initial preview password is random and has not been published, placed in repository source, or included in runtime environment variables. A secure owner password handoff/setup remains required before human use or production. No production credentials were generated.

Created a dedicated database/schema-scoped read_write runtime role (baruch_ermi_preview_app) instead of using the migration owner. Verified it is not a superuser, has CRUD access to the company/auth tables, and cannot create tables, roles, or databases. Runtime DATABASE_URL uses the pooled connection and explicit verify-full TLS validation. The migration owner's direct connection was used only for preview setup/verification and is not the deployed runtime credential.

Configured five Vercel variables for Preview only, limited to rebrand/unified-company-platform: DATABASE_URL, BETTER_AUTH_SECRET, OWNER_EMAIL, BETTER_AUTH_URL, RENTCAST_ENABLED=false. Database URL, auth secret and owner allowlist are stored as Secret variables. No Production or Development variables were changed. No bootstrap password was added to Vercel. Canonical auth origin is the already-returned stable review branch alias.

## Verification boundary

Neon's authenticated SQL tools successfully verified the live PostgreSQL schema, owner initialization, empty application data and scoped runtime permissions. The local application readiness script validates all required configuration but cannot connect from this execution environment: DNS returns EAI_AGAIN for the Neon host. No network permissions were changed and TLS verification was not disabled. This is not a successful app-to-database test.

The hosted review build must finish with the new branch-scoped configuration. Browser sign-in, form-to-CRM, probate imports, scenario persistence, print/mobile/keyboard checks still need end-to-end verification. Vercel preview sharing was previously rejected by automatic approval review; no share link or protection bypass has been created. Original browser-local Lead Desk data remains untouched and no original JSON backup is accessible here.

## Rollback / recovery

Revert the review commit or redeploy its previous preview; preserve the isolated database. Production is still the recorded main deployment. Do not drop/reset the Neon project or remove data without approval. Disabling a preview does not remove records. Before production, use a separately approved production database, independent secrets and secure owner credential setup, complete the real-record migration/acceptance checks, and obtain production rollout approval.
