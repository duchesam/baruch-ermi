import Link from "next/link";

export default function Header() {
  return (
    <header className="nav">
      <div className="navwrap">
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
          background: rgba(5, 12, 24, 0.92);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .navwrap {
          width: 100%;
          min-height: 72px;
          padding: 0 48px;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
        }

        .brand {
          justify-self: start;
          font-size: 24px;
          font-weight: 800;
          color: #ffffff;
          text-decoration: none;
        }

        .navlinks {
          justify-self: center;
          display: flex;
          align-items: center;
          gap: 34px;
        }

        .navlinks a {
          color: #e5e7eb;
          text-decoration: none;
          font-size: 18px;
          font-weight: 500;
        }

        .navlinks a:hover {
          color: #ffffff;
        }

        .phonebtn {
          justify-self: end;
          white-space: nowrap;
        }

        @media (max-width: 900px) {
          .navwrap {
            grid-template-columns: 1fr;
            gap: 14px;
            padding: 16px 20px;
          }

          .brand,
          .navlinks,
          .phonebtn {
            justify-self: center;
          }

          .navlinks {
            gap: 16px;
            flex-wrap: wrap;
          }
        }
      `}</style>
    </header>
  );
}
