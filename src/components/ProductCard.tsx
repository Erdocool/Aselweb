import { useEffect, useState } from "react";
import { formatSpec, type Product } from "@/data/products";
import { useCompare } from "@/context/Compare";
import { useI18n } from "@/context/Locale";
import { asset } from "@/lib/asset";
import { LocaleLink } from "./LocaleLink";
import { spinSrc, useSpinFrames } from "./SpinView";

export function ProductCard({ product }: { product: Product }) {
  const { t, locale } = useI18n();
  const { ids, toggle } = useCompare();
  const frames = useSpinFrames(product.slug);
  const [hot, setHot] = useState(false);
  const [frame, setFrame] = useState(0);
  const selected = ids.includes(product.slug);

  useEffect(() => {
    if (!hot || frames < 2) return;
    const timer = window.setInterval(() => setFrame((value) => (value + 1) % frames), 140);
    return () => window.clearInterval(timer);
  }, [hot, frames]);

  const src = hot && frames >= 2 ? spinSrc(product.slug, frame) : asset(product.cover);

  return (
    <article
      className="panel flex flex-col"
      onMouseEnter={() => setHot(true)}
      onMouseLeave={() => {
        setHot(false);
        setFrame(0);
      }}
    >
      <LocaleLink to={`/urun/${product.slug}`} className="relative block">
        <div className="bg-white">
          <img src={src} alt={product.code} className="aspect-[3/4] w-full object-contain" />
        </div>
        {hot && (
          <div className="pointer-events-none absolute right-3 top-3 w-40 border border-white/15 bg-black/80 p-3 text-white">
            <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-red-400">{t.productsPage.hud}</p>
            <p className="font-display text-4xl leading-none">{product.torqueNm} Nm</p>
            <p className="mt-2 text-xs text-white/75">{product.specs.rpm}</p>
            <p className="text-xs text-white/75">{product.specs.weight}</p>
          </div>
        )}
        <div className="grid gap-1 p-4">
          <strong className="font-display text-3xl tracking-wide">{product.code}</strong>
          <p className="text-sm text-[var(--muted)]">
            {formatSpec(product.specs.socket, locale)} · {formatSpec(product.specs.torque, locale)}
          </p>
        </div>
      </LocaleLink>
      <div className="mt-auto px-4 pb-4">
        <button type="button" className={`${selected ? "btn btn-primary" : "btn btn-ghost"} w-full`} onClick={() => toggle(product.slug)}>
          {selected ? t.productsPage.added : t.productsPage.compare}
        </button>
      </div>
    </article>
  );
}
