export default function Footer() {
  return (
    <footer className="footer">
      <div className="container inner small">
        <div>
          © {new Date().getFullYear()} Baruch-Ermi. All rights reserved.
        </div>

        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms">Terms & Conditions</a>
          <a href="/faq">FAQ</a>
          <a href="/contact">Contact</a>
          <a href="mailto:admin@baruchermi.org">admin@baruchermi.org</a>
        </div>
      </div>
    </footer>
  );
}
