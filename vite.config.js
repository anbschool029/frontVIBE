import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

const isPortable = process.env.PORTABLE === 'true';

// https://vite.dev/config/
export default defineConfig({
  base: './', // Enforce relative paths for all assets to support Live Server and deep hosting
  plugins: [
    tailwindcss(),
    react(),
    // If portable mode is enabled, bundle EVERYTHING into a single index.html 
    ...(isPortable ? [viteSingleFile()] : []),
  ],
  build: {
    chunkSizeWarningLimit: 2500,
    rollupOptions: {
      output: isPortable ? undefined : {
        // Chunk splitting is active for standard web-server deployments
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
});
