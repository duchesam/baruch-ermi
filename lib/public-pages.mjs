import { AUTOMATIONS } from '../data/automations.js';
import { LOCATIONS, LOCATION_UPDATED } from '../data/locations.js';
import { RESOURCES, RESOURCE_UPDATED } from '../data/resources.js';
import { absoluteUrl } from './seo.js';

const CORE_UPDATED = '2026-11-18';
const corePages = [
  '/',
  '/sell-your-property',
  '/investors',
  '/agent-partners',
  '/options',
  '/locations',
  '/resources',
  '/about',
  '/contact',
  '/faq',
  '/privacy-policy',
  '/terms',
  '/automations',
];

export function sitemapEntries() {
  const entries = corePages.map(path => ({ loc: absoluteUrl(path), lastmod: CORE_UPDATED }));
  LOCATIONS.forEach(location => entries.push({ loc: absoluteUrl(`/locations/${location.slug}`), lastmod: LOCATION_UPDATED }));
  RESOURCES.forEach(resource => entries.push({ loc: absoluteUrl(`/resources/${resource.slug}`), lastmod: RESOURCE_UPDATED }));
  const demos = new Set();
  AUTOMATIONS.forEach(product => {
    entries.push({ loc: absoluteUrl(`/automations/${product.slug}`), lastmod: CORE_UPDATED });
    if (product.demoSlug) demos.add(product.demoSlug);
  });
  demos.forEach(slug => entries.push({ loc: absoluteUrl(`/demos/${slug}`), lastmod: CORE_UPDATED }));
  return entries;
}
