import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

/* Public brand site. These render for everyone, signed in or not — a
   signed-in customer browsing the menu should not be bounced to their
   dashboard. Keep in sync with src/app/(marketing). */
const MARKETING_PATHS = [
  "/",
  "/menu",
  "/stores",
  "/rewards",
  "/about",
  "/gallery",
  "/contact",
  "/order",
];

/* Auth screens: public when signed out, redirected away when signed in. */
const AUTH_PATHS = ["/login", "/register", "/forgot-password"];

function isMarketing(pathname: string) {
  return MARKETING_PATHS.some(
    (p) => pathname === p || (p !== "/" && pathname.startsWith(p + "/")),
  );
}

function homeFor(role: string) {
  return role === "admin" ? "/admin" : role === "staff" ? "/staff" : "/dashboard";
}

export async function proxy(req: NextRequest) {
  const session = await auth();
  const { pathname } = req.nextUrl;

  const isAuthPath = AUTH_PATHS.some((p) => pathname.startsWith(p));

  if (!session) {
    // The brand site and auth screens are open; everything else needs a login.
    if (isMarketing(pathname) || isAuthPath) return NextResponse.next();
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Signed in: the marketing site stays browsable (the nav swaps its CTA
  // for "My Rewards" instead of redirecting).
  if (isMarketing(pathname)) return NextResponse.next();

  if (pathname === "/login" || pathname === "/register") {
    return NextResponse.redirect(new URL(homeFor(session.user.role), req.url));
  }

  if (pathname.startsWith("/admin") && session.user.role !== "admin") {
    const fallback = session.user.role === "staff" ? "/staff" : "/dashboard";
    return NextResponse.redirect(new URL(fallback, req.url));
  }

  if (pathname.startsWith("/staff") && session.user.role !== "staff") {
    const fallback = session.user.role === "admin" ? "/admin" : "/dashboard";
    return NextResponse.redirect(new URL(fallback, req.url));
  }

  // Staff with pending/rejected shop can only see the status page
  if (
    pathname.startsWith("/staff") &&
    session.user.role === "staff" &&
    session.user.shopStatus &&
    session.user.shopStatus !== "active" &&
    pathname !== "/staff/pending"
  ) {
    return NextResponse.redirect(new URL("/staff/pending", req.url));
  }

  if (pathname.startsWith("/dashboard") && session.user.role !== "customer") {
    const fallback = session.user.role === "admin" ? "/admin" : "/staff";
    return NextResponse.redirect(new URL(fallback, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.webp|.*\\.avif|.*\\.ico|manifest\\.json).*)",
  ],
};
