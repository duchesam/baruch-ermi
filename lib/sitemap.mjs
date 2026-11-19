const escapeXml = value => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

export function renderSitemap(entries) {
  const urls = entries.map(({ loc, lastmod }) => {
    const modified = lastmod ? `<lastmod>${escapeXml(lastmod)}</lastmod>` : '';
    return `<url><loc>${escapeXml(loc)}</loc>${modified}</url>`;
  }).join('');
  return `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
}
