import remarkGfm from "remark-gfm";
import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Experimental config
  experimental: {
    // Enable typed routes
    typedRoutes: true,
  },
  // Disable the `X-Powered-By` header
  poweredByHeader: false,
  // Configure image domains to allow loading images from any source
  images: { remotePatterns: [{ hostname: "*" }] },
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["ts", "tsx", "mdx"],
  env: {
    DOMAIN_NAME: process.env.DOMAIN_NAME ?? "",
  },
};
const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
