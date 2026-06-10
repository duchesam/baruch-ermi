import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ThankYou() {
  return (
    <>
      <Header />

      <main className="section">
        <div className="container card" style={{ maxWidth: "850px", textAlign: "center" }}>
          <h1>Thank You!</h1>

          <p className="small">
            We received your property information. A member of Baruch-Ermi LLC
            will review your submission and contact you shortly.
          </p>

          <p>
            For urgent assistance, call:
            <br />
            <a href="tel:18335233104">(833) 523-3104</a>
          </p>

          <a className="btn" href="/">
            Back to Home
          </a>
        </div>
      </main>

      <Footer />
    </>
  );
}
