import Link from "next/link";

export default function Header() {
  return (
    <header className="nav">
      <div className="container navwrap">
        
        <Link href="/" className="brand">
          Baruch-Ermi
        </Link>

        <nav className="navlinks">
          <Link href="/about">About</Link>
          <Link href="/options">Options</Link>
          <Link href="/services">Services</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <a className="btn phonebtn" href="tel:18335233104">
          Call (833) 523-3104
        </a>

      </div>

      <style jsx>{`
        .nav {
          position: sticky;
          top: 0;
          z-index: 20;
          backdrop-filter: saturate(1.2) blur(6px);
          background: rgba(5, 12, 24, 0.75);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .navwrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 72px;
        }

        .brand {
          font-size: 28px;
          font-weight: 800;
          color: #ffffff;
          text-decoration: none;
          flex: 1;
        }

        .navlinks {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 32px;
          flex: 2;
        }

        .navlinks a {
          color: #e5e7eb;
          text-decoration: none;
          font-size: 16px;
          font-weight: 500;
        }

        .navlinks a:hover {
          color: #ffffff;
        }

        .phonebtn {
          flex: 1;
          display: flex;
          justify-content: flex-end;
        }

        @media (max-width: 900px) {
          .navwrap {
            flex-direction: column;
            gap: 12px;
            padding: 12px 0;
          }

          .brand {
            text-align: center;
          }

          .navlinks {
            gap: 16px;
            flex-wrap: wrap;
          }

          .phonebtn {
            justify-content: center;
          }
        }
      `}</style>
    </header>
  );
}
