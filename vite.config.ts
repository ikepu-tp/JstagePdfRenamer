import { crx } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import manifest from "./manifest.json";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
  server: {
    host: true,
    hmr: {
      host: "localhost",
    },
    port: 3000,
  },
  build: {
    rollupOptions: {
      input: {
        popup: "src/html/popup.html",
        options: "src/html/options.html", // ←これ重要！
      },
    },
  },
});
