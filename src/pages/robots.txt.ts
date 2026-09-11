import type { APIRoute } from 'astro';

/**
 * robots.txt — there wasn't one, which left every crawler to guess and left
 * the sitemap undiscoverable.
 *
 * Everything is allowed, including the AI crawlers, which is a deliberate
 * choice rather than an oversight: this is a marketing page for a ticketed
 * event whose whole job is to be found and quoted. Blocking the assistants
 * people now ask "what's a good workshop for restaurant owners" would work
 * against the page. Listing them explicitly means the decision is visible and
 * easy to reverse if the client ever wants the opposite.
 */
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('/sitemap.xml', site).href;

  const body = `# https://www.robotstxt.org/

User-agent: *
Allow: /

# Answer engines — explicitly welcome. See src/pages/robots.txt.ts.
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

Sitemap: ${sitemap}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
