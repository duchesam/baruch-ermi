import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function GetOffer() {
  return (
    <>
      <Header />

      <main className="section">
        <div className="container">
          <div className="offerWrap">
            <section className="card formCard">
              <h1>Get Your No-Obligation Cash Offer</h1>
              <p className="small">
                Tell us about your property and timeline. Baruch-Ermi LLC will
                review your information and contact you with next steps.
              </p>

              <form
                action="https://formspree.io/f/YOUR_FORM_ID"
                method="POST"
                className="sellerForm"
              >
                <h2>Property Information</h2>

                <label>
                  Property Address *
                  <input
                    type="text"
                    name="property_address"
                    placeholder="Street, City, State, ZIP"
                    required
                  />
                </label>

                <label>
                  Property Type
                  <select name="property_type">
                    <option value="">Select one</option>
                    <option>Single-family</option>
                    <option>Condo/Townhouse</option>
                    <option>Multi-family</option>
                    <option>Land</option>
                    <option>Other</option>
                  </select>
                </label>

                <div className="grid3">
                  <label>
                    Bedrooms
                    <input type="text" name="bedrooms" placeholder="3" />
                  </label>

                  <label>
                    Bathrooms
                    <input type="text" name="bathrooms" placeholder="2" />
                  </label>

                  <label>
                    Square Feet
                    <input type="text" name="square_feet" placeholder="1,500" />
                  </label>
                </div>

                <h2>Property Situation</h2>

                <label>
                  Property Condition
                  <select name="property_condition">
                    <option value="">Select one</option>
                    <option>Move-in ready</option>
                    <option>Needs minor repairs</option>
                    <option>Needs major repairs</option>
                    <option>Unknown</option>
                  </select>
                </label>

                <label>
                  Reason for Selling
                  <select name="reason_for_selling">
                    <option value="">Select one</option>
                    <option>Need to sell fast</option>
                    <option>Facing foreclosure</option>
                    <option>Inherited property</option>
                    <option>Tired landlord</option>
                    <option>Relocation</option>
                    <option>Other</option>
                  </select>
                </label>

                <label>
                  When would you ideally like to close?
                  <select name="closing_timeline">
                    <option value="">Select one</option>
                    <option>As soon as possible</option>
                    <option>30-60 days</option>
                    <option>60-90 days</option>
                    <option>Flexible</option>
                    <option>Just exploring options</option>
                  </select>
                </label>

                <label>
                  Additional Details
                  <textarea
                    name="details"
                    rows="4"
                    placeholder="Tell us anything important about the property or your situation."
                  ></textarea>
                </label>

                <h2>Contact Information</h2>

                <div className="grid2">
                  <label>
                    Full Name *
                    <input type="text" name="full_name" required />
                  </label>

                  <label>
                    Phone Number *
                    <input type="tel" name="phone" required />
                  </label>
                </div>

                <label>
                  Email Address
                  <input type="email" name="email" />
                </label>

                <div className="consentBox">
                  <label className="checkboxLabel">
                    <input type="checkbox" name="sms_consent" value="yes" />
                    <span>
                      I agree to receive SMS messages from Baruch-Ermi LLC
                      regarding real estate inquiries, property offers,
                      appointment reminders, transaction updates, and customer
                      support communications. Message frequency may vary.
                      Message and data rates may apply. Reply STOP to
                      unsubscribe. Reply HELP for help. Consent is not a
                      condition of purchase or service.
                    </span>
                  </label>

                  <p className="small">
                    By opting in to SMS communications, you agree to our{" "}
                    <a href="/terms">Terms &amp; Conditions</a> and{" "}
                    <a href="/privacy-policy">Privacy Policy</a>.
                  </p>
                </div>

                <button className="btn submitBtn" type="submit">
                  Get My Cash Offer
                </button>
              </form>
            </section>

            <aside className="card sideCard">
              <h2>What Happens Next?</h2>
              <ul>
                <li>We review your property details.</li>
                <li>We contact you to confirm your situation and timeline.</li>
                <li>You receive clear options with no pressure.</li>
              </ul>

              <h2>Need Help Now?</h2>
              <p>
                Call us directly at{" "}
                <a href="tel:+18335233104">(833) 523-3104</a>.
              </p>

              <p className="small">
                No agents. No pressure. Just respectful conversations and real
                options.
              </p>
            </aside>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .offerWrap {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 28px;
          align-items: start;
        }

        .formCard,
        .sideCard {
          padding: 32px;
        }

        .sellerForm {
          display: flex;
          flex-direction: column;
          gap: 18px;
          margin-top: 24px;
        }

        h2 {
          margin-top: 18px;
          margin-bottom: 0;
        }

        label {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-weight: 700;
        }

        input,
        select,
        textarea {
          width: 100%;
          padding: 13px 14px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          background: rgba(255, 255, 255, 0.06);
          color: #ffffff;
          font-size: 16px;
        }

        select option {
          color: #111827;
        }

        textarea {
          resize: vertical;
        }

        .grid2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .grid3 {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 18px;
        }

        .consentBox {
          padding: 18px;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.04);
        }

        .checkboxLabel {
          flex-direction: row;
          align-items: flex-start;
          gap: 12px;
          font-weight: 500;
        }

        .checkboxLabel input {
          width: auto;
          margin-top: 5px;
        }

        .submitBtn {
          width: 100%;
          justify-content: center;
          border: none;
          cursor: pointer;
          font-size: 17px;
          padding: 15px 20px;
        }

        .sideCard {
          position: sticky;
          top: 100px;
        }

        .sideCard ul {
          padding-left: 20px;
          line-height: 1.8;
        }

        @media (max-width: 900px) {
          .offerWrap {
            grid-template-columns: 1fr;
         
