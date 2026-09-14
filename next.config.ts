import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === "true";

const repoName = process.env.GITHUB_REPOSITORY
  ? `/${process.env.GITHUB_REPOSITORY.split("/")[1]}`
  : "";

const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH !== undefined
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : repoName;

const nextConfig: NextConfig = {
  serverExternalPackages: ["pg"],
  ...(isStaticExport
    ? {
        output: "export",
        images: {
          loader: "custom",
          loaderFile: "./src/lib/image-loader.ts",
        },
        trailingSlash: true,
        basePath: basePath === "/" ? "" : basePath,
      }
    : {}),
};

export default nextConfig;
