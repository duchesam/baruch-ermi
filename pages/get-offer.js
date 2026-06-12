import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function GetOffer() {
  return (
    <>
      <Header />

      <main className="section" style={{ paddingTop: "20px" }}>
        <div
          className="container card"
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            padding: "40px",
          }}
        >
          <h1>Get Your Cash Offer</h1>

          <p className="small" style={{ marginBottom: "25px" }}>
            Fill out the form below and a member of our team will contact you
            within 24 hours.
          </p>

          <form
  action="https://formspree.io/f/xdajryqo"
  method="POST"
>
  <input
  type="hidden"
  name="_next"
  value="https://baruch-ermi.org/thank-you"
/>
  <div style={{ marginBottom: "15px" }}>
              <label>Full Name *</label>
              <input
                type="text"
                name="Full Name"
                required
                style={{ width: "100%", padding: "12px" }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Phone Number (Optional)</label>
              <input
                type="tel"
                name="Phone Number"
                style={{ width: "100%", padding: "12px" }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Email Address</label>
              <input
                type="email"
                name="Email"
                style={{ width: "100%", padding: "12px" }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Property Address *</label>
              <input
                type="text"
                name="Property Address"
                required
                style={{ width: "100%", padding: "12px" }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>City</label>
              <input
                type="text"
                name="City"
                style={{ width: "100%", padding: "12px" }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>State</label>
              <input
                type="text"
                name="State"
                style={{ width: "100%", padding: "12px" }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Estimated Mortgage Balance</label>
              <input
                type="text"
                name="Mortgage Balance"
                placeholder="$"
                style={{ width: "100%", padding: "12px" }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Desired Selling Price</label>
              <input
                type="text"
                name="Desired Price"
                placeholder="$"
                style={{ width: "100%", padding: "12px" }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Property Condition</label>
              <select
                name="Property Condition"
                style={{ width: "100%", padding: "12px" }}
              >
                <option>Excellent</option>
                <option>Good</option>
                <option>Fair</option>
                <option>Needs Repairs</option>
              </select>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Reason For Selling</label>
              <textarea
                name="Reason For Selling"
                rows="4"
                style={{ width: "100%", padding: "12px" }}
              ></textarea>
            </div>

            <div style={{ marginBottom: "20px" }}>
  <label>
    <input
      type="checkbox"
      name="SMS Consent"
      value="Yes"
    />{" "}
    By checking this box and voluntarily providing your phone number, you agree
    to receive transactional SMS messages from Baruch-Ermi LLC regarding your
    inquiry, appointment scheduling, and transaction updates. Message frequency
    may vary. Message and data rates may apply. Reply STOP to unsubscribe. Reply
    HELP for assistance. Consent is not a condition of purchase.
  </label>

  <p style={{ marginTop: "12px" }}>
    Privacy Policy:{" "}
    <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
      View Privacy Policy
    </a>
    <br />
    Terms &amp; Conditions:{" "}
    <a href="/terms" target="_blank" rel="noopener noreferrer">
      View Terms &amp; Conditions
    </a>
  </p>
</div>

            <button
              type="submit"
              className="btn"
              style={{
                width: "100%",
                padding: "15px",
                fontSize: "18px",
              }}
            >
              Get My Cash Offer
            </button>
          </form>

          <p
            className="small"
            style={{
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            By submitting this form you agree to our Privacy Policy and Terms &
            Conditions.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
