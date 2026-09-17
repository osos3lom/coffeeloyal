"use client";

import { useEffect, useState } from "react";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { getDemoSession } from "@/lib/demo/demo-session";
import { initMockApi } from "@/lib/demo/mock-api";

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isStatic = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";
  const [demoSession, setDemoSession] = useState<Session | null>(() => {
    if (isStatic && typeof window !== "undefined") {
      initMockApi();
      return getDemoSession();
    }
    return null;
  });

  useEffect(() => {
    if (isStatic) {
      initMockApi();

      const handleRoleChange = () => {
        setDemoSession(getDemoSession());
      };

      window.addEventListener("coffeeloyal:role-change", handleRoleChange);
      return () => {
        window.removeEventListener("coffeeloyal:role-change", handleRoleChange);
      };
    }
  }, [isStatic]);

  if (isStatic) {
    return (
      <NextAuthSessionProvider session={demoSession}>
        {children}
      </NextAuthSessionProvider>
    );
  }

  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
