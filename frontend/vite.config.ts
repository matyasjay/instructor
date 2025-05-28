import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    port: process.env.FRONTEND_PORT ?? 3000,
    strictPort: true,
  },
  plugins: [react(), viteTsconfigPaths(), tailwindcss()],
  optimizeDeps: { exclude: ["fsevents"] },
});
