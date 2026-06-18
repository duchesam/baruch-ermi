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
  </div>

  <h3>Property Information</h3>

  <div className="formGrid">
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

  <button type="submit" className="btn" style={{ width: "100%", marginTop: "24px" }}>
    Submit Property
  </button>

  <style jsx>{`
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
      border: 1px solid rgba(255,255,255,.18);
      margin-bottom: 18px;
      font-size: 15px;
    }

    .formGrid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 18px;
    }

    .full {
      grid-column: 1 / -1;
    }

    @media (max-width: 700px) {
      .formGrid {
        grid-template-columns: 1fr;
      }
    }
  `}</style>
</form>
