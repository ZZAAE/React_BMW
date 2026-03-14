import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    react(),
    svgr()
  ],

  server: {
    proxy: {
      "/aladin": {
        target: "https://www.aladin.co.kr",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/aladin/, "")
      }
    }
  }

})