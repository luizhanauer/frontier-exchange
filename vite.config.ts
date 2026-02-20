import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  base: "/frontier-exchange/",
  plugins: [tailwindcss(), vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Câmbio Fronteira',
        short_name: 'FrontierPay',
        description: 'Conversor de moedas offline para Argentina e Paraguai',
        theme_color: '#0c0a09', // stone-950
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ],
});
