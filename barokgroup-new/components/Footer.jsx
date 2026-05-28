export default function Footer(){
  return (
    <footer className="footer">
      <div className="container small">
        <div>© {new Date().getFullYear()} Baruch-Ermi. All rights reserved.</div>
        <div>
          <a href="mailto:admin@baruchermi.org" style={{marginLeft:8}}>admin@baruchermi.org</a>
        </div>
      </div>
    </footer>
  );
}
