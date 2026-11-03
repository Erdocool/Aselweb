import { useState, type FormEvent } from "react";
import { site } from "@/data/site";
import { useI18n } from "@/context/Locale";

type Kind = "contact" | "dealer";
type Status = "idle" | "sending" | "ok" | "mail";

export function InquiryForm({ kind }: { kind: Kind }) {
  const { t } = useI18n();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mailto, setMailto] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      kind,
      website: String(form.get("website") || ""),
      name: String(form.get("name") || "").trim(),
      email: String(form.get("email") || "").trim(),
      phone: String(form.get("phone") || "").trim(),
      company: String(form.get("company") || "").trim(),
      city: String(form.get("city") || "").trim(),
      message: String(form.get("message") || "").trim(),
    };
    const next: Record<string, string> = {};
    if (payload.name.length < 2) next.name = t.form.errName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) next.email = t.form.errEmail;
    if (payload.message.length < 5) next.message = t.form.errMessage;
    if (kind === "dealer") {
      if (payload.phone.length < 7) next.phone = t.form.errPhone;
      if (payload.company.length < 2) next.company = t.form.errCompany;
      if (payload.city.length < 2) next.city = t.form.errCity;
    }
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    if (payload.website) {
      setStatus("ok");
      return;
    }

    const body = [
      `${t.form.name}: ${payload.name}`,
      `${t.form.email}: ${payload.email}`,
      `${t.form.phone}: ${payload.phone}`,
      `${t.form.company}: ${payload.company}`,
      `${t.form.city}: ${payload.city}`,
      "",
      payload.message,
    ].join("\n");
    const link = `mailto:${site.emails[0]}?subject=${encodeURIComponent(kind === "dealer" ? t.apply.title : t.contact.title)}&body=${encodeURIComponent(body)}`;
    setMailto(link);
    setStatus("sending");

    try {
      const response = await fetch("/api/basvuru.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { ok?: boolean };
      if (!response.ok || !data.ok) throw new Error("mail");
      setStatus("ok");
      event.currentTarget.reset();
    } catch {
      setStatus("mail");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      <input name="website" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px]" aria-hidden="true" />
      <label className="field">
        <span>{t.form.name}</span>
        <input name="name" autoComplete="name" />
        {errors.name && <small className="text-[var(--accent)]">{errors.name}</small>}
      </label>
      <label className="field">
        <span>{t.form.email}</span>
        <input name="email" type="email" autoComplete="email" />
        {errors.email && <small className="text-[var(--accent)]">{errors.email}</small>}
      </label>
      <label className="field">
        <span>{t.form.phone}</span>
        <input name="phone" autoComplete="tel" />
        {errors.phone && <small className="text-[var(--accent)]">{errors.phone}</small>}
      </label>
      {kind === "dealer" && (
        <>
          <label className="field">
            <span>{t.form.company}</span>
            <input name="company" />
            {errors.company && <small className="text-[var(--accent)]">{errors.company}</small>}
          </label>
          <label className="field">
            <span>{t.form.city}</span>
            <input name="city" />
            {errors.city && <small className="text-[var(--accent)]">{errors.city}</small>}
          </label>
        </>
      )}
      <label className="field">
        <span>{t.form.message}</span>
        <textarea name="message" />
        {errors.message && <small className="text-[var(--accent)]">{errors.message}</small>}
      </label>
      <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
        {status === "sending" ? t.form.sending : t.form.send}
      </button>
      {status === "ok" && <p>{t.form.ok}</p>}
      {status === "mail" && (
        <p>
          {t.form.mail}{" "}
          <a className="underline" href={mailto}>
            {t.form.mailto}
          </a>
        </p>
      )}
    </form>
  );
}
