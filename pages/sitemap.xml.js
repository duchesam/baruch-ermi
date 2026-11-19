import { renderSitemap } from '../lib/sitemap.mjs';
import { sitemapEntries } from '../lib/public-pages.mjs';

export function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
  res.write(renderSitemap(sitemapEntries()));
  res.end();
  return { props: {} };
}

export default function Sitemap() {
  return null;
}
