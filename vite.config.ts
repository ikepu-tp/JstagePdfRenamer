import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    hmr: {
      host: "localhost",
    },
    port: 3000,
  },
  build: {
    lib: {
      entry: ["src/main.tsx", "src/addElements.tsx"],
      fileName: (format, entryName) => `${entryName}.${format}.js`,
      formats: ["es", "cjs"],
    },
  },
});
