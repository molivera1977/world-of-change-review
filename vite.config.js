import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/world-of-change-review/',  // 👈 ensures assets load correctly on GitHub Pages
})
