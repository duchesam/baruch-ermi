import Header from "../components/Header";
import Footer from "../components/Footer";

export default function GetOffer(){
  return (
    <>
      <Header />
      <main className="section">
        <div className="container card" style={{maxWidth:"840px"}}>
          <h1 style={{marginTop:0}}>Get an Offer</h1>
          <p className="small">Email your address and a brief timeline to <a href="mailto:admin@baruchermi.org">admin@baruchermi.org</a> or call <a href="tel:+18335233104">(833) 523-3104</a>. We’ll respond quickly.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
