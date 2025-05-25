import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    port: process.env.PORT,
  },
  plugins: [react(), viteTsconfigPaths(), tailwindcss()],
  optimizeDeps: { exclude: ["fsevents"] },
});
