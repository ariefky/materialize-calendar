/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/materialize-calendar",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
