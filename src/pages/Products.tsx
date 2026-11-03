import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "@/data/products";
import { useI18n } from "@/context/Locale";
import { useTitle } from "@/lib/useTitle";
import { ProductCard } from "@/components/ProductCard";

type SortKey = "torque" | "weight" | "rpm";

export function Products() {
  const { t } = useI18n();
  useTitle(`${t.productsPage.title} · Asel`);
  const [params, setParams] = useSearchParams();
  const [sort, setSort] = useState<SortKey>("torque");
  const socket = params.get("soket") === "1-2" ? "1/2" : params.get("soket") === "3-4" ? "3/4" : "all";

  const list = useMemo(() => {
    const filtered = products.filter((item) => socket === "all" || item.socket === socket);
    return [...filtered].sort((a, b) => {
      if (sort === "weight") return a.weightKg - b.weightKg;
      if (sort === "rpm") return b.rpm - a.rpm;
      return b.torqueNm - a.torqueNm;
    });
  }, [socket, sort]);

  function setSocket(value: "all" | "1/2" | "3/4") {
    if (value === "all") setParams({});
    else setParams({ soket: value === "1/2" ? "1-2" : "3-4" });
  }

  const filters = [
    { id: "all" as const, label: t.productsPage.all },
    { id: "1/2" as const, label: "1/2" },
    { id: "3/4" as const, label: "3/4" },
  ];

  return (
    <div className="wrap py-14">
      <p className="kicker">{t.productsPage.kicker}</p>
      <h1 className="font-display mt-3 text-6xl leading-none">{t.productsPage.title}</h1>
      <p className="mt-4 max-w-2xl text-[var(--muted)]">{t.productsPage.lead}</p>
      <div className="mt-8 flex flex-wrap items-center gap-2">
        {filters.map((item) => (
          <button key={item.id} type="button" className={socket === item.id ? "btn btn-primary" : "btn btn-ghost"} onClick={() => setSocket(item.id)}>
            {item.label}
          </button>
        ))}
        <label className="ml-auto flex items-center gap-2 text-sm text-[var(--muted)]">
          {t.productsPage.sort}
          <select className="border border-[var(--line)] bg-[var(--bg)] px-2 py-2 text-[var(--text)]" value={sort} onChange={(event) => setSort(event.target.value as SortKey)}>
            <option value="torque">{t.productsPage.byTorque}</option>
            <option value="weight">{t.productsPage.byWeight}</option>
            <option value="rpm">{t.productsPage.byRpm}</option>
          </select>
        </label>
      </div>
      {list.length === 0 ? (
        <p className="mt-10">{t.productsPage.empty}</p>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {list.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
