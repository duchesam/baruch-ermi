# Neon Auth preview integration

The existing `baruch-ermi-preview` project (`empty-tooth-51866658`) and `review-unified-platform` branch (`br-jolly-dream-bb8tcgvs`) are reused. Application tables remain in `public`; managed identity lives separately in `neon_auth`. No production migration or original browser-local Lead Desk import is included.

Setting `NEON_AUTH_BASE_URL` enables managed sign-in and disables acceptance of the previous self-managed sessions. Without it, existing local Better Auth behavior remains available. The Pages Router uses the SDK's documented framework adapter toolkit, pinned to `@neon/auth` 0.8.2, for the auth proxy and request-scoped server session checks. Next.js middleware handles the SDK OAuth callback exchange. The sign-in page uses the Neon SDK client and offers Google sign-in in managed mode.

Every private API and protected page still checks `OWNER_EMAIL`; managed sessions additionally require `emailVerified`. Signing in with another Google account creates no CRM access. Public email registration through the app proxy is blocked. Existing password hashes and sessions are not transferred. The owner uses the Google account whose email matches the existing owner configuration.

`NEON_AUTH_BASE_URL`, a distinct generated `NEON_AUTH_COOKIE_SECRET`, and the stable branch `BETTER_AUTH_URL` are configured only on the existing Vercel review branch. The stable preview origin is registered with Neon. Production is unchanged. Shared Google OAuth credentials are for preview/development; production needs the company's own Google OAuth app and the production checklist.

Validation: production build and application regression tests pass; tests cover verified owner identity, rejection of another/unverified identity and legacy cookies, anonymous API access, and blocked email registration. Actual owner Google consent, restored authenticated browser session, protected hosted CRM read/write, and sign-out after successful Google login require interactive owner authentication and are not claimed as verified.

Rollback: remove the two managed Neon Auth environment variables from this preview branch and redeploy the earlier commit to restore its self-managed login. Existing public auth tables are preserved.
