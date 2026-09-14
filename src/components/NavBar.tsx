"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import type { Lang } from "@/lib/i18n/translations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe, Menu, Settings, Store, LogOut } from "lucide-react";

export default function NavBar() {
  const { data: session } = useSession();
  const { t, lang, setLang } = useTranslation();
  const role = session?.user?.role;

  const homeLink =
    role === "admin" ? "/admin" : role === "staff" ? "/staff" : "/dashboard";

  const displayName =
    role === "staff" && session?.user?.shopName
      ? session.user.shopName
      : session?.user?.name;

  return (
    <header className="sticky top-0 z-40 border-b border-[#E5E3D8] bg-[#FFFFFF]/90 backdrop-blur-md px-5 py-2.5 shadow-[0_1px_4px_0_rgba(24,21,18,0.03)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <Link href={homeLink} className="flex items-center gap-3 transition-opacity hover:opacity-90">
          <Image
            src="/logo.png"
            alt="Princes' Coffee"
            width={140}
            height={36}
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>

        <div className="flex items-center gap-2">
          {/* Language Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1.5 px-2.5 text-xs font-semibold text-[#302B25] border-[#DDD9CC] bg-[#F8F7F3]"
              >
                <Globe className="h-3.5 w-3.5 text-[#53634B]" />
                <span>{lang.toUpperCase()}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
              {(["en", "ar"] as Lang[]).map((l) => (
                <DropdownMenuItem
                  key={l}
                  onClick={() => setLang(l)}
                  className={`flex items-center justify-between text-xs ${
                    lang === l
                      ? "font-semibold text-[#2C3627] bg-[#F3F3ED]"
                      : "text-[#675E54]"
                  }`}
                >
                  <span>{l === "ar" ? "🇸🇦 العربية" : "🇬🇧 English"}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User / Nav Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 border-[#DDD9CC] bg-[#F8F7F3] text-[#302B25]"
                aria-label="Menu"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-semibold text-[#181512] leading-none truncate">
                    {displayName}
                  </p>
                  <p className="text-xs text-[#8A8175] truncate">
                    {session?.user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex items-center gap-2 text-xs">
                  <Settings className="h-3.5 w-3.5 text-[#8A8175]" />
                  <span>{t.nav.accountSettings}</span>
                </Link>
              </DropdownMenuItem>
              {role === "staff" && (
                <DropdownMenuItem asChild>
                  <Link href="/staff/settings" className="flex items-center gap-2 text-xs">
                    <Store className="h-3.5 w-3.5 text-[#8A8175]" />
                    <span>{t.nav.shopSettings}</span>
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="flex items-center gap-2 text-xs text-rose-700 focus:bg-rose-50 focus:text-rose-800"
              >
                <LogOut className="h-3.5 w-3.5 text-rose-600" />
                <span>{t.nav.signOut}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
