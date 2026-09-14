export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  if (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("data:") ||
    src.startsWith("blob:")
  ) {
    return src;
  }

  const cleanBase = basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;
  const cleanSrc = src.startsWith("/") ? src : `/${src}`;

  if (cleanBase && cleanSrc.startsWith(cleanBase)) {
    return cleanSrc;
  }

  return `${cleanBase}${cleanSrc}`;
}
