import { site } from "@/data/site";
import { useI18n } from "@/context/Locale";
import { useTitle } from "@/lib/useTitle";
import { InquiryForm } from "@/components/InquiryForm";

export function Contact() {
  const { t } = useI18n();
  useTitle(`${t.contact.title} · Asel`);
  return (
    <div className="wrap grid gap-10 py-14 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <p className="kicker">{t.contact.kicker}</p>
        <h1 className="font-display mt-3 text-6xl leading-none">{t.contact.title}</h1>
        <p className="mt-4 text-[var(--muted)]">{t.contact.lead}</p>
        <div className="mt-8 grid gap-2 text-sm">
          <p>{site.address}</p>
          <a href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>
          {site.emails.map((email) => (
            <a key={email} href={`mailto:${email}`}>{email}</a>
          ))}
          <a href={site.maps} target="_blank" rel="noreferrer">{t.dealers.map}</a>
        </div>
      </div>
      <InquiryForm kind="contact" />
    </div>
  );
}

export function DealerApply() {
  const { t } = useI18n();
  useTitle(`${t.apply.title} · Asel`);
  return (
    <div className="wrap grid gap-10 py-14 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <p className="kicker">{t.apply.kicker}</p>
        <h1 className="font-display mt-3 text-6xl leading-none">{t.apply.title}</h1>
        <p className="mt-4 text-[var(--muted)]">{t.apply.lead}</p>
      </div>
      <InquiryForm kind="dealer" />
    </div>
  );
}
