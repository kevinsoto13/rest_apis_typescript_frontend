import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// import { visualizer } from 'rollup-plugin-visualizer' // opcional

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // visualizer({ filename: 'dist/stats.html' }) // opcional
  ],
  build: {
    chunkSizeWarningLimit: 1000, // aumenta si no quieres ver la advertencia
    sourcemap: true
    // ❌ Se elimina manualChunks para que Vite maneje React automáticamente
  }
})
