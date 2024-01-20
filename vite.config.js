import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    cors: false,
    proxy: {
      "/api": {
        target: "https://github.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    open: "/",
    port: "3001",
  },
  plugins: [react()],
});
