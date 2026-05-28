import Link from "next/link";

export default function Header(){
  return (
    <header className="nav">
      <div className="container" style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
        <Link href="/" className="brand">Baruch-Ermi</Link>
        <nav className="navlinks">
          <Link href="/about">About</Link>
          <Link href="/options">Options</Link>
          <Link href="/services">Services</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
          <a className="btn" href="tel:+18335233104">Call (833) 523-3104</a>
        </nav>
      </div>
      <style jsx>{`
        .nav{ position:sticky; top:0; z-index:20; backdrop-filter:saturate(1.2) blur(6px); background:rgba(5,12,24,.72); border-bottom:1px solid rgba(255,255,255,.06); }
        .brand{ font-weight:800; font-size:20px; color:#fff; padding:12px 0; }
        .navlinks{ display:flex; gap:16px; align-items:center; }
        .navlinks a{ color:#d9e6ff; }
        @media (max-width:860px){ .navlinks{ gap:10px; font-size:14px; } .btn{ padding:8px 12px; } }
      `}</style>
    </header>
  );
}
