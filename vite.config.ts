import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({ filename: 'dist/stats.html', gzipSize: true }) // genera dist/stats.html
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          // extrae el nombre del paquete (soporta scoped packages)
          const parts = id.split('node_modules/')[1].split('/')
          const pkg = parts[0].startsWith('@') ? `${parts[0]}/${parts[1]}` : parts[0]

          // reglas explícitas para separar paquetes grandes
          if (pkg === 'react' || pkg === 'react-dom') return 'react-vendor'
          if (pkg === 'react-router-dom') return 'router-vendor'
          if (pkg === 'react-query' || pkg.startsWith('@tanstack')) return 'tanstack-vendor'
          if (pkg === 'axios') return 'axios-vendor'

          // fallback: agrupa el resto en "vendor" para evitar muchos chunks pequeños
          return 'vendor'
        }
      }
    }
  }
})
