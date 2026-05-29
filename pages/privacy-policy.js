import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <>
      <Header />

      <main className="section">
        <div className="container">
          <h1>Privacy Policy</h1>

          <p className="small">
            Baruch-Ermi LLC respects your privacy and is committed to protecting
            your personal information.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We may collect your name, phone number, email address, property
            address, property details, and other information you voluntarily
            submit through our website or forms.
          </p>

          <h2>How We Use Your Information</h2>
          <p>
            We use your information to respond to inquiries, evaluate property
            details, provide property offers, schedule appointments, send
            transaction updates, and provide customer support.
          </p>

          <h2>SMS Communications</h2>
          <p>
            By providing your phone number and choosing to opt in, you consent
            to receive SMS messages from Baruch-Ermi LLC regarding real estate
            inquiries, appointment reminders, transaction updates, property
            offers, and customer support communications.
          </p>

          <p>
            Message frequency may vary. Message and data rates may apply. Reply
            STOP to unsubscribe. Reply HELP for assistance.
          </p>

          <p>
            SMS consent is optional and is not a condition of purchase or
            service.
          </p>

          <h2>Information Sharing</h2>
          <p>
            We do not sell or share your mobile information with third parties
            for marketing purposes.
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
