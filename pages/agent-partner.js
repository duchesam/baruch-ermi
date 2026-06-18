import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AgentPartner() {
  return (
    <>
      <Header />

      <main className="section">
        <div className="container card" style={{ maxWidth: "950px", margin: "0 auto", padding: "40px" }}>
          <h1>Have a Listing That Won’t Sell?</h1>

          <p className="small">
            Baruch-Ermi LLC partners with real estate agents to help solve difficult property situations
            through creative finance options such as seller financing, subject-to, lease options, and structured purchase terms.
          </p>

          <h2>Submit a Property for Review</h2>

          <form action="https://formspree.io/f/xlgkylpl" method="POST">
            <h3>Agent Information</h3>

            <label>Agent Name *</label>
            <input type="text" name="Agent Name" required />

            <label>Brokerage *</label>
            <input type="text" name="Brokerage" required />

            <label>Phone Number *</label>
            <input type="tel" name="Phone Number" required />

            <label>Email Address *</label>
            <input type="email" name="Email Address" required />

            <h3>Property Information</h3>

            <label>Property Address *</label>
            <input type="text" name="Property Address" required />

            <label>Seller Asking Price</label>
            <input type="text" name="Asking Price" placeholder="$" />

            <label>Mortgage Balance</label>
            <input type="text" name="Mortgage Balance" placeholder="$" />

            <label>Monthly Mortgage Payment</label>
            <input type="text" name="Monthly Payment" placeholder="$" />

            <label>Occupancy</label>
            <select name="Occupancy">
              <option value="">Select One</option>
              <option>Owner Occupied</option>
              <option>Tenant Occupied</option>
              <option>Vacant</option>
              <option>Unknown</option>
            </select>

            <label>Seller Situation</label>
            <select name="Seller Situation">
              <option value="">Select One</option>
              <option>Foreclosure</option>
              <option>Pre-Foreclosure</option>
              <option>Expired Listing</option>
              <option>Tired Landlord</option>
              <option>Inherited Property</option>
              <option>Low Equity</option>
              <option>Vacant Property</option>
              <option>Needs Creative Terms</option>
              <option>Other</option>
            </select>

            <label>Additional Notes</label>
            <textarea name="Notes" rows="5"></textarea>

            <p className="small" style={{ marginTop: "20px" }}>
              By submitting this form, you agree that Baruch-Ermi LLC may contact you regarding this property submission.
            </p>

            <button type="submit" className="btn" style={{ width: "100%", marginTop: "20px" }}>
              Submit Property
            </button>
          </form>

          <p className="small" style={{ marginTop: "30px" }}>
            Baruch-Ermi LLC is not a brokerage and does not provide legal, tax, or financial advice.
            All parties should consult appropriate licensed professionals before entering into any transaction.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
