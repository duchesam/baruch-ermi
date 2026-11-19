import Link from 'next/link';
import Layout from '../../components/Layout';
import Breadcrumbs from '../../components/Breadcrumbs';
import { LOCATIONS } from '../../data/locations';
import { breadcrumbSchema, itemListSchema } from '../../lib/seo';

const description = 'Explore Baruch-Ermi property-review coverage across Riverview, Wimauma, Brandon, Tampa, Wesley Chapel, and surrounding Tampa Bay communities.';
const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Locations', href: '/locations' },
];

export default function Locations() {
  return <Layout
    title="Tampa Bay Property Solutions by Location"
    description={description}
    path="/locations"
    pageType="CollectionPage"
    schemas={[
      breadcrumbSchema(crumbs),
      itemListSchema({
        name: 'Baruch-Ermi Tampa Bay service locations',
        path: '/locations',
        items: LOCATIONS.map(location => ({ name: location.name, path: `/locations/${location.slug}` })),
      }),
    ]}
  >
    <section className="page-intro">
      <div className="wrap">
        <Breadcrumbs items={crumbs}/>
        <span className="eyebrow">TAMPA BAY & SURROUNDING COMMUNITIES</span>
        <h1>Local property questions.<br/><em>A clearer place to begin.</em></h1>
        <p>Choose a community to see how we approach property condition, timing, title, and possible purchase structures. Every opportunity still receives an individual review.</p>
      </div>
    </section>
    <section className="section">
      <div className="wrap content-card-grid">
        {LOCATIONS.map(location => <article className="content-card" key={location.slug}>
          <span className="eyebrow">{location.county}</span>
          <h2>{location.name}, Florida</h2>
          <p>{location.intro}</p>
          <Link href={`/locations/${location.slug}`}>Explore {location.name}</Link>
        </article>)}
      </div>
    </section>
    <section className="contact-banner">
      <div className="wrap contact-banner-inner">
        <div><span className="eyebrow">DON’T SEE YOUR COMMUNITY?</span><h2>Ask about another Tampa Bay property.</h2></div>
        <Link href="/sell-your-property" className="button button-white">Request a property review</Link>
      </div>
    </section>
  </Layout>;
}
