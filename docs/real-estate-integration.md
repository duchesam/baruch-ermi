# Real estate integration — 2026-11-03

## Audited baseline

Company website: `duchesam/baruch-ermi`, main commit `56ee544b04b59b8cb528d25888259a37ce71686d`. Next.js 13.5.6 Pages Router with static export. Seller and agent forms remain unchanged.

Financing: `duchesam/baruch-ermi-creative-financing-app`, main commit `b75fcaa578d17307bd87d1af6766d7b48cacbe20`. Vite/React app; calculations are browser-side. No shared CRM database or authentication implementation was found in its source. Its initial deal includes sample property/contact values. Address lookups call RentCast from the browser; that integration requires a separate security review before broader rollout. Do not place server secrets into a Vite client build.

Lead Desk: Sites project `appgprj_6acbc90edc7c8191aba7df2446649628`, latest saved Version 4, owner-only access policy confirmed. Its source and live database were not modified or migrated in this phase.

## Prepared in this change

Add `/team-portal` with the existing company header/footer and links to the two original applications. Add a responsive navigation entry. The directory contains no lead data and is not an authentication boundary; noindex is an indexing preference only. Actual authorization remains at each destination. Do not describe the financing app as private based on the portal link.

This is navigation integration, not data integration or a completed domain migration.

## Remaining integration work

1. Review this branch and approve production publication.
2. Verify company portal, Lead Desk sign-in, financing access, mobile layout, and seller/agent forms on the preview. Do not submit real forms during QA.
3. Attach `leads.baruch-ermi.org` to the existing Lead Desk using Sites custom-domain support; inspect required DNS records and preserve its access policy. Test authentication on the new hostname before changing links.
4. Add authentication to financing or verify suitable deployment protection for custom domains before attaching `finance.baruch-ermi.org`. Current Vercel protection excludes custom domains, so a new hostname alone would not provide privacy.
5. Approve DNS/custom-domain changes, then activate them and update portal destinations after both hostnames pass verification. Retain original URLs for rollback.
6. Audit Lead Desk source/storage before defining shared property IDs, consent/provenance fields, and an authenticated transfer contract. Browser storage belongs to an origin: export/backup any records before changing origins. Do not pass owner/contact data in URL parameters.

## Production and rollback

Do not merge this branch or promote a deployment without owner approval. A branch push may trigger a Vercel preview; it must not target the production branch. Roll back the portal by reverting its commit. No database or DNS rollback is needed for this phase because neither is changed.
