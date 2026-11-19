import Link from 'next/link';
import Layout from '../../components/Layout';
import Breadcrumbs from '../../components/Breadcrumbs';
import { RESOURCES } from '../../data/resources';
import { breadcrumbSchema, itemListSchema } from '../../lib/seo';

const description = 'Plain-language guides for Tampa Bay property owners covering as-is sales, property review, inherited homes, and purchase-structure questions.';
const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Resources', href: '/resources' },
];

export default function Resources() {
  return <Layout
    title="Property Owner Resources"
    description={description}
    path="/resources"
    pageType="CollectionPage"
    schemas={[
      breadcrumbSchema(crumbs),
      itemListSchema({
        name: 'Baruch-Ermi property owner resources',
        path: '/resources',
        items: RESOURCES.map(resource => ({ name: resource.title, path: `/resources/${resource.slug}` })),
      }),
    ]}
  >
    <section className="page-intro">
      <div className="wrap">
        <Breadcrumbs items={crumbs}/>
        <span className="eyebrow">PROPERTY OWNER RESOURCE CENTER</span>
        <h1>Useful questions.<br/><em>Clearer next steps.</em></h1>
        <p>Use these guides to organize property information and prepare for a more informed conversation. They are educational and do not replace qualified professional advice.</p>
      </div>
    </section>
    <section className="section">
      <div className="wrap resource-list">
        {RESOURCES.map(resource => <article key={resource.slug}>
          <div><span className="eyebrow">GUIDE</span><h2>{resource.title}</h2><p>{resource.summary}</p></div>
          <Link href={`/resources/${resource.slug}`}>Read the guide</Link>
        </article>)}
      </div>
    </section>
    <section className="contact-banner">
      <div className="wrap contact-banner-inner">
        <div><span className="eyebrow">READY TO DISCUSS A PROPERTY?</span><h2>Start with a no-obligation review.</h2></div>
        <Link href="/sell-your-property" className="button button-white">Share the property details</Link>
      </div>
    </section>
  </Layout>;
}
