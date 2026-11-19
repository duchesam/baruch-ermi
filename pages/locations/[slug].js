import Link from 'next/link';
import Layout from '../../components/Layout';
import Breadcrumbs from '../../components/Breadcrumbs';
import { LOCATIONS, LOCATION_UPDATED, getLocation } from '../../data/locations';
import { breadcrumbSchema, faqSchema, serviceSchema } from '../../lib/seo';

export default function LocationPage({ location }) {
  const path = `/locations/${location.slug}`;
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Locations', href: '/locations' },
    { name: location.name, href: path },
  ];
  const nearby = LOCATIONS.filter(item => item.slug !== location.slug).slice(0, 3);

  return <Layout
    title={`Property Solutions in ${location.name}, FL`}
    description={location.metaDescription}
    path={path}
    schemas={[
      breadcrumbSchema(crumbs),
      serviceSchema({
        name: location.title,
        description: location.metaDescription,
        path,
        areaServed: { '@type': 'City', name: `${location.name}, Florida` },
        serviceType: 'Residential property opportunity review',
      }),
      faqSchema(location.faqs),
    ]}
  >
    <section className="page-intro">
      <div className="wrap">
        <Breadcrumbs items={crumbs}/>
        <span className="eyebrow">{location.county} · PROPERTY REVIEW</span>
        <h1>{location.name} property solutions.<br/><em>Start with the details.</em></h1>
        <p>{location.intro}</p>
      </div>
    </section>
    <section className="section">
      <div className="wrap content-grid">
        <div>
          <span className="eyebrow">WHAT WE REVIEW</span>
          <h2>A practical conversation about the property and your goal.</h2>
          <p>Baruch-Ermi is a real estate investment company, not an appraisal, law, tax, or lending firm. We organize the property facts and discuss whether there may be a purchase fit.</p>
          <Link className="button button-dark" href="/sell-your-property">Request a property review</Link>
        </div>
        <div className="info-list">
          {location.highlights.map(([title, body]) => <article className="info-item" key={title}>
            <h3>{title}</h3><p>{body}</p>
          </article>)}
        </div>
      </div>
    </section>
    <section className="section approach">
      <div className="wrap faq-list">
        <span className="eyebrow">{location.name.toUpperCase()} PROPERTY QUESTIONS</span>
        <h2 className="content-section-title">Helpful starting answers</h2>
        {location.faqs.map(([question, answer]) => <details key={question}>
          <summary>{question}</summary><p>{answer}</p>
        </details>)}
        <p className="content-updated">Content reviewed {new Date(`${LOCATION_UPDATED}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}.</p>
      </div>
    </section>
    <section className="section related-section">
      <div className="wrap">
        <span className="eyebrow">NEARBY MARKETS</span>
        <div className="related-links">
          {nearby.map(item => <Link key={item.slug} href={`/locations/${item.slug}`}>{item.name}, Florida</Link>)}
          <Link href="/locations">View all locations</Link>
        </div>
      </div>
    </section>
  </Layout>;
}

export function getStaticPaths() {
  return { paths: LOCATIONS.map(location => ({ params: { slug: location.slug } })), fallback: false };
}

export function getStaticProps({ params }) {
  const location = getLocation(params.slug);
  return location ? { props: { location } } : { notFound: true };
}
