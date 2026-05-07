// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import AstroPWA from '@vite-pwa/astro';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    AstroPWA({
      mode: 'development',
      base: '/',
      scope: '/',
      includeAssets: ['favicon.svg', 'favicon.ico', 'icon-192.png', 'icon-512.png', 'icon-192-maskable.png', 'icon-512-maskable.png', 'apple-touch-icon.png'],
      registerType: 'autoUpdate',
      manifest: {
        name: 'FIFA World Cup 2026',
        short_name: 'Mundial 2026',
        description: 'Calendario y resultados del Mundial FIFA 2026',
        theme_color: '#053332',
        background_color: '#053332',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml'
          },
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icon-192-maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{css,js,html,ico,txt}', '*.{png,svg}'],
        globIgnores: [
          'logo-fifa.webp',
          'logo-splash.svg',
          'stadiums/**',
        ],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // 3 MB
      },
      devOptions: {
        enabled: true
      }
    })
  ]
});