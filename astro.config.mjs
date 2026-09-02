// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// Honour PORT so tooling that assigns a free port is respected.
const port = Number(process.env.PORT) || 4321;

export default defineConfig({
  site: 'https://chefdeb.com',

  integrations: [react()],

  server: { port, host: false },

  vite: {
    plugins: [tailwindcss()],
  },
});
