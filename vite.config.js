import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'yoga-layout': 'yoga-layout-prebuilt'
    }
  },
  define: {
    'require': undefined
  },
  optimizeDeps: {
    exclude: ['yoga-layout'] // avoid pre-bundle error
  }
})
