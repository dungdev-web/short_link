import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   transpilePackages: ["react-simple-maps"], // 👈 Thêm dòng này
};

export default nextConfig;
