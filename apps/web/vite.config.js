import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ mode }) => {
  // Expose env vars so the proxy target can be overridden in .env.local
  const env = loadEnv(mode, process.cwd(), "");
  const backendOrigin = env.VITE_API_URL || "http://localhost:3000";

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 3000,
      host: "0.0.0.0",
      allowedHosts: true,
      proxy: {
        "/api": {
          target: backendOrigin,
          changeOrigin: true,
        },
        "/uploads": {
          target: backendOrigin,
          changeOrigin: true,
        },
      },
    },
    build: {
      target: "es2018", // modern browsers — smaller output than es5
      cssCodeSplit: true, // each route chunk gets only the CSS it needs
      reportCompressedSize: false, // skip gzip stat pass → faster builds
      assetsInlineLimit: 4096, // inline assets < 4 kB as base64
      chunkSizeWarningLimit: 500,
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Core React runtime — always cached
            if (
              id.includes("node_modules/react/") ||
              id.includes("node_modules/react-dom/")
            ) {
              return "react-vendor";
            }
            // Router
            if (id.includes("node_modules/react-router")) return "router";
            // All admin pages → one lazy chunk, never fetched by public visitors
            if (
              id.includes("/features/admin/") ||
              id.includes("/features/auth/") ||
              id.includes("/features/catalog/") ||
              id.includes("/features/content-management/") ||
              id.includes("/features/inquiries/") ||
              id.includes("/features/media/") ||
              id.includes("/features/products/admin/") ||
              id.includes("/features/products/categories/") ||
              id.includes("/pages/admin/") ||
              id.includes("/components/admin/")
            )
              return "admin";
          },
        },
      },
    },
  };
});
