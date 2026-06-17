import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AgentPartner() {
  return (
    <>
      <Header />

      <main className="section">
        <div className="container card" style={{ maxWidth: "950px", margin: "0 auto", padding: "40px" }}>
          <h1>Agent Partner Program</h1>

          <p className="small">
            Baruch-Ermi LLC partners with real estate agents to help solve difficult property situations
            using creative finance options such as seller financing, subject-to, lease option, and structured purchase terms.
          </p>

          <h2>Have a Listing That Is Hard to Sell?</h2>
          <p>
            If your seller has a property that has been sitting on the market, needs a faster solution,
            has limited equity, or wants a flexible sale structure, we may be able to help.
          </p>

          <h2>Creative Options We Can Discuss</h2>
          <ul>
            <li>Seller financing</li>
            <li>Subject-to existing mortgage</li>
            <li>Lease option</li>
            <li>Wraparound structure where appropriate</li>
            <li>Cash offer when the numbers make sense</li>
          </ul>

          <h2>Why Agents Work With Us</h2>
          <ul>
            <li>We respond quickly</li>
            <li>We respect the agent relationship</li>
            <li>We look for solutions that help the seller move forward</li>
            <li>We do not ask agents to work for free</li>
            <li>We handle conversations professionally and transparently</li>
          </ul>

          <h2>Submit a Property</h2>
          <p>
            If you have a seller who may be open to creative terms, contact us with the property address,
            asking price, mortgage balance if known, monthly payment if known, and seller motivation.
          </p>

          <p>
            Call: <a href="tel:+18335233104">(833) 523-3104</a><br />
            Email: <a href="mailto:admin@baruchermi.org">admin@baruchermi.org</a>
          </p>

          <a href="/contact" className="btn">
            Contact Us
          </a>

          <p className="small" style={{ marginTop: "30px" }}>
            Baruch-Ermi LLC is not a brokerage and does not provide legal, tax, or financial advice.
            All parties should consult appropriate licensed professionals before entering into any transaction.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
