import Link from "next/link";
import { useState } from "react";

export default function Header(){
  const [open,setOpen] = useState(false);
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link href="/" className="brand" onClick={()=>setOpen(false)}>
          <span className="dot" />
          <span>Baruch-Ermi</span>
        </Link>

        {/* desktop */}
        <nav className="menu">
          <Link href="/services">Services</Link>
          <Link href="/options">Options</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/contact" className="btn btn-primary">Contact</Link>
        </nav>

        {/* mobile */}
        <button className="hamburger btn" onClick={()=>setOpen(v=>!v)} aria-label="Menu">☰</button>
      </div>

      {open && (
        <div className="container drawer" style={{paddingBottom:12}}>
          <div className="card" style={{display:"grid",gap:10}}>
            <Link href="/services" onClick={()=>setOpen(false)}>Services</Link>
            <Link href="/options" onClick={()=>setOpen(false)}>Options</Link>
            <Link href="/faq" onClick={()=>setOpen(false)}>FAQ</Link>
            <Link href="/terms" onClick={()=>setOpen(false)}>Terms</Link>
            <Link href="/contact" className="btn btn-primary" onClick={()=>setOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
}
