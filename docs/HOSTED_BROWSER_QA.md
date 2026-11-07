# Hosted browser verification — November 5, 2026

## Tested deployment

Commit da6e2a11810bb0de585dd4dff21fde9fa68933a5, deployment dpl_BT2ph2XcAHHzozwM6tU4yLJfcN3n. Vercel reported READY. The owner explicitly approved a 23-hour preview-access link; a new expiring share link was created and successfully opened. Its bearer token is not included in this repository. Sharing affects deployment access, not application owner authorization.

## Browser → API → PostgreSQL results

- Seller form: submitted clearly fictional DO NOT CONTACT fixture at an example.test address. Visible received confirmation; Neon confirmed type seller, source sell-your-property, SMS false, marketing SMS false. Created one unverified property with stable inquiry linkage and workspace revision 1.
- Retry: reloaded and resubmitted identical seller values. Visible received confirmation; database still contains exactly one seller inquiry and one corresponding property. No duplicate was created.
- Investor form: fictional inquiry saved and confirmed in browser and PostgreSQL. Did not create a property.
- Agent form: fictional agent/brokerage/property fixture saved and confirmed; created a second unverified property as expected.
- Automation catalog: browser rendered all twelve services; searching Receptionist returned exactly one. Its Request this service link preselected AI Receptionist & Appointment Assistant on contact. Selected Managed subscription proposal and submitted fictional request. Browser confirmation explicitly stated no purchase/subscription/payment. Database confirmed requestedSystem ai-receptionist, deliveryPreference managed and correct source URL.
- Database final counts for these fixtures: one seller, one investor, one agent, one automation inquiry; two linked properties, workspace revision 2. Both SMS choices false for all four. Records remain labeled fictional; no outreach occurred. They must not be copied to a future production database.

## Browser interaction results

- Anonymous Company workspace entry redirected to application /sign-in. Deployment share access did not expose the private workspace.
- Seller FAQ expanded via keyboard Space with expanded accessibility state and answer text.
- Lead demo: three sample court-party rows grouped into two cases; repeated import showed zero new cases. Stage change and illustrative reviewed checkbox updated the page. These remain page-local demo actions.
- Financing demo: initial fictional inputs rendered $720/month cash flow; switching to seller financing and reducing assumed rent to $1,000 rendered negative $400/month, negative $4,800 annually and negative cash-on-cash return, matching the displayed simplified formula.
- Operations demo: attempted Under contract without documented checks was rejected visibly. Created a fictional dated task; overdue count rose to one. Completed it; task status became Done and overdue count returned to zero. Changes stayed in the demo.
- Captured desktop screenshot of the tested Operations page for handoff. Sampled browser console errors were extension metadata messages; they are not evidence of application failures or proof of a complete console-clean run.

## Open gates / exact limits

The current review branch was independently updated to managed Neon Auth at commit d6b260b7c2bfc36abf56a015c275ad7041cd9b99 (READY deployment dpl_7b8bry1uPbFKAAcEQGPHoFVMtiDM). That change supersedes the earlier temporary-password handoff requirement. It was preserved, not overwritten. A separate approved 23-hour link was created for this current preview. Anonymous workspace navigation displayed Continue with Google; clicking it correctly redirected to Google with identity scopes (email/profile/openid). Secure browser authentication was requested and declined. No credentials were entered or inspected, no consent was completed, and no authenticated application session was verified. Do not bypass that step by creating sessions in SQL or weakening the owner allowlist. The original fixture-based public tests above apply specifically to da6e2a1, not a claim that all flows on d6b260b were retested.

Authenticated Lead Desk imports/exports, private Operations persistence, property-to-financing transfer, saved scenarios, company-backup download, logout/session expiry, printing and mobile viewport behavior remain unverified in the hosted browser. Public fictional demos do not substitute for those checks. Existing original browser-local Lead Desk records remain unmigrated because its full JSON backup is not accessible.

No production deployment/domain/database changes, paid activation, messages or subscriptions occurred. No real company records were used for testing.
