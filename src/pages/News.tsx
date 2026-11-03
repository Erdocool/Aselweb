import { useParams } from "react-router-dom";
import { getNews, news } from "@/data/news";
import { useI18n } from "@/context/Locale";
import { formatDate, useTitle } from "@/lib/useTitle";
import { asset } from "@/lib/asset";
import { LocaleLink } from "@/components/LocaleLink";

export function NewsList() {
  const { t, locale } = useI18n();
  useTitle(`${t.news.title} · Asel`);

  return (
    <div className="wrap py-14">
      <p className="kicker">{t.news.kicker}</p>
      <h1 className="font-display mt-3 text-6xl leading-none">{t.news.title}</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {news.map((item) => (
          <LocaleLink key={item.slug} to={`/haberler/${item.slug}`} className="panel block">
            <img src={asset(item.image)} alt="" className="aspect-[16/10] w-full object-cover" />
            <div className="p-4">
              <p className="text-xs text-[var(--muted)]">{formatDate(item.date, locale)}</p>
              <h2 className="font-display mt-2 text-3xl leading-none">{item.title[locale]}</h2>
              <p className="mt-3 text-sm text-[var(--accent)]">{t.news.read}</p>
            </div>
          </LocaleLink>
        ))}
      </div>
    </div>
  );
}

export function NewsDetail() {
  const { slug = "" } = useParams();
  const item = getNews(slug);
  const { t, locale } = useI18n();
  useTitle(item ? `${item.title[locale]} · Asel` : t.notFound.title);

  if (!item) {
    return (
      <div className="wrap py-20">
        <h1 className="font-display text-5xl">{t.notFound.title}</h1>
      </div>
    );
  }

  return (
    <article className="wrap py-14">
      <LocaleLink to="/haberler" className="text-sm text-[var(--muted)]">
        ← {t.news.back}
      </LocaleLink>
      <p className="mt-6 text-sm text-[var(--muted)]">{formatDate(item.date, locale)}</p>
      <h1 className="font-display mt-2 max-w-3xl text-5xl leading-none md:text-6xl">{item.title[locale]}</h1>
      <img src={asset(item.image)} alt="" className="mt-8 aspect-[16/8] w-full object-cover" />
      <div className="mt-8 grid max-w-3xl gap-4 text-lg">
        {item.body[locale].map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
