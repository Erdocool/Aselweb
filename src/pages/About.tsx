import { site } from "@/data/site";
import { useI18n } from "@/context/Locale";
import { useTitle } from "@/lib/useTitle";
import { LocaleLink } from "@/components/LocaleLink";

const founders = ["Nuri Kılıç", "İsmail Kılıç", "Abdullah Kılıç"];

export function About() {
  const { t } = useI18n();
  useTitle(`${t.about.title} · Asel`);

  return (
    <div className="wrap py-14">
      <p className="kicker">{t.about.kicker}</p>
      <h1 className="font-display mt-3 max-w-3xl text-6xl leading-none">{t.about.title}</h1>
      <p className="mt-6 max-w-3xl text-lg">{t.about.lead}</p>
      <p className="mt-4 max-w-3xl text-[var(--muted)]">{t.about.body}</p>
      <h2 className="font-display mt-12 text-3xl">{t.about.founders}</h2>
      <ul className="mt-4 grid gap-3 md:grid-cols-3">
        {founders.map((name) => (
          <li key={name} className="panel p-5">
            <p className="font-display text-3xl">{name}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{t.about.role}</p>
          </li>
        ))}
      </ul>
      <div className="panel mt-10 grid gap-3 p-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p>{site.address}</p>
          <a className="mt-1 block" href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>
        </div>
        <LocaleLink to="/iletisim" className="btn btn-primary">
          {t.about.visit}
        </LocaleLink>
      </div>
    </div>
  );
}
