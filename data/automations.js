export const AUTOMATIONS=[
  {
    "slug": "lead-desk",
    "name": "Lead Management CRM",
    "category": "Research & lead management",
    "tagline": "Bring your property research and follow-ups into one workspace.",
    "description": "Imports leads, detects duplicates, tracks contacts, manages follow-ups, and reports pipeline activity.",
    "audience": "Investors, agents, acquisition teams",
    "icon": "research",
    "features": [
      "CSV property imports and duplicate review",
      "Probate Case Manager included",
      "Case-party grouping and filing history",
      "Parcel verification and source provenance",
      "Notes, status, follow-ups, and outreach history",
      "CSV exports and JSON backup/restore"
    ],
    "demoTasks": [
      "Search fictional property leads",
      "Import sample probate rows and repeat the import",
      "Review a property and change its workflow status"
    ],
    "deliverables": [
      "Configured company workspace and authorized access",
      "Property and probate import templates",
      "Agreed field mapping and a sample-data acceptance run",
      "Backup/export instructions and an onboarding walkthrough"
    ],
    "requirements": [
      "Your authorized source files and field requirements",
      "Confirmed users, hosting, and storage arrangements",
      "A reviewed backup before migrating existing records"
    ],
    "boundaries": [
      "No guarantee of seller motivation or property ownership",
      "County research depends on source access and jurisdiction",
      "Automated SMS, calling, and paid data are separate integrations"
    ],
    "outcome": "A clear research queue, with the evidence and next action alongside each property.",
    "demoSlug": "lead-desk",
    "number": 1
  },
  {
    "slug": "probate-case-manager",
    "name": "Probate Case Manager",
    "category": "Research & lead management",
    "description": "Groups court filing records by case, tracks parties and research, and links cases to verified properties.",
    "audience": "Probate investors, acquisition teams",
    "icon": "research",
    "features": [
      "Court CSV import and case-number grouping",
      "Court party and source history",
      "Documented parcel links and verification",
      "Research notes, follow-ups, and exports"
    ],
    "outcome": "A structured case-to-property research workflow.",
    "tagline": "A structured case-to-property research workflow.",
    "demoTasks": [
      "Open the Lead Desk demonstration",
      "Import the fictional probate rows",
      "Repeat the import to see case deduplication"
    ],
    "deliverables": [
      "Requirements and workflow map",
      "Court CSV import and case-number grouping configuration",
      "Court party and source history configuration",
      "Agreed integration tests and onboarding guidance"
    ],
    "requirements": [
      "Your workflow, users, and authorized source data",
      "Agreed hosting, account access, and integration requirements",
      "Approved scope, pricing, usage limits, and acceptance criteria"
    ],
    "boundaries": [
      "Probate is also included in Lead Management CRM; scope it as a module or a focused workflow.",
      "Court records do not establish property ownership or authority to sell.",
      "Actual source access, storage, and customer configuration are agreed before delivery."
    ],
    "demoSlug": "lead-desk",
    "demoLabel": "See probate demo",
    "number": 2
  },
  {
    "slug": "creative-financing",
    "name": "Creative Financing Analyzer",
    "category": "Deal analysis",
    "tagline": "Understand the assumptions behind your next purchase.",
    "description": "Compares purchase scenarios, estimates cash flow, saves deal analyses, and produces printable summaries.",
    "audience": "Investors, wholesalers, acquisition teams",
    "icon": "calculator",
    "features": [
      "Subject-To and seller-financing scenario inputs",
      "Purchase, repair, and closing-cost assumptions",
      "Estimated entry capital and monthly cash flow",
      "Equity, loan-to-value, and cash-on-cash metrics",
      "Named property scenarios in the configured workspace",
      "Printable deal summaries"
    ],
    "demoTasks": [
      "Change a fictional purchase scenario",
      "Compare cash flow and entry costs immediately",
      "Switch purchase structure and reset the inputs"
    ],
    "deliverables": [
      "Configured analyzer and company identity",
      "Agreed property-to-scenario workflow",
      "Sample calculations and an assumptions walkthrough",
      "Printable summary and user guidance"
    ],
    "requirements": [
      "Your intended calculation assumptions and deal workflow",
      "A company workspace for saved property scenarios",
      "Verified business contact details for generated summaries"
    ],
    "boundaries": [
      "Not a loan approval, appraisal, or guarantee of returns",
      "The existing model uses a simplified 20% operating allowance",
      "Monthly debt payment is entered; full amortization is not included"
    ],
    "outcome": "A consistent way to compare scenarios before committing to a deal.",
    "demoSlug": "creative-financing",
    "number": 3
  },
  {
    "slug": "seller-inquiry",
    "name": "Seller Inquiry & Qualification System",
    "category": "Intake & follow-up workflow",
    "tagline": "Give every property inquiry a clear next step.",
    "description": "Captures website inquiries, collects property details, routes leads, and creates follow-up tasks.",
    "audience": "Homebuyers, investors, agents",
    "icon": "intake",
    "features": [
      "Branded property inquiry form",
      "Server-side validation and spam checks",
      "Source, time, and consent recording",
      "Duplicate submission handling",
      "An unverified property record linked to the inquiry",
      "Defined review and follow-up tasks during implementation"
    ],
    "demoTasks": [
      "Submit a fictional inquiry inside the demo",
      "See the source, consent, and research status retained",
      "Review the inquiry and create a sample follow-up task"
    ],
    "deliverables": [
      "Branded intake form and agreed CRM connection",
      "Field mapping and consent capture",
      "Agreed routing and task workflow",
      "Test submission and onboarding instructions"
    ],
    "requirements": [
      "Your intake fields and review process",
      "Authorized CRM/hosting configuration",
      "Approved wording for any future communications"
    ],
    "boundaries": [
      "Demo tasks are simulated and do not send messages",
      "Email/SMS delivery requires separate setup and approval",
      "Phone numbers alone do not establish marketing consent"
    ],
    "outcome": "A traceable intake process that helps your team respond consistently.",
    "demoSlug": "seller-inquiry",
    "number": 4
  },
  {
    "slug": "ai-receptionist",
    "name": "AI Receptionist & Appointment Assistant",
    "category": "Calls & client communication",
    "description": "Answers business questions, collects seller information, schedules appointments, and routes calls to a person.",
    "audience": "Investment companies, brokerages, property managers",
    "icon": "voice",
    "features": [
      "Business question handling and intake scripts",
      "Seller qualification and appointment requests",
      "Human handoff and call routing",
      "CRM summaries and reviewable conversation history"
    ],
    "outcome": "Give callers a clear next step with an agreed human handoff.",
    "tagline": "Give callers a clear next step with an agreed human handoff.",
    "demoTasks": [],
    "deliverables": [
      "Requirements and workflow map",
      "Business question handling and intake scripts configuration",
      "Seller qualification and appointment requests configuration",
      "Agreed integration tests and onboarding guidance"
    ],
    "requirements": [
      "Your workflow, users, and authorized source data",
      "Agreed hosting, account access, and integration requirements",
      "Approved scope, pricing, usage limits, and acceptance criteria"
    ],
    "boundaries": [
      "Telephony, speech/AI usage, and calendar/CRM access require separate configuration.",
      "Call recording, disclosures, escalation, and human availability must be defined.",
      "No phone number, call flow, or paid voice service is activated by an inquiry."
    ],
    "number": 5
  },
  {
    "slug": "consent-follow-up",
    "name": "Consent-Based Follow-Up System",
    "category": "Calls & client communication",
    "description": "Sends approved email/SMS sequences, records replies, honors opt-outs, and alerts staff when action is needed.",
    "audience": "Investors, agents, property managers",
    "icon": "messages",
    "features": [
      "Approved follow-up sequences and schedules",
      "Consent evidence and suppression controls",
      "Reply tracking and staff alerts",
      "Communication history linked to the lead"
    ],
    "outcome": "Consistent follow-up with documented permission and human oversight.",
    "tagline": "Consistent follow-up with documented permission and human oversight.",
    "demoTasks": [],
    "deliverables": [
      "Requirements and workflow map",
      "Approved follow-up sequences and schedules configuration",
      "Consent evidence and suppression controls configuration",
      "Agreed integration tests and onboarding guidance"
    ],
    "requirements": [
      "Your workflow, users, and authorized source data",
      "Agreed hosting, account access, and integration requirements",
      "Approved scope, pricing, usage limits, and acceptance criteria"
    ],
    "boundaries": [
      "Approved consent, suppression, sender setup, and message review are required before delivery is activated.",
      "Email/SMS sending and usage costs are scoped separately.",
      "No outreach sequence is activated from this catalog."
    ],
    "number": 6
  },
  {
    "slug": "property-research",
    "name": "Property Research & Verification Workspace",
    "category": "Research & lead management",
    "description": "Organizes parcel, ownership, tax, and recorded-document research with sources and verification dates.",
    "audience": "Investors, land buyers, acquisition teams",
    "icon": "research",
    "features": [
      "Parcel and recorded-owner research fields",
      "Tax and recorded-document source tracking",
      "Verification dates and evidence notes",
      "Cross-source review and exportable research"
    ],
    "outcome": "Keep property facts, sources, and outstanding checks in one place.",
    "tagline": "Keep property facts, sources, and outstanding checks in one place.",
    "demoTasks": [],
    "deliverables": [
      "Requirements and workflow map",
      "Parcel and recorded-owner research fields configuration",
      "Tax and recorded-document source tracking configuration",
      "Agreed integration tests and onboarding guidance"
    ],
    "requirements": [
      "Your workflow, users, and authorized source data",
      "Agreed hosting, account access, and integration requirements",
      "Approved scope, pricing, usage limits, and acceptance criteria"
    ],
    "boundaries": [
      "Custom implementation is scoped and tested before delivery.",
      "Third-party accounts and usage charges are defined separately.",
      "No service is activated or charged by submitting an inquiry."
    ],
    "number": 7
  },
  {
    "slug": "deal-underwriting",
    "name": "Deal Underwriting & Offer Preparation",
    "category": "Deal analysis",
    "description": "Combines purchase price, repairs, carrying costs, financing, and exit assumptions into a reviewable deal summary.",
    "audience": "Flippers, rental investors, acquisition teams",
    "icon": "calculator",
    "features": [
      "Purchase, repair, and holding-cost assumptions",
      "Financing and exit scenario comparisons",
      "Reviewable offer preparation workflow",
      "Deal summary and assumptions record"
    ],
    "outcome": "Make the assumptions behind an offer clear and reviewable.",
    "tagline": "Make the assumptions behind an offer clear and reviewable.",
    "demoTasks": [],
    "deliverables": [
      "Requirements and workflow map",
      "Purchase, repair, and holding-cost assumptions configuration",
      "Financing and exit scenario comparisons configuration",
      "Agreed integration tests and onboarding guidance"
    ],
    "requirements": [
      "Your workflow, users, and authorized source data",
      "Agreed hosting, account access, and integration requirements",
      "Approved scope, pricing, usage limits, and acceptance criteria"
    ],
    "boundaries": [
      "Custom implementation is scoped and tested before delivery.",
      "Third-party accounts and usage charges are defined separately.",
      "No service is activated or charged by submitting an inquiry."
    ],
    "number": 8
  },
  {
    "slug": "partnership-portal",
    "name": "Agent & Investor Partnership Portal",
    "category": "Operations & relationships",
    "description": "Accepts opportunities, collects buyer criteria, tracks introductions, and manages document requests.",
    "audience": "Investment companies, investor networks",
    "icon": "partnership",
    "features": [
      "Opportunity intake and buyer criteria",
      "Introduction and relationship tracking",
      "Document requests and access controls",
      "Partner status and follow-up tasks"
    ],
    "outcome": "Bring opportunities and partner relationships into one process.",
    "tagline": "Bring opportunities and partner relationships into one process.",
    "demoTasks": [],
    "deliverables": [
      "Requirements and workflow map",
      "Opportunity intake and buyer criteria configuration",
      "Introduction and relationship tracking configuration",
      "Agreed integration tests and onboarding guidance"
    ],
    "requirements": [
      "Your workflow, users, and authorized source data",
      "Agreed hosting, account access, and integration requirements",
      "Approved scope, pricing, usage limits, and acceptance criteria"
    ],
    "boundaries": [
      "Custom implementation is scoped and tested before delivery.",
      "Third-party accounts and usage charges are defined separately.",
      "No service is activated or charged by submitting an inquiry."
    ],
    "number": 9
  },
  {
    "slug": "transaction-coordination",
    "name": "Transaction Coordination System",
    "category": "Operations & relationships",
    "description": "Tracks contract milestones, inspection dates, document requests, closing tasks, and responsible parties.",
    "audience": "Investors, agents, transaction coordinators",
    "icon": "tasks",
    "features": [
      "Contract milestones and date tracking",
      "Inspection and closing task checklists",
      "Document requests and assigned owners",
      "Reminders and transaction status views"
    ],
    "outcome": "A shared view of what needs to happen before closing.",
    "tagline": "A shared view of what needs to happen before closing.",
    "demoTasks": [],
    "deliverables": [
      "Requirements and workflow map",
      "Contract milestones and date tracking configuration",
      "Inspection and closing task checklists configuration",
      "Agreed integration tests and onboarding guidance"
    ],
    "requirements": [
      "Your workflow, users, and authorized source data",
      "Agreed hosting, account access, and integration requirements",
      "Approved scope, pricing, usage limits, and acceptance criteria"
    ],
    "boundaries": [
      "Custom implementation is scoped and tested before delivery.",
      "Third-party accounts and usage charges are defined separately.",
      "No service is activated or charged by submitting an inquiry."
    ],
    "number": 10
  },
  {
    "slug": "rental-maintenance",
    "name": "Rental Maintenance Coordinator",
    "category": "Operations & relationships",
    "description": "Receives tenant requests, asks clarifying questions, routes work orders, and tracks vendor updates.",
    "audience": "Landlords, property managers",
    "icon": "maintenance",
    "features": [
      "Tenant maintenance request intake",
      "Issue clarification and staff triage",
      "Vendor work orders and status updates",
      "Repair history and follow-up workflow"
    ],
    "outcome": "Move a maintenance request from intake to a documented resolution.",
    "tagline": "Move a maintenance request from intake to a documented resolution.",
    "demoTasks": [],
    "deliverables": [
      "Requirements and workflow map",
      "Tenant maintenance request intake configuration",
      "Issue clarification and staff triage configuration",
      "Agreed integration tests and onboarding guidance"
    ],
    "requirements": [
      "Your workflow, users, and authorized source data",
      "Agreed hosting, account access, and integration requirements",
      "Approved scope, pricing, usage limits, and acceptance criteria"
    ],
    "boundaries": [
      "Emergency instructions and human escalation must be agreed before launch.",
      "The service does not replace emergency services or professional repair assessment.",
      "Vendor authorization and paid work approvals remain with the property manager."
    ],
    "number": 11
  },
  {
    "slug": "content-marketing",
    "name": "Real Estate Content & Marketing Assistant",
    "category": "Content & marketing",
    "description": "Creates property marketing drafts, social content, listing descriptions, and approval queues.",
    "audience": "Agents, investors, property managers",
    "icon": "content",
    "features": [
      "Property marketing and description drafts",
      "Social content planning and draft variations",
      "Brand guidance and fact-check prompts",
      "Human approval before publishing"
    ],
    "outcome": "Turn property information into reviewable marketing drafts.",
    "tagline": "Turn property information into reviewable marketing drafts.",
    "demoTasks": [],
    "deliverables": [
      "Requirements and workflow map",
      "Property marketing and description drafts configuration",
      "Social content planning and draft variations configuration",
      "Agreed integration tests and onboarding guidance"
    ],
    "requirements": [
      "Your workflow, users, and authorized source data",
      "Agreed hosting, account access, and integration requirements",
      "Approved scope, pricing, usage limits, and acceptance criteria"
    ],
    "boundaries": [
      "Property facts, claims, and images must be supplied or verified.",
      "Drafts require human approval before publication.",
      "Automatic posting requires separately authorized platform connections."
    ],
    "number": 12
  }
];
export const DELIVERY_OPTIONS=[
  {
    "id": "implementation",
    "name": "One-time implementation",
    "body": "A scoped setup in agreed accounts, with configuration, testing, and handover. Hosting, third-party usage, and any ongoing support are defined in the proposal."
  },
  {
    "id": "managed",
    "name": "Managed subscription",
    "body": "Request a managed service proposal covering hosting, maintenance, access, usage limits, and support. Monthly service is not activated by an inquiry."
  }
];
export function getAutomation(slug){return AUTOMATIONS.find(p=>p.slug===slug);}
export const DEMO_SYSTEMS=AUTOMATIONS.filter(p=>p.demoSlug===p.slug);
