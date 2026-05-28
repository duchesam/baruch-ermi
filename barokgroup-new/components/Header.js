import Link from "next/link";
export default function Header(){
  return (
    <header className="header">
      <div className="logo"><Link href="/">Baruch-Ermi</Link></div>
      <nav className="nav">
        <Link href="/services">Services</Link>
        <Link href="/options">Options</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  );
}
