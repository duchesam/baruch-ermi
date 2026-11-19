import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { LOCATIONS } from '../data/locations.js';
import { RESOURCES } from '../data/resources.js';
import { faqSchema, organizationSchema, serviceSchema } from '../lib/seo.js';
import { renderSitemap } from '../lib/sitemap.mjs';
import { sitemapEntries } from '../lib/public-pages.mjs';

test('public location and resource slugs, titles, and descriptions are complete and unique', () => {
  const records = [
    ...LOCATIONS.map(item => ({ slug: item.slug, title: item.title, description: item.metaDescription, faqs: item.faqs })),
    ...RESOURCES.map(item => ({ slug: item.slug, title: item.title, description: item.description, faqs: item.faqs })),
  ];
  assert.equal(new Set(records.map(item => item.slug)).size, records.length);
  assert.equal(new Set(records.map(item => item.title)).size, records.length);
  for (const record of records) {
    assert.match(record.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(record.description.length >= 100 && record.description.length <= 170);
    assert.ok(record.faqs.length >= 3);
  }
});

test('structured data identifies the company, services, and complete FAQ answers', () => {
  const organization = organizationSchema();
  assert.equal(organization['@type'], 'Organization');
  assert.equal(organization.telephone, '+1-813-666-5633');
  assert.equal(organization.url, 'https://baruch-ermi.org/');

  const service = serviceSchema({
    name: 'Riverview property review',
    description: 'Review a Riverview property opportunity.',
    path: '/locations/riverview',
  });
  assert.equal(service.url, 'https://baruch-ermi.org/locations/riverview');
  assert.equal(service.provider['@id'], 'https://baruch-ermi.org/#organization');

  const faq = faqSchema(LOCATIONS[0].faqs);
  assert.equal(faq.mainEntity.length, LOCATIONS[0].faqs.length);
  assert.ok(faq.mainEntity.every(item => item.name && item.acceptedAnswer.text));
});

test('sitemap contains unique canonical public URLs and excludes private workspace routes', () => {
  const entries = sitemapEntries();
  const urls = entries.map(entry => entry.loc);
  assert.equal(new Set(urls).size, urls.length);
  const blocked = ['/portal', '/lead-desk', '/lead-automation', '/creative-financing', '/operations', '/sign-in', '/api'];
  for (const value of urls) {
    const path = new URL(value).pathname;
    assert.ok(!blocked.some(prefix => path === prefix || path.startsWith(`${prefix}/`)), `${path} must not be in sitemap`);
  }
  for (const location of LOCATIONS) assert.ok(urls.includes(`https://baruch-ermi.org/locations/${location.slug}`));
  for (const resource of RESOURCES) assert.ok(urls.includes(`https://baruch-ermi.org/resources/${resource.slug}`));
  const xml = renderSitemap(entries);
  assert.match(xml, /^<\?xml version="1.0" encoding="UTF-8"\?>/);
  assert.equal((xml.match(/<url>/g) || []).length, entries.length);
});

test('crawler controls allow OpenAI search while separating training and private routes', () => {
  const robots = fs.readFileSync(new URL('../public/robots.txt', import.meta.url), 'utf8');
  assert.match(robots, /User-agent: OAI-SearchBot\nAllow: \//);
  assert.match(robots, /User-agent: GPTBot\nDisallow: \//);
  assert.match(robots, /Disallow: \/portal/);
  assert.match(robots, /Sitemap: https:\/\/baruch-ermi\.org\/sitemap\.xml/);

  const llms = fs.readFileSync(new URL('../public/llms.txt', import.meta.url), 'utf8');
  assert.match(llms, /Canonical website: https:\/\/baruch-ermi\.org\//);
  assert.doesNotMatch(llms, /https:\/\/baruch-ermi\.org\/(portal|lead-desk|creative-financing|operations|sign-in)/);
});
