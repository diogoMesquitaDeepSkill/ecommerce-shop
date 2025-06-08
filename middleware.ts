import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { fallbackLng, languages } from "./app/i18n/settings";

// Get the preferred language from browser settings
function getPreferredLocale(request: NextRequest): string {
  // Get browser language preferences
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return fallbackLng;

  // Parse the Accept-Language header
  const browserLocales = acceptLanguage
    .split(",")
    .map((lang) => {
      const [locale, weight] = lang.trim().split(";q=");
      return {
        locale: locale.split("-")[0], // Get primary language tag
        weight: weight ? Number(weight) : 1.0,
      };
    })
    .sort((a, b) => b.weight - a.weight)
    .map((item) => item.locale);

  // Find the first supported language from browser preferences
  const preferredLocale = browserLocales.find((locale) =>
    languages.includes(locale)
  );

  return preferredLocale || fallbackLng;
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;

  // Check if the pathname starts with a locale
  const pathnameHasLocale = languages.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Determine the locale in order of priority:
  // 1. Cookie
  // 2. Browser preference
  // 3. Default language
  const cookieLocale = request.cookies.get("i18next")?.value;
  const locale = cookieLocale || getPreferredLocale(request);

  // Redirect to the appropriate locale path
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
