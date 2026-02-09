import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const plugins = [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean);

  // Only load the visualizer when explicitly enabled via ANALYZE env var.
  if (process.env.ANALYZE === "true") {
    try {
      const { visualizer } = await import("rollup-plugin-visualizer");
      plugins.push(visualizer({ filename: "dist/stats.html", open: false, gzipSize: true, brotliSize: true }));
    } catch (err) {
      // Safe fallback: do nothing if plugin isn't installed in CI
      // This prevents build failures on environments without the package
      // eslint-disable-next-line no-console
      console.warn("rollup-plugin-visualizer not installed; skipping bundle analysis");
    }
  }

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
