import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ command }) => ({
  plugins: [
    tanstackStart({
      deployment: "vercel",
    }),
    react(),
    tailwindcss(),
    tsConfigPaths(),
  ],
  server: {
    host: "::",
    port: 8080,
    strictPort: false,
  },
  build: {
    target: "es2020",
  },
}));
