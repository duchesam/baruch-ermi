const noIndexHeaders = [
  { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive, nosnippet' },
  { key: 'Cache-Control', value: 'private, no-store' },
];

const privateRoutes = [
  '/portal/:path*',
  '/lead-desk/:path*',
  '/lead-automation/:path*',
  '/creative-financing/:path*',
  '/operations/:path*',
  '/operations-demo/:path*',
  '/sign-in/:path*',
];

export default {
  reactStrictMode: true,
  outputFileTracingIncludes: { '/lead-desk': ['./vendor/lead/index.html'] },
  serverExternalPackages: ['better-sqlite3', 'pg'],
  async redirects() {
    return [
      { source: '/get-offer', destination: '/sell-your-property', permanent: true },
      { source: '/agent-partner', destination: '/agent-partners', permanent: true },
      { source: '/services', destination: '/options', permanent: true },
      { source: '/team-portal', destination: '/portal', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      ...privateRoutes.map(source => ({ source, headers: noIndexHeaders })),
      { source: '/api/:path*', headers: noIndexHeaders },
      {
        source: '/(robots.txt|sitemap.xml|llms.txt)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=86400' }],
      },
    ];
  },
};
