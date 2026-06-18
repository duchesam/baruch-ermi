import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

export default function Home(){
  return (
    <>
      <Head>
        <title>Baruch-Ermi — Nationwide Foreclosure Help</title>
        <meta name="description" content="Real options to stop auctions, avoid foreclosure, and move forward with clarity." />
      </Head>
      <Header />

      {/* HERO with background image */}
      <section className="hero">
        <div className="hero__overlay" />
        <div className="container hero__content">
          <h1>Nationwide Foreclosure Help</h1>
          <p>Real options when you need them most. We help homeowners across the U.S. avoid foreclosure, stop auctions, and move forward.</p>
          <div className="actions">
            <a className="btn" href="/get-offer">Get a Cash Offer</a>
            <a href="/agent-partner" className="btn ghost">
              Agent Partner Program
            </a>
          </div>
          <div className="pills">
            <span className="pill">Fast decisions</span>
            <span className="pill">No commissions</span>
            <span className="pill">Nationwide network</span>
            <span className="pill">Transparent process</span>
          </div>
        </div>
      </section>

      <main className="section">
        <div className="container">
          <div className="grid grid-3" style={{gap:18}}>
            <div className="card">
              <h3>Stop the Clock</h3>
              <p className="small">We coordinate payoff, reinstatement, postponements, and buyer docs—protecting your timeline.</p>
            </div>
            <div className="card">
              <h3>Real Choices</h3>
              <p className="small">Reinstate, modify, sell (cash or concierge), or creative options like subject-to—whichever fits best.</p>
            </div>
            <div className="card">
              <h3>Clear Communication</h3>
              <p className="small">Direct answers, no pressure, and updates you can trust.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
