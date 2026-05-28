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
            <h1 style={{marginTop:0}}>Your Options if You’re Facing Foreclosure</h1>
            <p className="small">You still have choices—and acting early usually protects equity, credit, and peace of mind. Below are five real paths homeowners use.</p>
          </div>

          <div className="grid" style={{marginTop:18, gap:18}}>
            <div className="card">
              <h3 style={{marginTop:0}}>1) Reinstate the Loan</h3>
              <p className="small">Pay the full past-due amount (fees included) to bring the loan current and stop foreclosure.</p>
            </div>
            <div className="card">
              <h3 style={{marginTop:0}}>2) Loan Modification</h3>
              <p className="small">Adjust rate/term to make payments affordable. Typical timelines run ~45 days.</p>
            </div>
            <div className="card">
              <h3 style={{marginTop:0}}>3) Bankruptcy (Chapter 13)</h3>
              <p className="small">Can pause foreclosure and structure a catch-up plan. Consult a qualified attorney.</p>
            </div>
            <div className="card">
              <h3 style={{marginTop:0}}>4) Sell Before Auction</h3>
              <p className="small"><strong>Cash Sale:</strong> close in 7–14 days. <br/><strong>Concierge Sale:</strong> if you have ~45 days, we push toward market value.</p>
            </div>
            <div className="card">
              <h3 style={{marginTop:0}}>5) “Subject-To”</h3>
              <p className="small">We take responsibility for the existing mortgage (bring it current) and prevent foreclosure.</p>
            </div>
          </div>

          <div className="card" style={{marginTop:18}}>
            <h3 style={{marginTop:0}}>Talk Through Your Situation</h3>
            <p className="small">No pressure—just clear answers. Call <a href="tel:+18335233104">(833) 523-3104</a> or email <a href="mailto:admin@baruchermi.org">admin@baruchermi.org</a>. Prefer to review terms first? Read our <Link href="/terms">Terms &amp; Conditions</Link>.</p>
          </div>

          <div className="small muted" style={{marginTop:8}}>
            <p>Disclaimer: Baruch-Ermi is not a law firm or financial advisor. This page is educational only; consult licensed professionals in your state.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
