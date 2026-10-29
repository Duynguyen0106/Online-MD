import type { NextConfig } from "next";
import { PRACTICE_ALIASES } from "./lib/routes/practice";

const nextConfig: NextConfig = {
  async redirects() {
    return PRACTICE_ALIASES.map(({ source, destination }) => ({
      source,
      destination,
      permanent: false,
    }));
  },
};

export default nextConfig;
