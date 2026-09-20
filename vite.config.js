import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import { visualizer } from "rollup-plugin-visualizer";
import { compression } from "vite-plugin-compression2";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    // Gera versões .gz e .br dos assets no build, prontas pra servir
    // direto se o host suportar (Vercel/Netlify já comprimem na hora;
    // isso ajuda em hosts estáticos simples, tipo GitHub Pages com CDN
    // na frente, ou serve como registro objetivo do quanto cada
    // arquivo economiza fora do gzip "de fábrica" do relatório do Vite).
    compression({ algorithm: "gzip", exclude: [/\.(png|jpe?g|svg|webp)$/] }),
    compression({ algorithm: "brotliCompress", exclude: [/\.(png|jpe?g|svg|webp)$/] }),

    // PWA: cacheia o app shell (JS/CSS/HTML) e as imagens de capa via
    // Service Worker, então a segunda visita carrega quase instantânea
    // e o catálogo continua navegável offline.
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: false,
      includeAssets: ["favicon.svg"],
      manifest: {
        name: "Nexus Verse — Portal de Jogos Indie",
        short_name: "Nexus Verse",
        description:
          "Portal para descobrir, buscar e cadastrar jogos indie de estúdios independentes.",
        theme_color: "#05050c",
        background_color: "#05050c",
        display: "standalone",
        start_url: "/",
        icons: [
          { src: "/favicon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
          { src: "/favicon.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" },
        ],
      },
      workbox: {
        // App shell: cache-first depois do primeiro load.
        globPatterns: ["**/*.{js,css,html,svg}"],
        runtimeCaching: [
          {
            // Capas dos jogos (CDN externo): cache-first com expiração,
            // então revisitar o catálogo não rebaixa as mesmas imagens.
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "capas-de-jogos",
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Fontes do Google: cache-first de longa duração.
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "fontes-google",
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),

    // Gera dist/stats.html com o treemap do bundle (rode `npm run analyze`).
    visualizer({
      filename: "dist/stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ],

  build: {
    // Separa as bibliotecas de terceiros (React, ReactDOM, React Router)
    // do código do projeto num chunk "vendor" à parte — elas mudam com
    // muito menos frequência que o código da aplicação, então o
    // navegador reaproveita esse cache entre deploys em que só o
    // código do projeto mudou.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) return "vendor";
        },
      },
    },
  },
});
