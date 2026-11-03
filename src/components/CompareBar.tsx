import { products } from "@/data/products";
import { useCompare } from "@/context/Compare";
import { useI18n } from "@/context/Locale";
import { LocaleLink } from "./LocaleLink";

export function CompareBar() {
  const { ids, notice, clear, toggle } = useCompare();
  const { t } = useI18n();
  if (ids.length === 0 && !notice) return null;
  const chosen = ids.map((id) => products.find((item) => item.slug === id)).filter((item) => item !== undefined);

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--line)] bg-[var(--bg-elev)]">
      <div className="wrap flex flex-wrap items-center gap-3 py-3">
        {chosen.map((item) => (
          <button key={item.slug} type="button" className="btn btn-ghost" onClick={() => toggle(item.slug)}>
            {item.code} ×
          </button>
        ))}
        {notice && <p className="text-sm text-[var(--accent)]">{t.compare.full}</p>}
        <div className="ml-auto flex gap-2">
          <button type="button" className="btn btn-ghost" onClick={clear}>
            {t.compare.clear}
          </button>
          {chosen.length >= 2 && (
            <LocaleLink to="/karsilastir" className="btn btn-primary">
              {t.compare.open}
            </LocaleLink>
          )}
        </div>
      </div>
    </div>
  );
}
