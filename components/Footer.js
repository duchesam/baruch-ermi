export default function Footer(){
  return (
    <footer className="footer">
      <div className="container inner small">
        <div>© {new Date().getFullYear()} Baruch-Ermi. All rights reserved.</div>
        <div><a href="mailto:admin@baruchermi.org">admin@baruchermi.org</a></div>
      </div>
    </footer>
  );
}
