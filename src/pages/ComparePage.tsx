import { formatSpec, products } from "@/data/products";
import { specKeys } from "@/data/site";
import { useCompare } from "@/context/Compare";
import { useI18n } from "@/context/Locale";
import { useTitle } from "@/lib/useTitle";
import { asset } from "@/lib/asset";
import { LocaleLink } from "@/components/LocaleLink";

export function ComparePage() {
  const { t, locale } = useI18n();
  const { ids, clear } = useCompare();
  useTitle(`${t.compare.title} · Asel`);
  const chosen = ids.map((id) => products.find((item) => item.slug === id)).filter((item) => item !== undefined);

  return (
    <div className="wrap py-14">
      <p className="kicker">{t.compare.kicker}</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-display text-6xl leading-none">{t.compare.title}</h1>
        {chosen.length > 0 && (
          <button type="button" className="btn btn-ghost" onClick={clear}>
            {t.compare.clear}
          </button>
        )}
      </div>
      <p className="mt-4 max-w-2xl text-[var(--muted)]">{t.compare.lead}</p>
      {chosen.length === 0 ? (
        <div className="mt-10">
          <p>{t.compare.empty}</p>
          <LocaleLink to="/urunler" className="btn btn-primary mt-4">
            {t.compare.pick}
          </LocaleLink>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr>
                <th className="p-3 text-left font-normal text-[var(--muted)]" />
                {chosen.map((item) => (
                  <th key={item.slug} className="p-3 text-left">
                    <img src={asset(item.cover)} alt="" className="mb-2 h-28 bg-white object-contain" />
                    <LocaleLink to={`/urun/${item.slug}`} className="font-display text-2xl">
                      {item.code}
                    </LocaleLink>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specKeys.map((key) => {
                const values = chosen.map((item) => item.specs[key]);
                const differs = new Set(values).size > 1;
                return (
                  <tr key={key} className={differs ? "bg-[var(--bg-soft)]" : ""}>
                    <th className="border-t border-[var(--line)] p-3 text-left font-normal text-[var(--muted)]">
                      {t.specs[key]}
                      {differs && <span className="mt-1 block text-[0.65rem] text-[var(--accent)]">{t.compare.differs}</span>}
                    </th>
                    {values.map((value, index) => (
                      <td key={chosen[index].slug} className="border-t border-[var(--line)] p-3">
                        {formatSpec(value, locale)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
