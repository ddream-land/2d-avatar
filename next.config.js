const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rewuai-foreign.oss-us-west-1.aliyuncs.com",
        port: "",
        pathname: "/nuwa/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "us-west-ddream-pic.s3.us-west-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.mfiles.co.uk",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);
