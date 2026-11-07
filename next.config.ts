import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export for GitHub Pages (varuns636.github.io). Output goes to /out.
  output: "export",
  // cacheComponents / partialPrefetching removed: PPR is not supported in export mode.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
