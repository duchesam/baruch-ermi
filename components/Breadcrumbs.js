import Link from 'next/link';

export default function Breadcrumbs({ items }) {
  return <nav className="breadcrumbs" aria-label="Breadcrumb">
    <ol>
      {items.map((item, index) => <li key={item.href || item.name}>
        {index < items.length - 1
          ? <Link href={item.href}>{item.name}</Link>
          : <span aria-current="page">{item.name}</span>}
      </li>)}
    </ol>
  </nav>;
}
