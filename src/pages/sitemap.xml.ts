import type { APIRoute } from 'astro';

/**
 * sitemap.xml — hand-rolled rather than pulled in via @astrojs/sitemap.
 *
 * This is a one-page site. The integration would add a dependency and a build
 * step to emit the five lines below, and it would still need the same `site`
 * config to do it. If the build ever grows past a handful of routes, swap this
 * file for the integration — it earns its place at that point, not before.
 *
 * `lastmod` is the build date, which is honest for a static page: the page a
 * crawler is fetching is exactly the one this build produced.
 */
export const GET: APIRoute = ({ site }) => {
  const home = new URL('/', site).href;
  const lastmod = new Date().toISOString().slice(0, 10);

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${home}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
