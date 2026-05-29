cat > pages/privacy-policy.js <<'EOF'
export default function PrivacyPolicy() {
  return (
    <div style={{maxWidth:'900px',margin:'40px auto',padding:'20px',fontFamily:'Arial'}}>
      <h1>Privacy Policy</h1>

      <p>Baruch-Ermi LLC respects your privacy and is committed to protecting your personal information.</p>

      <h2>Information We Collect</h2>
      <ul>
        <li>Name</li>
        <li>Phone Number</li>
        <li>Email Address</li>
        <li>Property Information</li>
      </ul>

      <h2>How We Use Information</h2>
      <ul>
        <li>Respond to inquiries</li>
        <li>Provide property evaluations and offers</li>
        <li>Schedule appointments</li>
        <li>Provide customer support</li>
      </ul>

      <h2>SMS Communications</h2>
      <p>
        By providing your phone number and opting in, you consent to receive SMS
        messages from Baruch-Ermi LLC regarding real estate inquiries,
        appointment reminders, transaction updates, and customer support.
      </p>

      <p>
        Message frequency may vary. Message and data rates may apply.
        Reply STOP to unsubscribe. Reply HELP for assistance.
      </p>

      <p>
        We do not sell or share your mobile information with third parties for
        marketing purposes.
      </p>

      <h2>Contact</h2>
      <p>
        Baruch-Ermi LLC<br/>
        admin@baruchermi.org<br/>
        (833) 523-3104
      </p>
    </div>
  );
}
EOF

cat > pages/terms.js <<'EOF'
export default function Terms() {
  return (
    <div style={{maxWidth:'900px',margin:'40px auto',padding:'20px',fontFamily:'Arial'}}>
      <h1>Terms & Conditions</h1>

      <h2>Services</h2>
      <p>
        Baruch-Ermi LLC provides real estate consultation, property acquisition
        services, seller solutions, and related support.
      </p>

      <h2>No Obligation</h2>
      <p>
        Submitting information through our website or forms does not create any
        obligation to sell property or enter into a transaction.
      </p>

      <h2>SMS Terms</h2>
      <p>
        If you choose to opt in to SMS communications, you agree to receive
        messages regarding your inquiry, appointment reminders, transaction
        updates, and customer support.
      </p>

      <p>
        Message frequency may vary. Message and data rates may apply.
        Reply STOP to unsubscribe. Reply HELP for assistance.
      </p>

      <h2>Contact</h2>
      <p>
        Baruch-Ermi LLC<br/>
        admin@baruchermi.org<br/>
        (833) 523-3104
      </p>
    </div>
  );
}
EOF

git add .
git commit -m "Add privacy policy and terms pages"
git push origin main
