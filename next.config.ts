import type { NextConfig } from "next";

import path from "path";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.resolve(__dirname), path.resolve(__dirname, "styles")],
  },

  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname);
    return config;
  },
  turbopack: {
    resolveAlias: {
      "@": path.resolve(__dirname),
    },
  },
};





export default nextConfig;
