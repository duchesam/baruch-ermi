import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function About(){
  return (
    <>
      <Head>
        <title>About Us — Baruch-Ermi</title>
        <meta name="description" content="Respectful, no-pressure help for owners facing foreclosure or auction. Real options, clear outcomes." />
      </Head>
      <Header />
      <main className="section">
        <div className="container" style={{maxWidth:"900px"}}>
          <div className="card">
            <h1 style={{marginTop:0}}>Welcome to Baruch-Ermi Foreclosure Solutions</h1>
            <p className="small">
              We specialize in helping homeowners who are ready for their next chapter—whether that means
              keeping the home, selling before auction, or choosing a creative path that protects credit and equity.
            </p>

            <ul className="small" style={{listStyle:"none", paddingLeft:0, lineHeight:"1.75"}}>
              <li>✅ <strong>No agents.</strong></li>
              <li>✅ <strong>No pressure.</strong></li>
              <li>✅ <strong>Just honest, respectful conversations—and real offers.</strong></li>
            </ul>

            <p className="small">
              We work directly with owners across the U.S. and coordinate with licensed partners as needed to ensure
              compliant, timely outcomes. Whether you need a quick reinstatement plan, a cash offer in days, or a well-run concierge sale,
              we’ll give you straight answers and a clear plan.
            </p>

            <h3>Our Promise</h3>
            <ul className="small">
              <li>Clarity on your options and timelines</li>
              <li>Transparent numbers—no junk fees or surprises</li>
              <li>Regular updates from offer to close</li>
              <li>Your information stays private</li>
            </ul>

            <h3>Talk with Us</h3>
            <p className="small">
              Call <a href="tel:+18335233104">(18335233104)</a> or email <a href="mailto:admin@baruchermi.org">admin@baruchermi.org</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
