import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    port: process.env.PORT,
  },
  plugins: [react(), viteTsconfigPaths()],
  optimizeDeps: { exclude: ["fsevents"] },
});
