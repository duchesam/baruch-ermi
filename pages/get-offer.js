import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function GetOffer() {
  return (
    <>
      <Header />

      <main className="section">
        <div className="container">

          <div className="card" style={{ maxWidth: "900px", margin: "0 auto" }}>
            <h1>Get Your No-Obligation Cash Offer</h1>

            <p className="small">
              Tell us about your property and we'll review your situation and
              contact you shortly.
            </p>

            <form
              action="https://formspree.io/f/YOUR_FORM_ID"
              method="POST"
            >

              <h2>Property Information</h2>

              <label>Property Address *</label>
              <input
                type="text"
                name="property_address"
                required
                style={inputStyle}
              />

              <label>Property Type *</label>
              <select
                name="property_type"
                required
                style={inputStyle}
              >
                <option value="">Select</option>
                <option>Single Family</option>
                <option>Condo / Townhouse</option>
                <option>Multi-Family</option>
                <option>Land</option>
              </select>

              <div style={rowStyle}>
                <div>
                  <label>Bedrooms</label>
                  <input
                    type="number"
                    name="bedrooms"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label>Bathrooms</label>
                  <input
                    type="number"
                    step="0.5"
                    name="bathrooms"
                    style={inputStyle}
                  />
                </div>
              </div>

              <label>Approximate Square Footage</label>
              <input
                type="text"
                name="square_feet"
                style={inputStyle}
              />

              <h2>Property Situation</h2>

              <label>Property Condition</label>
              <select
                name="condition"
                style={inputStyle}
              >
                <option>Move-in Ready</option>
                <option>Needs Minor Repairs</option>
                <option>Needs Major Repairs</option>
              </select>

              <label>Reason For Selling</label>
              <select
                name="reason_for_selling"
                style={inputStyle}
              >
                <option>Need To Sell Fast</option>
                <option>Facing Foreclosure</option>
                <option>Inherited Property</option>
                <option>Tired Landlord</option>
                <option>Other</option>
              </select>

              <label>Desired Closing Timeline</label>
              <select
                name="closing_timeline"
                style={inputStyle}
              >
                <option>ASAP (0-30 Days)</option>
                <option>30-60 Days</option>
                <option>60-90 Days</option>
                <option>Flexible</option>
              </select>

              <h2>Contact Information</h2>

              <label>Full Name *</label>
              <input
                type="text"
                name="full_name"
                required
                style={inputStyle}
              />

              <label>Phone Number *</label>
              <input
                type="tel"
                name="phone"
                required
                style={inputStyle}
              />

              <label>Email Address</label>
              <input
                type="email"
                name="email"
                style={inputStyle}
              />

              <h2>SMS Consent</h2>

              <label
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "flex-start",
                  marginTop: "10px"
                }}
              >
                <input
                  type="checkbox"
                  name="sms_consent"
                />

                <span>
                  I agree to receive SMS messages from Baruch-Ermi LLC
                  regarding real estate inquiries, appointment reminders,
                  transaction updates, property offers, and customer support
                  communications. Message frequency may vary. Message and
                  data rates may apply. Reply STOP to unsubscribe.
                  Reply HELP for assistance. Consent is not a condition of
                  purchase or service.
                </span>
              </label>

              <div style={{ marginTop: "20px" }}>
                <a href="/privacy-policy">
                  Privacy Policy
                </a>
                {" | "}
                <a href="/terms">
                  Terms & Conditions
                </a>
              </div>

              <button
                type="submit"
                className="btn"
                style={{ marginTop: "30px" }}
              >
                Get My Cash Offer
              </button>

            </form>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "6px",
  marginBottom: "18px",
  borderRadius: "8px",
  border: "1px solid #333",
};

const rowStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "15px",
};
