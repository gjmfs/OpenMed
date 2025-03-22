import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "localhost", // Allow localhost
      "127.0.0.1", // Allow 127.0.0.1
      "e7e7-43-252-15-140.ngrok-free.app", // Allow your ngrok host
    ],
  },
});
