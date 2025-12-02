import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()], loadEnv,
    server: {
      proxy: {
        '/api': {
          target: env.VITE_BACKEND_HOST,
          changeOrigin: true,
        },
        '/join': {
          target: env.VITE_BACKEND_HOST,
          changeOrigin: true,
        }
      }
    }
  }
})
