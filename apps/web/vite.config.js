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
        "@features": path.resolve(__dirname, "./src/features"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@shared": path.resolve(__dirname, "./src/shared"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@app": path.resolve(__dirname, "./src/app"),
        "@vishal/contracts": path.resolve(__dirname, "../../packages/contracts/src/index.mjs"),
        "@contracts": path.resolve(__dirname, "../../packages/contracts/src/index.mjs"),
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
      target: "es2022", // modern browsers — substantially smaller, faster native execution
      cssCodeSplit: true, // each route chunk gets only the CSS it needs
      reportCompressedSize: false, // skip gzip stat pass → faster builds
      assetsInlineLimit: 4096, // inline assets < 4 kB as base64
      chunkSizeWarningLimit: 600,
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
            
            // Animation library
            if (id.includes("node_modules/framer-motion") || id.includes("node_modules/motion")) {
              return "motion-vendor";
            }

            // Icons library
            if (id.includes("node_modules/@iconify")) {
              return "icons-vendor";
            }

            // All admin pages → one lazy chunk, never fetched by public visitors
            if (
              id.includes("/features/admin/") ||
              id.includes("/features/auth/") ||
              id.includes("/features/catalog/") ||
              id.includes("/features/categories/") ||
              id.includes("/features/content-management/") ||
              id.includes("/features/inquiries/") ||
              id.includes("/features/media/") ||
              id.includes("/features/products/admin/") ||
              id.includes("/features/products/categories/") ||
              id.includes("/pages/admin/") ||
              id.includes("/pages/LoginPage") ||
              id.includes("/components/admin/")
            ) {
              return "admin";
            }
          },
        },
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/test/setup.js",
    },
  };
});
