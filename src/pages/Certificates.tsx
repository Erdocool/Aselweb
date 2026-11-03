import { useI18n } from "@/context/Locale";
import { useTitle } from "@/lib/useTitle";

const files = import.meta.glob("../assets/certificates/*.{png,jpg,jpeg,webp,pdf}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export function Certificates() {
  const { t } = useI18n();
  useTitle(`${t.certificates.title} · Asel`);
  const items = Object.entries(files);

  return (
    <div className="wrap py-14">
      <p className="kicker">{t.certificates.kicker}</p>
      <h1 className="font-display mt-3 text-6xl leading-none">{t.certificates.title}</h1>
      {items.length === 0 ? (
        <p className="mt-8 max-w-xl text-[var(--muted)]">{t.certificates.empty}</p>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(([path, url]) => {
            const name = path.split("/").pop() || path;
            const pdf = name.toLowerCase().endsWith(".pdf");
            return (
              <li key={path} className="panel p-4">
                {pdf ? (
                  <a className="underline" href={url} target="_blank" rel="noreferrer">
                    {t.certificates.open}: {name}
                  </a>
                ) : (
                  <a href={url} target="_blank" rel="noreferrer">
                    <img src={url} alt={name} className="w-full object-contain" />
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
