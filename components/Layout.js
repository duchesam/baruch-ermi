import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

const siteUrl = 'https://baruch-ermi.org';
const defaultDescription = 'Explore property solutions, as-is home sales, and real estate investment relationships across Tampa Bay with Baruch-Ermi LLC.';
export default function Layout({title,description,path='/',children,privatePage=false}){
  const pageTitle = title ? `${title} | Baruch-Ermi LLC` : 'Baruch-Ermi LLC | Tampa Bay Property Solutions';
  const summary = description || defaultDescription;
  const canonical = siteUrl + (path === '/' ? '/' : path.replace(/\/$/, ''));
  const breadcrumbs = path !== '/' && !privatePage ? {
    '@context':'https://schema.org',
    '@type':'BreadcrumbList',
    itemListElement:[
      {'@type':'ListItem',position:1,name:'Home',item:siteUrl+'/'},
      {'@type':'ListItem',position:2,name:title || 'Page',item:canonical}
    ]
  } : null;
  return <><Head>
    <title>{pageTitle}</title>
    <meta name="description" content={summary}/>
    <link rel="canonical" href={canonical}/>
    <meta name="robots" content={privatePage?'noindex,nofollow,noarchive':'index,follow,max-image-preview:large'}/>
    <meta property="og:type" content="website"/>
    <meta property="og:site_name" content="Baruch-Ermi LLC"/>
    <meta property="og:title" content={pageTitle}/>
    <meta property="og:description" content={summary}/>
    <meta property="og:url" content={canonical}/>
    <meta property="og:image" content={siteUrl+'/images/florida-home-v2.webp'}/>
    <meta name="twitter:card" content="summary_large_image"/>
    <meta name="twitter:title" content={pageTitle}/>
    <meta name="twitter:description" content={summary}/>
    <meta name="twitter:image" content={siteUrl+'/images/florida-home-v2.webp'}/>
    {breadcrumbs && <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbs)}}/>}
  </Head><Header/><main id="main-content">{children}</main><Footer/></>;
}
