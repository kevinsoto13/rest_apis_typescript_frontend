import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// import { visualizer } from 'rollup-plugin-visualizer' // opcional: descomentar para generar reporte

export default defineConfig({
  // Evitar múltiples copias de React y forzar una sola resolución
  resolve: {
    dedupe: ['react', 'react-dom']
  },
  plugins: [
    react(),
    tailwindcss(),
    // visualizer({ filename: 'dist/stats.html' }) // opcional
  ],
  optimizeDeps: {
    include: ['react', 'react-dom']
  },
  build: {
    // generar sourcemaps para poder depurar trazas en producción
    sourcemap: true,
    chunkSizeWarningLimit: 1000, // aumenta si no quieres ver la advertencia
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'react-vendor'
            }
            return 'vendor'
          }
        }
      }
    }
  }
})
