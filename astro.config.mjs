// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// Honour PORT so tooling that assigns a free port is respected.
const port = Number(process.env.PORT) || 4321;

export default defineConfig({
  /**
   * The origin this page is published on. Everything absolute — the canonical
   * link, og:image, the sitemap, the JSON-LD `@id`s — is derived from this, so
   * a move to another host is this one line.
   *
   * It is deliberately NOT chefdeb.com: that is the client's WordPress site,
   * and this build is a separate static page on its own subdomain.
   */
  site: 'https://sharpen.chefdeb.com',

  integrations: [react()],

  server: { port, host: false },

  vite: {
    plugins: [tailwindcss()],
  },
});
