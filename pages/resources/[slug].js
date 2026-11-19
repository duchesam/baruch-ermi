import Link from 'next/link';
import Layout from '../../components/Layout';
import Breadcrumbs from '../../components/Breadcrumbs';
import { RESOURCES, RESOURCE_UPDATED, getResource } from '../../data/resources';
import { articleSchema, breadcrumbSchema, faqSchema } from '../../lib/seo';

const formatDate = value => new Date(`${value}T12:00:00Z`).toLocaleDateString('en-US', {
  month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC',
});

export default function ResourcePage({ resource }) {
  const path = `/resources/${resource.slug}`;
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Resources', href: '/resources' },
    { name: resource.shortTitle, href: path },
  ];
  const related = RESOURCES.filter(item => item.slug !== resource.slug).slice(0, 3);

  return <Layout
    title={resource.shortTitle}
    description={resource.description}
    path={path}
    pageType="Article"
    schemas={[
      breadcrumbSchema(crumbs),
      articleSchema({
        headline: resource.title,
        description: resource.description,
        path,
        datePublished: RESOURCE_UPDATED,
        dateModified: RESOURCE_UPDATED,
      }),
      faqSchema(resource.faqs),
    ]}
  >
    <article>
      <header className="page-intro resource-hero">
        <div className="wrap">
          <Breadcrumbs items={crumbs}/>
          <span className="eyebrow">BARUCH-ERMI PROPERTY GUIDE</span>
          <h1>{resource.title}</h1>
          <p>{resource.summary}</p>
          <small>Reviewed {formatDate(RESOURCE_UPDATED)} · Educational information, not professional advice</small>
        </div>
      </header>
      <div className="section">
        <div className="wrap article-layout">
          <div className="article-body">
            {resource.sections.map(section => <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs?.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && <ul>{section.bullets.map(item => <li key={item}>{item}</li>)}</ul>}
            </section>)}
            {resource.sources.length > 0 && <section className="article-sources">
              <h2>Official resources</h2>
              <p>Use these sources as starting points and confirm current requirements for your situation.</p>
              <ul>{resource.sources.map(([label, url]) => <li key={url}><a href={url} rel="noreferrer">{label}</a></li>)}</ul>
            </section>}
            <section className="article-disclaimer" aria-label="Important notice">
              <h2>Important</h2>
              <p>This guide is general educational information. It is not an appraisal, legal advice, tax advice, lending advice, financial advice, or a purchase offer. Verify material facts and obtain qualified independent advice before signing a transaction.</p>
            </section>
          </div>
          <aside className="article-aside">
            <span className="eyebrow">DISCUSS YOUR PROPERTY</span>
            <h2>Turn the checklist into a clear conversation.</h2>
            <p>Share the address, condition, timeline, and the questions you are trying to resolve.</p>
            <Link className="button button-primary" href="/sell-your-property">Request a property review</Link>
          </aside>
        </div>
      </div>
      <section className="section approach">
        <div className="wrap faq-list">
          <span className="eyebrow">COMMON QUESTIONS</span>
          <h2 className="content-section-title">Quick answers</h2>
          {resource.faqs.map(([question, answer]) => <details key={question}>
            <summary>{question}</summary><p>{answer}</p>
          </details>)}
        </div>
      </section>
      <section className="section related-section">
        <div className="wrap">
          <span className="eyebrow">CONTINUE READING</span>
          <div className="related-links">
            {related.map(item => <Link key={item.slug} href={`/resources/${item.slug}`}>{item.shortTitle}</Link>)}
            <Link href="/resources">View all resources</Link>
          </div>
        </div>
      </section>
    </article>
  </Layout>;
}

export function getStaticPaths() {
  return { paths: RESOURCES.map(resource => ({ params: { slug: resource.slug } })), fallback: false };
}

export function getStaticProps({ params }) {
  const resource = getResource(params.slug);
  return resource ? { props: { resource } } : { notFound: true };
}
