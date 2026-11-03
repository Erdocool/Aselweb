import { useState } from "react";
import { site } from "@/data/site";
import { products } from "@/data/products";
import { useI18n } from "@/context/Locale";
import { useTitle } from "@/lib/useTitle";
import { asset } from "@/lib/asset";
import { LocaleLink } from "@/components/LocaleLink";
import { ProductCard } from "@/components/ProductCard";
import { Teaser } from "@/components/Teaser";
import { LogoStage } from "@/components/LogoStage";

export function Home() {
  const { t } = useI18n();
  useTitle(t.brand);
  const [intro, setIntro] = useState(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return !reduce && sessionStorage.getItem("asel-teaser-seen") !== "1";
  });
  const hero = products[0];

  return (
    <div>
      {intro && <Teaser onDone={() => setIntro(false)} />}
      <LogoStage />
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute right-0 top-10 h-80 w-80 rounded-full bg-[var(--glow)] blur-3xl" />
        <div className="wrap grid items-center gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div>
            <p className="kicker">{t.home.kicker}</p>
            <h1 className="font-display mt-4 text-6xl leading-[0.9] md:text-8xl">{t.home.title}</h1>
            <p className="mt-6 max-w-xl text-lg text-[var(--muted)]">{t.home.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LocaleLink to="/urunler" className="btn btn-primary">
                {t.home.explore}
              </LocaleLink>
              <a className="btn btn-ghost" href={site.catalogPdf}>
                {t.home.download}
              </a>
            </div>
          </div>
          <div className="relative">
            <LocaleLink to={`/urun/${hero.slug}`} className="block bg-white shadow-[var(--shadow)]">
              <img src={asset(hero.cover)} alt={hero.code} className="w-full object-contain" />
            </LocaleLink>
            <div className="absolute bottom-4 left-4 border border-black/10 bg-black px-4 py-3 text-white">
              <p className="text-[0.65rem] tracking-[0.16em] text-red-400">{t.home.spotlightKicker}</p>
              <p className="font-display text-3xl">{hero.code}</p>
            </div>
            <div className="absolute bottom-4 right-4 bg-[var(--accent)] px-4 py-3 text-white">
              <p className="text-[0.65rem] tracking-[0.16em]">Nm</p>
              <p className="font-display text-4xl leading-none">{hero.torqueNm}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--line)]">
        <div className="wrap grid md:grid-cols-3">
          {t.promises.map((item) => (
            <article key={item.n} className="border-[var(--line)] py-8 md:border-l md:px-6 md:first:border-l-0">
              <p className="font-display text-sm text-[var(--accent)]">{item.n}</p>
              <h2 className="font-display mt-2 text-3xl">{item.title}</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap py-16">
        <p className="kicker">{t.home.chooseKicker}</p>
        <h2 className="font-display mt-3 max-w-xl text-5xl leading-none">{t.home.chooseTitle}</h2>
        <p className="mt-4 max-w-xl text-[var(--muted)]">{t.home.chooseLead}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <LocaleLink to="/urunler?soket=1-2" className="panel grid gap-3 p-6">
            <span className="font-display text-5xl">{t.home.halfTitle}</span>
            <span className="text-[var(--muted)]">{t.home.halfText}</span>
            <span className="text-sm text-[var(--accent)]">{t.home.seeModels}</span>
          </LocaleLink>
          <LocaleLink to="/urunler?soket=3-4" className="panel grid gap-3 bg-[var(--accent)] p-6 text-white">
            <span className="font-display text-5xl">{t.home.threeTitle}</span>
            <span>{t.home.threeText}</span>
            <span className="text-sm">{t.home.seeModels}</span>
          </LocaleLink>
        </div>
      </section>

      <section className="wrap pb-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-display text-4xl">{t.home.popular}</h2>
          <LocaleLink to="/urunler" className="text-sm text-[var(--accent)]">
            {t.home.allProducts}
          </LocaleLink>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-[var(--accent)] text-white">
        <div className="wrap flex flex-wrap items-end justify-between gap-6 py-14">
          <div>
            <h2 className="font-display text-5xl leading-none md:text-6xl">{t.home.bandTitle}</h2>
            <p className="mt-3 max-w-lg">{t.home.bandLead}</p>
          </div>
          <LocaleLink to="/satis-noktalari" className="btn border border-white text-white">
            {t.home.findDealer}
          </LocaleLink>
        </div>
      </section>
    </div>
  );
}
