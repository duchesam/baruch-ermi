export const SITE = Object.freeze({
  name: 'Baruch-Ermi LLC',
  shortName: 'Baruch-Ermi',
  url: 'https://baruch-ermi.org',
  locale: 'en_US',
  language: 'en-US',
  phone: '+1-813-666-5633',
  phoneDisplay: '(813) 666-5633',
  email: 'sdutch2013@gmail.com',
  description: 'Thoughtful property solutions and real estate investment relationships in Tampa Bay.',
  socialImage: '/images/florida-home-v2.webp',
});

export function absoluteUrl(path = '/') {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE.url}${path === '/' ? '/' : `/${String(path).replace(/^\/+/, '')}`}`;
}

export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    alternateName: SITE.shortName,
    url: `${SITE.url}/`,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/favicon.svg'),
    },
    image: absoluteUrl(SITE.socialImage),
    email: SITE.email,
    telephone: SITE.phone,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.phone,
      email: SITE.email,
      contactType: 'customer service',
      areaServed: 'US-FL',
      availableLanguage: ['English'],
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Tampa Bay, Florida' },
      { '@type': 'AdministrativeArea', name: 'Hillsborough County, Florida' },
      { '@type': 'City', name: 'Riverview, Florida' },
      { '@type': 'City', name: 'Wimauma, Florida' },
      { '@type': 'City', name: 'Brandon, Florida' },
      { '@type': 'City', name: 'Tampa, Florida' },
      { '@type': 'City', name: 'Wesley Chapel, Florida' },
    ],
    knowsAbout: [
      'Residential property acquisitions',
      'As-is property sales',
      'Inherited property review',
      'Seller financing',
      'Subject-To purchase structures',
      'Real estate workflow automation',
    ],
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: `${SITE.url}/`,
    name: SITE.shortName,
    inLanguage: SITE.language,
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE.url}/#organization`,
      name: SITE.name,
      url: `${SITE.url}/`,
    },
  };
}

export function webPageSchema({ title, description, path = '/', pageType = 'WebPage', image = SITE.socialImage }) {
  const url = absoluteUrl(path);
  return {
    '@type': pageType,
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: SITE.language,
    isPartOf: { '@id': `${SITE.url}/#website` },
    about: { '@id': `${SITE.url}/#organization` },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: absoluteUrl(image),
    },
  };
}

export function serviceSchema({ name, description, path, areaServed = 'Tampa Bay, Florida', serviceType = name }) {
  return {
    '@type': 'Service',
    '@id': `${absoluteUrl(path)}#service`,
    name,
    serviceType,
    description,
    url: absoluteUrl(path),
    provider: {
      '@type': 'Organization',
      '@id': `${SITE.url}/#organization`,
      name: SITE.name,
      url: `${SITE.url}/`,
    },
    areaServed: typeof areaServed === 'string'
      ? { '@type': 'AdministrativeArea', name: areaServed }
      : areaServed,
  };
}

export function faqSchema(items) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

export function breadcrumbSchema(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href || '/'),
    })),
  };
}

export function articleSchema({ headline, description, path, datePublished, dateModified, image = SITE.socialImage }) {
  return {
    '@type': 'Article',
    '@id': `${absoluteUrl(path)}#article`,
    headline,
    description,
    url: absoluteUrl(path),
    mainEntityOfPage: { '@id': `${absoluteUrl(path)}#webpage` },
    image: absoluteUrl(image),
    datePublished,
    dateModified,
    author: {
      '@type': 'Organization',
      '@id': `${SITE.url}/#organization`,
      name: SITE.name,
      url: `${SITE.url}/`,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE.url}/#organization`,
      name: SITE.name,
      url: `${SITE.url}/`,
      logo: { '@type': 'ImageObject', url: absoluteUrl('/favicon.svg') },
    },
    inLanguage: SITE.language,
  };
}

export function itemListSchema({ name, path, items }) {
  return {
    '@type': 'ItemList',
    '@id': `${absoluteUrl(path)}#item-list`,
    name,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}
