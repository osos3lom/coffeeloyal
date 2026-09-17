import { branches } from "@/lib/content/branches";

export function generateStaticParams() {
  // Return static param IDs for demo shops so static export pre-renders them
  const ids = Array.from(new Set([1, 2, 3, 4, 5, ...branches.map((_, i) => i + 1)]));
  return ids.map((id) => ({ id: String(id) }));
}

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
