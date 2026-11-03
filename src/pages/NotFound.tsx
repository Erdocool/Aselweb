import { useI18n } from "@/context/Locale";
import { useTitle } from "@/lib/useTitle";
import { LocaleLink } from "@/components/LocaleLink";

export function NotFound() {
  const { t } = useI18n();
  useTitle(`${t.notFound.title} · Asel`);
  return (
    <div className="wrap py-24">
      <h1 className="font-display text-6xl">{t.notFound.title}</h1>
      <LocaleLink to="/" className="btn btn-primary mt-6">
        {t.notFound.back}
      </LocaleLink>
    </div>
  );
}
