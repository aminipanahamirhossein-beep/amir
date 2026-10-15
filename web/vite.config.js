import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// In the Base44 preview the frontend and API share one origin: the dev server
// proxies /api to the API service, so the browser never makes a cross-origin
// request and session/cookie behaviour stays predictable.
const apiTarget = process.env.VITE_API_PROXY_TARGET || 'http://127.0.0.1:8000';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    // The preview proxy reaches the dev server through a platform hostname.
    // __VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS is set by the platform and is
    // merged into allowedHosts by Vite (6.1+), so no host list lives here.
    proxy: {
      '/api': { target: apiTarget, changeOrigin: true },
    },
  },
});
