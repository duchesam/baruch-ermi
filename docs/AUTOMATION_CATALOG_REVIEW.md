# Real Estate Automation catalog — November 4, 2026

## Service catalog

All twelve requested services appear on the same searchable catalog page, with their intended clients and individual service scope pages. All twelve can be selected in the proposal form. Lead Management CRM, Creative Financing Analyzer, and Seller Inquiry & Qualification System have standalone fictional demos. Probate Case Manager links to the probate workflow in the Lead Desk demo and can be scoped as a module or separate implementation. The remaining eight services are labeled Custom implementation and available for scoping; no working demo is claimed for them. No AstraFlow product, branding, or connection is included.

## Routes and buyer journey

- `/automations`: twelve-service catalog, delivery models, and scoping process.
- Twelve `/automations/[system]` detail pages: features, implementation deliverables, requirements, boundaries, and proposal links.
- Three `/demos/[system]` routes: public interactive demonstrations using fictional page-local data only.
- `/contact?system=<approved-slug>&interest=implementation|managed`: product-aware proposal request, with a choice of one-time implementation, managed subscription proposal, or undecided.

Product identifiers and delivery model names are allowlisted server-side. Automation inquiries have their own type and retain source, product, delivery preference and independent consent choices. Retry deduplication includes the selected product and model, so different requests are not collapsed. Automation inquiries are not converted into property leads. The owner portal can filter them by type.

## Demonstrations

- Lead Desk: searchable fictional queue, record selection, workflow-stage changes, illustrative review checkbox, original probate parser and merge logic used with three fictional rows grouped into two cases; repeating import adds no new cases. No real court files or private records are loaded.
- Financing: original calculation engine with fictional purchase/rent/repair inputs and immediate cash-flow/entry-cost/return outputs. Monthly debt payment is entered, not automatically amortized. The existing simplified 20% operating allowance is explained.
- Seller intake: a fixed fictional seller submission followed by simulated review and task creation. No backend calls, messages, appointments or real records are created by the demo. Optional inquiry-text consent is illustrative and independent of promotional consent.

Demos do not persist across refreshes, send outreach, call paid data providers, or access company authentication/storage. The private company tools remain separate protected routes under the same company hostname.

## Commercial boundaries

No price is invented or displayed. No checkout, recurring billing, paid service, or subscription is activated. A proposal defines the selected product, implementation/account ownership, hosting, usage limits, support, integrations, delivery acceptance criteria, and price before purchase. Customer tenancy and billing are later phases, not implied by these public demos.

## Verification and remaining configuration

Production build and TypeScript checks pass with all twelve service detail pages and exactly three demo routes generated. Fifteen backend/calculator integration tests pass, including new product/model persistence, source retention, retry dedupe, distinct product requests, no property-lead pollution, invalid selection rejection, and successful selection/persistence of every advertised service. The 39 original Lead Desk tests remain unchanged from the audited baseline. Browser interaction, responsive visuals and keyboard review remain pending; the review preview has Vercel Authentication.

Proposal capture uses the existing company API and therefore needs the isolated PostgreSQL/auth setup already documented in UNIFIED_REBRAND_REVIEW.md. Until configured, the preview returns a truthful configuration error instead of claiming that a proposal was saved. Direct company phone/email remain visible. No real inquiry submissions were sent during tests; all database tests used disposable local SQLite and fictional fixtures.

Production publication still requires owner approval. The existing company website, data, original app deployments, and current domain are unchanged. This change is confined to the review branch/preview. Roll back by reverting the catalog commit; preserve any captured automation inquiries before database changes. No database schema change is needed because proposal-specific fields use the existing validated JSON inquiry record.
