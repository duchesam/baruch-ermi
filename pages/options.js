import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

export default function Options(){
  return (
    <>
      <Header />
      <main className="section">
        <div className="container" style={{maxWidth:"980px"}}>
          <div className="card" style={{overflow:"hidden"}}>
            <div style={{display:"grid",gap:18,gridTemplateColumns:"1.2fr 1fr",alignItems:"center"}}>
              <div>
                <h1 style={{marginTop:0}}>Your Options if You’re Facing Foreclosure</h1>
                <p className="small">
                  You still have choices—and acting early usually protects equity, credit, and peace of mind.
                  Below are five real paths homeowners use. We’ll help you evaluate which one fits your timeline and goals.
                </p>
              </div>
              <img
                alt="Homeowner discussing options with an advisor"
                style={{width:"100%",borderRadius:12}}
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop"
              />
            </div>
          </div>

          {/* Video */}
          <div className="card" style={{marginTop:18}}>
            <h3 style={{marginTop:0}}>Watch: 5 Real Options (Pros &amp; Cons)</h3>
            <div style={{position:"relative",paddingBottom:"56.25%",height:0,borderRadius:12,overflow:"hidden"}}>
              <iframe
                src="https://www.youtube.com/embed/7-o9dewIYFc"
                title="How to Stop a Foreclosure/Auction — 5 Options"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",border:0}}
              />
            </div>
          </div>

          {/* Options list */}
          <div className="grid" style={{marginTop:18, gap:18}}>
            <div className="card">
              <h3 style={{marginTop:0}}>1) Reinstate the Loan</h3>
              <p className="small">
                Pay the full past-due amount (late fees and legal costs included) to bring the loan current and stop foreclosure.
                Fastest, cleanest way to keep your home and protect credit if funds are available (savings, family help, hardship funds).
              </p>
            </div>
            <div className="card">
              <h3 style={{marginTop:0}}>2) Loan Modification</h3>
              <p className="small">
                Adjusts your mortgage terms (rate/term) to make payments affordable. Typical timelines run ~45 days.
                You don’t need to pay a third party; we can point you in the right direction so you can apply yourself.
              </p>
            </div>
            <div className="card">
              <h3 style={{marginTop:0}}>3) Bankruptcy (Chapter 13)</h3>
              <p className="small">
                Can pause foreclosure and structure a catch-up plan. It’s serious—consult a qualified bankruptcy attorney.
              </p>
            </div>
            <div className="card">
              <h3 style={{marginTop:0}}>4) Sell Before Auction (Cash or Concierge)</h3>
              <p className="small">
                <strong>Cash Sale:</strong> close in 7–14 days through our network; we aim for stronger pricing than typical investor offers.
                <br/>
                <strong>Concierge Sale:</strong> if you have ~45 days, we help postpone the sale and market broadly (investor network + MLS/Zillow/Redfin) to push toward market value.
              </p>
            </div>
            <div className="card">
              <h3 style={{marginTop:0}}>5) “Subject-To” (Creative Financing)</h3>
              <p className="small">
                We take responsibility for the existing mortgage, bring it current, and prevent foreclosure.
                Title typically transfers; any remaining equity can be paid over time via a recorded note through a licensed title company.
              </p>
            </div>
          </div>

          {/* Call to action */}
          <div className="card" style={{marginTop:18}}>
            <h3 style={{marginTop:0}}>Talk Through Your Situation</h3>
            <p className="small">
              No pressure—just clear answers. Call <a href="tel:+18335233104">(833) 523-3104</a> or email{" "}
              <a href="mailto:admin@baruchermi.org">admin@baruchermi.org</a>. We respond quickly and keep your info private.
            </p>
            <p className="small">
              Prefer to review terms first? Read our <Link href="/terms">Terms &amp; Conditions</Link>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
