"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isStatic = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";
  if (isStatic) {
    return <NextAuthSessionProvider session={null}>{children}</NextAuthSessionProvider>;
  }
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
