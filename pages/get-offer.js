import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function GetOffer(){
  return (
    <>
      <Header />
      <main className="section">
        <div className="container card" style={{maxWidth:"900px"}}>
          <h1>Get a Cash Offer</h1>
          <p className="small">Email <a href="mailto:admin@baruchermi.org">admin@baruchermi.org</a> or call <a href="tel:+18335233104">(833) 523-3104</a> and we’ll confirm your timeline and next steps.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
