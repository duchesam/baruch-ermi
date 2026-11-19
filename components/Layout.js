import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import AttributionTracker from './AttributionTracker';
import { SITE, absoluteUrl, webPageSchema, websiteSchema } from '../lib/seo';

function safeJson(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export default function Layout({
  title,
  description = SITE.description,
  path = '/',
  image = SITE.socialImage,
  pageType = 'WebPage',
  schemas = [],
  children,
  privatePage = false,
}) {
  const canonical = absoluteUrl(path);
  const socialImage = absoluteUrl(image);
  const fullTitle = title.endsWith(SITE.name) ? title : `${title} | ${SITE.name}`;
  const graph = privatePage ? [] : [
    websiteSchema(),
    webPageSchema({ title: fullTitle, description, path, pageType, image }),
    ...schemas,
  ];

  return <>
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description}/>
      <meta name="robots" content={privatePage
        ? 'noindex,nofollow,noarchive,nosnippet'
        : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'}/>
      <link rel="canonical" href={canonical}/>
      <link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
      <meta name="theme-color" content="#2158e8"/>
      <meta name="format-detection" content="telephone=no"/>

      <meta property="og:type" content={pageType === 'Article' ? 'article' : 'website'}/>
      <meta property="og:locale" content={SITE.locale}/>
      <meta property="og:site_name" content={SITE.shortName}/>
      <meta property="og:title" content={fullTitle}/>
      <meta property="og:description" content={description}/>
      <meta property="og:url" content={canonical}/>
      <meta property="og:image" content={socialImage}/>
      <meta property="og:image:alt" content="A Florida home representing Baruch-Ermi property solutions"/>

      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:title" content={fullTitle}/>
      <meta name="twitter:description" content={description}/>
      <meta name="twitter:image" content={socialImage}/>

      {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION &&
        <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}/>}
      {process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION &&
        <meta name="msvalidate.01" content={process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION}/>}
      {graph.length > 0 && <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJson({ '@context': 'https://schema.org', '@graph': graph }) }}
      />}
    </Head>
    {!privatePage && <AttributionTracker/>}
    <Header/>
    <main id="main-content">{children}</main>
    <Footer/>
  </>;
}
