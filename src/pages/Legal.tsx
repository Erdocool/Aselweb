import { useI18n } from "@/context/Locale";
import { useTitle } from "@/lib/useTitle";

export function Legal({ kind }: { kind: "kvkk" | "cookies" }) {
  const { t, locale } = useI18n();
  const title = kind === "kvkk" ? t.legal.kvkkTitle : t.legal.cookieTitle;
  const paragraphs = kind === "kvkk" ? t.legal.kvkk : t.legal.cookies;
  useTitle(`${title} · Asel`);

  return (
    <div className="wrap py-14">
      <h1 className="font-display text-6xl leading-none">{title}</h1>
      {locale === "en" && <p className="mt-4 text-sm text-[var(--accent)]">{t.legal.binding}</p>}
      <div className="mt-8 grid max-w-3xl gap-4">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
