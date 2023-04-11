import { fileURLToPath, URL } from 'node:url'
import { resolve } from "path";

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  define: {
    "process.env": process.env,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      assets: resolve("src/assets"),
    }
  },
  server: {
    port: 8001,
    open: true,
    proxy: {
      "/api": {
        target: "https://demo-fleetapi.up.railway.app",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
})