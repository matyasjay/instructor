import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    host: true,
    port: process.env.FRONTEND_PORT ?? 3000,
    strictPort: true,
    watch: {
      usePolling: true,
    },
  },
  plugins: [react(), viteTsconfigPaths(), tailwindcss()],
  optimizeDeps: { exclude: ["fsevents"] },
});
