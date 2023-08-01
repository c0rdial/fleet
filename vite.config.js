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
        target: "https://fleet-3bb4jq856-c0rdial.vercel.app/api/v1/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
})
