import { useEffect } from "react";

export function useTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

export function formatDate(iso: string, locale: "tr" | "en") {
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export function telHref(phone: string) {
  return `tel:${phone.replace(/\D/g, "")}`;
}
