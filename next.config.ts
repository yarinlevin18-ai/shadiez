import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three"],
  images: {
    // Several images request quality 88; Next 16 requires non-default qualities to be
    // declared explicitly or it warns on every render.
    qualities: [75, 88],
  },
};

export default nextConfig;
