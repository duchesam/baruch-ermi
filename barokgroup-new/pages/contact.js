import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Contact(){
  return (
    <>
      <Header />
      <main className="section">
        <div className="container card" style={{maxWidth:"900px"}}>
          <h1>Contact</h1>
          <p>We move fast and keep things simple.</p>
          <p><strong>Phone:</strong> <a href="tel:+18335233104">(833) 523-3104</a></p>
          <p><strong>Email:</strong> <a href="mailto:admin@baruchermi.org">admin@baruchermi.org</a></p>
          <p className="small">Baruch-Ermi — Nationwide foreclosure & auction solutions.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
