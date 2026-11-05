import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/demos/pitchform/",
  publicDir: false,
  plugins: [react()],
  build: {
    outDir: "dist",
  },
});
