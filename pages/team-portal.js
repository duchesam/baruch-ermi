import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

const tools = [
  {
    name: "Lead Desk",
    label: "Research & CRM",
    description: "Manage probate cases, verify properties, review lead sources, and organize follow-ups.",
    access: "Requires your authorized ChatGPT account.",
    href: "https://baruch-ermi-lead-desk.barokermi.chatgpt.site/",
    action: "Open Lead Desk",
    tasks: ["Probate case imports", "Property verification", "Lead management"],
  },
  {
    name: "Creative Financing",
    label: "Investment analysis",
    description: "Compare Subject-To and seller-financing scenarios, review cash flow, and prepare deal summaries.",
    access: "Uses the financing app’s existing deployment access settings.",
    href: "https://baruch-ermi-creative-financing-app.vercel.app/",
    action: "Open Creative Financing",
    tasks: ["Deal scenarios", "Cash-flow analysis", "Printable summaries"],
  },
];

export default function TeamPortal() {
  return (
    <>
      <Head>
        <title>Team Portal | Baruch-Ermi LLC</title>
        <meta name="description" content="Baruch-Ermi LLC real estate research and investment tools." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Header />
      <main className="section">
        <div className="container portal">
          <p className="eyebrow">Baruch-Ermi LLC · Operations</p>
          <h1>Your real estate workspace</h1>
          <p className="intro">From property research to investment analysis, start with the tool you need.</p>
          <div className="grid grid-2 tools">
            {tools.map((tool) => (
              <section className="card tool" key={tool.name} aria-label={tool.name}>
                <span className="badge">{tool.label}</span>
                <h2>{tool.name}</h2>
                <p className="small">{tool.description}</p>
                <ul>{tool.tasks.map((task) => <li key={task}>{task}</li>)}</ul>
                <p className="small access">{tool.access}</p>
                <a className="btn" href={tool.href} target="_blank" rel="noopener noreferrer">
                  {tool.action} <span aria-hidden="true">↗</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </section>
            ))}
          </div>
          <aside className="card notice" aria-label="Workspace access">
            <h2>One starting point for your tools</h2>
            <p className="small">Each application opens in a new tab and keeps its own sign-in and records. This portal does not display lead data or automatically transfer property details between applications.</p>
          </aside>
          <p className="small">Looking to sell a property? <a href="/get-offer">Request an offer</a> or <a href="/contact">contact our team</a>.</p>
        </div>
      </main>
      <Footer />
      <style jsx>{`
        .portal { max-width: 1040px; }
        .eyebrow { color: #9bb0d6; text-transform: uppercase; letter-spacing: .12em; font-size: .8rem; font-weight: 700; }
        h1 { font-size: clamp(2rem, 5vw, 3.2rem); margin: 12px 0; line-height: 1.12; }
        .intro { color: #9bb0d6; font-size: 1.15rem; line-height: 1.7; max-width: 650px; }
        .tools { margin: 32px 0 24px; }
        .tool { padding: 28px; display: flex; flex-direction: column; align-items: flex-start; border: 1px solid rgba(155,176,214,.18); }
        .tool h2 { margin: 22px 0 4px; font-size: 1.6rem; }
        .tool p, .notice p { line-height: 1.7; }
        ul { padding-left: 20px; line-height: 1.9; }
        .access { margin-top: auto; padding-top: 12px; }
        .notice h2 { margin-top: 0; font-size: 1.1rem; }
        .notice { margin-bottom: 24px; }
        .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; }
        a:focus-visible { outline: 3px solid #eaf1ff; outline-offset: 5px; }
      `}</style>
    </>
  );
}
