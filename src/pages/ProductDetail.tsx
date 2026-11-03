import { Link, useParams } from "react-router-dom";
import { formatSpec, getProduct, products } from "@/data/products";
import { specKeys } from "@/data/site";
import { useCompare } from "@/context/Compare";
import { useI18n } from "@/context/Locale";
import { useTitle } from "@/lib/useTitle";
import { asset } from "@/lib/asset";
import { LocaleLink } from "@/components/LocaleLink";
import { ProductStage } from "@/components/SpinView";

export function ProductDetail() {
  const { slug = "" } = useParams();
  const product = getProduct(slug);
  const { t, locale } = useI18n();
  const { ids, toggle } = useCompare();
  useTitle(product ? `${product.code} · Asel` : t.notFound.title);

  if (!product) {
    return (
      <div className="wrap py-20">
        <h1 className="font-display text-5xl">{t.notFound.title}</h1>
        <LocaleLink to="/" className="btn btn-primary mt-6">
          {t.notFound.back}
        </LocaleLink>
      </div>
    );
  }

  const selected = ids.includes(product.slug);
  const others = products.filter((item) => item.slug !== product.slug);

  return (
    <div className="wrap py-12">
      <LocaleLink to="/urunler" className="text-sm text-[var(--muted)]">
        ← {t.detail.back}
      </LocaleLink>
      <div className="mt-6 grid items-start gap-10 lg:grid-cols-2">
        <ProductStage product={product} />
        <div>
          <p className="kicker">{formatSpec(product.specs.socket, locale)}</p>
          <h1 className="font-display mt-3 text-6xl leading-none">{product.code}</h1>
          <p className="mt-5 text-lg text-[var(--muted)]">{product.summary[locale]}</p>
          <div className="mt-6 grid grid-cols-3 gap-3">
              <Stat label={t.specs.torque} value={formatSpec(product.specs.torque, locale)} />
            <Stat label={t.specs.rpm} value={formatSpec(product.specs.rpm, locale)} />
            <Stat label={t.specs.weight} value={formatSpec(product.specs.weight, locale)} />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" className={selected ? "btn btn-primary" : "btn btn-ghost"} onClick={() => toggle(product.slug)}>
              {selected ? t.productsPage.added : t.productsPage.compare}
            </button>
            <LocaleLink to="/satis-noktalari" className="btn btn-primary">
              {t.detail.ask}
            </LocaleLink>
          </div>
          <h2 className="font-display mt-10 text-3xl">{t.detail.specs}</h2>
          <dl className="mt-4 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {specKeys.map((key) => (
              <div key={key} className="grid grid-cols-2 gap-3 py-3 text-sm">
                <dt className="text-[var(--muted)]">{t.specs[key]}</dt>
                <dd>{formatSpec(product.specs[key], locale)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <h2 className="font-display mt-16 text-3xl">{t.detail.related}</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {others.map((item) => (
          <Link key={item.slug} to={locale === "en" ? `/en/urun/${item.slug}` : `/urun/${item.slug}`} className="panel flex items-center gap-4 p-3">
            <img src={asset(item.cover)} alt="" className="h-24 w-20 bg-white object-contain" />
            <span>
              <strong className="font-display text-2xl">{item.code}</strong>
              <span className="mt-1 block text-sm text-[var(--muted)]">{item.specs.torque}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="panel p-3">
      <p className="text-[0.7rem] tracking-[0.12em] text-[var(--muted)]">{label}</p>
      <p className="font-display text-2xl leading-none">{value}</p>
    </div>
  );
}
