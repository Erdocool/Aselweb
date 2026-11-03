import type { Locale } from "@/data/site";

export function withLocale(locale: Locale, path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") return normalized === "/" ? "/en" : `/en${normalized}`;
  return normalized;
}

export function stripLocale(pathname: string) {
  if (pathname === "/en" || pathname === "/en/") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3) || "/";
  return pathname || "/";
}

export function isActive(pathname: string, to: string) {
  const path = stripLocale(pathname);
  if (to === "/") return path === "/";
  if (to === "/urunler") return path === "/urunler" || path.startsWith("/urun/");
  return path === to || path.startsWith(`${to}/`);
}
