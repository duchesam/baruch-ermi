export default function Footer(){
  return (
    <footer>
      <div className="container">
        <div className="small">
          © {new Date().getFullYear()} Baruch-Ermi. All rights reserved. ·{" "}
          <a href="mailto:admin@baruchermi.org">admin@baruchermi.org</a> ·{" "}
          <a href="tel:+18335233104">(833) 523-3104</a>
        </div>
      </div>
    </footer>
  );
}
