import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AgentPartner() {
  return (
    <>
      <Header />

      <main className="section">
        <div className="container card agentCard">
          <h1>Have a Listing That Won’t Sell?</h1>

          <p className="small">
            Baruch-Ermi LLC partners with real estate agents to help solve difficult property situations
            through creative finance options such as seller financing, subject-to, lease options, and structured purchase terms.
          </p>

          <h2>Submit a Property for Review</h2>

          <form action="https://formspree.io/f/xlgkylpl" method="POST" className="agentForm">
            <h3>Agent Information</h3>

            <div className="formGrid">
              <div>
                <label>Agent Name *</label>
                <input type="text" name="Agent Name" required />
              </div>

              <div>
                <label>Brokerage *</label>
                <input type="text" name="Brokerage" required />
              </div>

              <div>
                <label>Phone Number *</label>
                <input type="tel" name="Phone Number" required />
              </div>

              <div>
                <label>Email Address *</label>
                <input type="email" name="Email Address" required />
              </div>

              <div className="full">
                <h3>Property Information</h3>
              </div>

              <div className="full">
                <label>Property Address *</label>
                <input type="text" name="Property Address" required />
              </div>

              <div>
                <label>Seller Asking Price</label>
                <input type="text" name="Asking Price" placeholder="$" />
              </div>

              <div>
                <label>Mortgage Balance</label>
                <input type="text" name="Mortgage Balance" placeholder="$" />
              </div>

              <div>
                <label>Monthly Payment</label>
                <input type="text" name="Monthly Payment" placeholder="$" />
              </div>

              <div>
                <label>Occupancy</label>
                <select name="Occupancy">
                  <option value="">Select One</option>
                  <option>Owner Occupied</option>
                  <option>Tenant Occupied</option>
                  <option>Vacant</option>
                  <option>Unknown</option>
                </select>
              </div>

              <div className="full">
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
              </div>

              <div className="full">
                <label>Additional Notes</label>
                <textarea name="Notes" rows="5"></textarea>
              </div>
            </div>

            <p className="small">
              By submitting this form, you agree that Baruch-Ermi LLC may contact you regarding this property submission.
            </p>

            <button type="submit" className="btn submitBtn">
              Submit Property
            </button>
          </form>

          <p className="small disclaimer">
            Baruch-Ermi LLC is not a brokerage and does not provide legal, tax, or financial advice.
            All parties should consult appropriate licensed professionals before entering into any transaction.
          </p>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .agentCard {
          max-width: 950px;
          margin: 0 auto;
          padding: 40px;
        }

        .agentForm {
          margin-top: 25px;
        }

        .agentForm label {
          display: block;
          margin-bottom: 6px;
          font-weight: 600;
        }

        .agentForm input,
        .agentForm select,
        .agentForm textarea {
          width: 100%;
          padding: 13px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          margin-bottom: 18px;
          font-size: 15px;
          box-sizing: border-box;
        }

        .formGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .full {
          grid-column: 1 / -1;
        }

        .submitBtn {
          width: 100%;
          margin-top: 24px;
        }

        .disclaimer {
          margin-top: 30px;
        }

        @media (max-width: 700px) {
          .formGrid {
            grid-template-columns: 1fr;
          }

          .agentCard {
            padding: 25px;
          }
        }
      `}</style>
    </>
  );
}
