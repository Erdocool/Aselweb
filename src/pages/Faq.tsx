import { useI18n } from "@/context/Locale";
import { useTitle } from "@/lib/useTitle";

export function Faq() {
  const { t } = useI18n();
  useTitle(`${t.faq.title} · Asel`);

  return (
    <div className="wrap py-14">
      <p className="kicker">{t.faq.kicker}</p>
      <h1 className="font-display mt-3 text-6xl leading-none">{t.faq.title}</h1>
      <div className="mt-8 grid gap-3">
        {t.faq.items.map((item) => (
          <details key={item.q} className="panel p-5">
            <summary className="cursor-pointer font-medium">{item.q}</summary>
            <p className="mt-3 text-[var(--muted)]">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
