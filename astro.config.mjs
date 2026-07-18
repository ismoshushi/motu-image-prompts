import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.SITE_URL || 'https://motu-image-prompts.pages.dev',
  output: 'static',
  integrations: [sitemap()],
});
