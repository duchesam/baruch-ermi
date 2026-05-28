import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

export default function Home(){
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="container">
            <h1>Nationwide Foreclosure & Auction Solutions</h1>
            <p>Clear options. Fast action. We help you protect time, equity, and peace of mind—without the runaround.</p>
            <div style={{display:"flex",gap:12,justifyContent:"center",marginTop:18,flexWrap:"wrap"}}>
              <Link href="/get-offer" className="btn btn-primary">Get an Offer</Link>
              <Link href="/options" className="btn">See Your Options</Link>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container grid grid-3">
            <div className="card">
              <h3 style={{marginTop:0}}>Situation Review</h3>
              <p className="small">We review payoff, reinstatement, and title items so you can decide quickly with real numbers.</p>
            </div>
            <div className="card">
              <h3 style={{marginTop:0}}>Auction Rescue</h3>
              <p className="small">Tight timeline? We work urgently to pause or resolve auction risk and keep options open.</p>
            </div>
            <div className="card">
              <h3 style={{marginTop:0}}>2-Year Buyback Path</h3>
              <p className="small">Prefer to buy back? We can structure a path with clear milestones and updates.</p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container card">
            <h3 style={{marginTop:0}}>Talk to a real person today</h3>
            <p className="small">Call <a href="tel:+18335233104">(833) 523-3104</a> or email <a href="mailto:admin@baruchermi.org">admin@baruchermi.org</a>. No pressure—just clear answers.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
