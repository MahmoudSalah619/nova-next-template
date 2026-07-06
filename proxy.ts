import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookieName, fallbackLng, languages } from "@/app/i18n/settings";

/**
 * Proxy for handling authentication and redirects.
 *
 * Currently disabled (pass-through) to prevent dev server freezing.
 * Uncomment the auth logic below once you have a real auth system in place.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect the root path to the user's last-used language (from cookie),
  // falling back to the default language.
  if (pathname === "/") {
    const cookieLng = request.cookies.get(cookieName)?.value;
    const lng = languages.includes(cookieLng ?? "") ? cookieLng : fallbackLng;
    return NextResponse.redirect(new URL(`/${lng}`, request.url));
  }

  // --- AUTH GUARD (disabled) ---
  // To re-enable, uncomment the block below and adjust publicPaths as needed.
  //
  // const { pathname } = request.nextUrl;
  // const publicPaths = ['/login', '/register', '/api/auth'];
  // const isPublicPath = publicPaths.some((p) => pathname.startsWith(p));
  //
  // if (!isPublicPath) {
  //   const token = request.cookies.get('auth_token')?.value;
  //   if (!token) {
  //     const loginUrl = new URL('/login', request.url);
  //     loginUrl.searchParams.set('callbackUrl', pathname);
  //     return NextResponse.redirect(loginUrl);
  //   }
  // }

  return NextResponse.next();
}

// Only run on page navigations, skip all static/internal assets
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
