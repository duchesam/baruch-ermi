import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Terms() {
  return (
    <>
      <Header />

      <main className="section">
        <div className="container">
          <h1>Terms &amp; Conditions</h1>

          <p className="small">
            By using this website and submitting information to Baruch-Ermi LLC,
            you agree to these Terms and Conditions.
          </p>

          <h2>Services</h2>
          <p>
            Baruch-Ermi LLC provides real estate consultation, property
            acquisition services, seller solutions, and related support.
          </p>

          <h2>No Obligation</h2>
          <p>
            Submitting information through our website or forms does not create
            any obligation to sell property or enter into a transaction.
          </p>

          <h2>SMS Communications</h2>
          <p>
            If you choose to opt in to SMS communications, you agree to receive
            text messages from Baruch-Ermi LLC regarding your inquiry,
            appointment reminders, transaction updates, property offers, and
            customer support communications.
          </p>

          <p>
            Message frequency may vary. Message and data rates may apply. Reply
            STOP to unsubscribe. Reply HELP for assistance.
          </p>

          <p>
            SMS consent is optional and is not a condition of purchase or
            service.
          </p>

          <h2>Privacy</h2>
          <p>
            Please review our Privacy Policy to understand how we collect, use,
            and protect your information.
          </p>

          <h2>Contact Information</h2>
          <p>
            Baruch-Ermi LLC
            <br />
            admin@baruchermi.org
            <br />
            (833) 523-3104
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
