import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression2'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Pre-compress assets for production — servers like Nginx/Vercel serve these directly
    compression({
      algorithms: ['gzip', 'brotliCompress'],
      threshold: 1024,
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    // Enable CSS code-splitting per async chunk
    cssCodeSplit: true,
    // Inline assets smaller than 4KB to reduce HTTP requests
    assetsInlineLimit: 4096,
    // Vendor chunking — separate heavy libs for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-animation': ['framer-motion'],
          'vendor-icons': ['lucide-react', '@heroicons/react'],
          'vendor-pdf': ['jspdf', 'html2canvas'],
          'vendor-3d': ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
    // Target modern browsers for smaller output
    target: 'es2020',
    // No source maps in production
    sourcemap: false,
  },
})
