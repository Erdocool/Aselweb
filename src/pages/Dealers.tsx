import { useMemo, useState } from "react";
import { dealerCities, dealers } from "@/data/dealers";
import { site } from "@/data/site";
import { useI18n } from "@/context/Locale";
import { telHref, useTitle } from "@/lib/useTitle";

export function Dealers() {
  const { t } = useI18n();
  useTitle(`${t.dealers.title} · Asel`);
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("all");
  const cities = dealerCities();

  const list = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("tr");
    return dealers
      .filter((item) => city === "all" || item.city === city)
      .filter((item) => {
        if (!needle) return true;
        return [item.city, item.district, item.name, item.address, ...item.phones].join(" ").toLocaleLowerCase("tr").includes(needle);
      })
      .sort((a, b) => a.city.localeCompare(b.city, "tr") || a.name.localeCompare(b.name, "tr"));
  }, [query, city]);

  return (
    <div className="wrap py-14">
      <p className="kicker">{t.dealers.kicker}</p>
      <h1 className="font-display mt-3 text-6xl leading-none">{t.dealers.title}</h1>
      <p className="mt-4 max-w-2xl text-[var(--muted)]">{t.dealers.lead}</p>

      <article className="panel mt-8 grid gap-2 p-5 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-xs tracking-[0.16em] text-[var(--accent)]">{t.dealers.hq}</p>
          <p className="mt-1">{site.address}</p>
          <a className="mt-1 block" href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>
        </div>
        <a className="btn btn-ghost" href={site.maps} target="_blank" rel="noreferrer">
          {t.dealers.map}
        </a>
      </article>

      <div className="mt-6 flex flex-wrap gap-3">
        <input
          className="min-w-64 flex-1 border border-[var(--line)] bg-[var(--bg)] px-3 py-3"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t.dealers.search}
          aria-label={t.dealers.search}
        />
        <select className="border border-[var(--line)] bg-[var(--bg)] px-3 py-3" value={city} onChange={(event) => setCity(event.target.value)} aria-label={t.dealers.allCities}>
          <option value="all">{t.dealers.allCities}</option>
          {cities.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>
      <p className="mt-4 text-sm text-[var(--muted)]">{list.length} {t.dealers.count}</p>
      {list.length === 0 ? (
        <p className="mt-8">{t.dealers.empty}</p>
      ) : (
        <ul className="mt-4 grid gap-3">
          {list.map((item) => (
            <li key={`${item.city}-${item.name}`} className="panel grid gap-2 p-4 md:grid-cols-[9rem_1fr_auto] md:items-center">
              <p className="text-sm text-[var(--accent)]">{item.city}{item.district ? ` / ${item.district}` : ""}</p>
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-[var(--muted)]">{item.address}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {item.phones.map((phone) => (
                  <a key={phone} className="btn btn-ghost h-9 min-h-0 px-3" href={telHref(phone)}>
                    {phone}
                  </a>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
