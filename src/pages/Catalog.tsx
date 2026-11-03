import { useRef, useState } from "react";
import { formatSpec, products } from "@/data/products";
import { site } from "@/data/site";
import { useCompare } from "@/context/Compare";
import { useI18n } from "@/context/Locale";
import { useTitle } from "@/lib/useTitle";
import { asset } from "@/lib/asset";
import { LocaleLink } from "@/components/LocaleLink";

export function Catalog() {
  const { t, locale } = useI18n();
  const { ids } = useCompare();
  useTitle(`${t.catalog.title} · Asel`);
  const scroller = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const total = products.length + 2;

  function go(next: number) {
    const root = scroller.current;
    if (!root) return;
    const target = Math.min(total - 1, Math.max(0, next));
    root.scrollTo({ top: target * root.clientHeight, behavior: "smooth" });
    setPage(target);
  }

  return (
    <div className="fixed inset-x-0 top-[4.5rem]" style={{ bottom: ids.length ? "9rem" : 0 }}>
      <div
        ref={scroller}
        className="catalog-scroller h-full"
        onScroll={(event) => {
          const root = event.currentTarget;
          setPage(Math.round(root.scrollTop / root.clientHeight));
        }}
      >
        <section className="catalog-spread grid content-center bg-[var(--bg)]">
          <div className="wrap">
            <p className="kicker">{t.catalog.kicker}</p>
            <h1 className="font-display mt-4 max-w-3xl text-6xl leading-none md:text-8xl">{t.catalog.title}</h1>
            <p className="mt-5 max-w-xl text-lg text-[var(--muted)]">{t.catalog.lead}</p>
            <p className="mt-6 text-sm tracking-[0.16em] text-[var(--accent)]">{t.catalog.coverLine}</p>
          </div>
        </section>
        {products.map((product) => (
          <section key={product.slug} className="catalog-spread grid items-center">
            <div className="wrap grid items-center gap-8 lg:grid-cols-2">
              <div>
                <p className="kicker">{formatSpec(product.specs.socket, locale)}</p>
                <h2 className="font-display mt-3 text-6xl leading-none md:text-7xl">{product.code}</h2>
                <p className="mt-4 max-w-md text-[var(--muted)]">{product.summary[locale]}</p>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <strong className="font-display text-3xl">{product.torqueNm}<span className="block text-sm font-normal text-[var(--muted)]">Nm</span></strong>
                  <strong className="font-display text-3xl">{product.rpm}<span className="block text-sm font-normal text-[var(--muted)]">r.p.m</span></strong>
                  <strong className="font-display text-3xl">{product.weightKg}<span className="block text-sm font-normal text-[var(--muted)]">kg</span></strong>
                </div>
                <LocaleLink to={`/urun/${product.slug}`} className="btn btn-primary mt-6">
                  {product.code}
                </LocaleLink>
              </div>
              <img src={asset(product.cover)} alt={product.code} className="max-h-[70vh] w-full bg-white object-contain" />
            </div>
          </section>
        ))}
        <section className="catalog-spread grid content-center bg-[var(--accent)] text-white">
          <div className="wrap">
            <h2 className="font-display max-w-3xl text-6xl leading-none">{t.catalog.endTitle}</h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="btn border border-white" href={site.catalogPdf}>
                {t.catalog.pdf}
              </a>
              <LocaleLink to="/satis-noktalari" className="btn bg-white text-black">
                {t.home.findDealer}
              </LocaleLink>
            </div>
          </div>
        </section>
      </div>
      <div className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-2">
        <button type="button" className="btn btn-ghost pointer-events-auto bg-[var(--bg)]" onClick={() => go(page - 1)} aria-label={t.catalog.prev}>
          ↑
        </button>
        <span className="pointer-events-auto bg-[var(--bg)] px-3 py-2 text-xs">
          {t.catalog.page} {page + 1}/{total}
        </span>
        <button type="button" className="btn btn-ghost pointer-events-auto bg-[var(--bg)]" onClick={() => go(page + 1)} aria-label={t.catalog.next}>
          ↓
        </button>
      </div>
    </div>
  );
}
