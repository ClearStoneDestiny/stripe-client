import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),

        "@auth": path.resolve(__dirname, "src/modules/auth"),
        "@common": path.resolve(__dirname, "src/modules/common"),
        "@components": path.resolve(__dirname, "src/components"),
        "@api": path.resolve(__dirname, "src/api"),
        "@locales": path.resolve(__dirname, "src/locales"),
        "@config": path.resolve(__dirname, "src/config"),
        "@routes": path.resolve(__dirname, "src/routes"),
        "@providers": path.resolve(__dirname, "src/providers"),
        "@store": path.resolve(__dirname, "src/store"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@i18n": path.resolve(__dirname, "src/i18n"),
        "@theme": path.resolve(__dirname, "src/theme"),
        "@test": path.resolve(__dirname, "src/test"),
        "@assets": path.resolve(__dirname, "src/assets"),
        src: path.resolve(__dirname, "src"),
      },
    },

    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./src/test/setup.ts"],
      include: ["src/**/*.{test,spec}.{ts,tsx}"],
      exclude: ["node_modules", "dist"],
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html"],
        exclude: [
          "node_modules/",
          "src/test/",
          "**/*.d.ts",
          "**/*.config.*",
          "**/index.ts",
        ],
      },
      pool: "forks",
      css: true,
    },
  };
});
