import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    /* proxy: {
       '/recipes-api': {
         target: 'http://localhost:3001',
         changeOrigin: true,
         secure: false
       },
       '/uploads':{
        target: 'http://localhost:3001'
       },
       '/public/images':{
        target: 'http://localhost:3001'
       }
     },*/
    port: 3000,  // Set the vite dev server port to 3000
  },
  build: {
      sourcemap: true
  }
})

