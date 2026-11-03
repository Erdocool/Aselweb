import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import type { Locale } from "@/data/site";
import { site } from "@/data/site";
import { LocaleProvider, useI18n } from "@/context/Locale";
import { useTheme } from "@/context/Theme";
import { useCompare } from "@/context/Compare";
import { isActive, stripLocale, withLocale } from "@/lib/paths";
import { CompareBar } from "./CompareBar";
import { LocaleLink } from "./LocaleLink";
import { Logo } from "./Logo";

const companyLinks = [
  { to: "/hakkimizda", key: "about" },
  { to: "/sertifikalar", key: "certificates" },
  { to: "/sss", key: "faq" },
  { to: "/bayi-basvuru", key: "apply" },
] as const;

export function Shell({ locale }: { locale: Locale }) {
  return (
    <LocaleProvider locale={locale}>
      <Frame />
    </LocaleProvider>
  );
}

function Frame() {
  const { ids } = useCompare();
  const location = useLocation();
  const path = stripLocale(location.pathname);
  const bare = path === "/katalog";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className={ids.length ? "pb-40" : ""}>
      <Header />
      <main>
        <Outlet />
      </main>
      {!bare && <Footer />}
      <CompareBar />
    </div>
  );
}

function Header() {
  const { t, locale } = useI18n();
  const { theme, toggle } = useTheme();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [company, setCompany] = useState(false);
  const companyOn = companyLinks.some((item) => isActive(location.pathname, item.to));

  useEffect(() => {
    setOpen(false);
    setCompany(false);
  }, [location.pathname, locale]);

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/urunler", label: t.nav.products },
    { to: "/satis-noktalari", label: t.nav.dealers },
    { to: "/haberler", label: t.nav.news },
    { to: "/iletisim", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--header)] backdrop-blur">
      <div className="wrap flex h-[4.5rem] items-center gap-4">
        <LocaleLink to="/" className="shrink-0" aria-label="Asel">
          <Logo />
        </LocaleLink>
        <nav className="ml-auto hidden items-center gap-5 text-sm lg:flex" aria-label="Asel">
          {links.slice(0, 2).map((item) => (
            <LocaleLink key={item.to} to={item.to} className={isActive(location.pathname, item.to) ? "text-[var(--accent)]" : ""}>
              {item.label}
            </LocaleLink>
          ))}
          <div className="relative" onMouseLeave={() => setCompany(false)}>
            <button
              type="button"
              className={companyOn ? "text-[var(--accent)]" : ""}
              aria-expanded={company}
              onClick={() => setCompany((value) => !value)}
              onMouseEnter={() => setCompany(true)}
            >
              {t.nav.corporate}
            </button>
            {company && (
              <div className="absolute left-0 top-full z-10 mt-3 grid min-w-48 border border-[var(--line)] bg-[var(--bg-elev)] p-2">
                {companyLinks.map((item) => (
                  <LocaleLink key={item.to} to={item.to} className="px-3 py-2 text-sm hover:text-[var(--accent)]">
                    {t.nav[item.key]}
                  </LocaleLink>
                ))}
              </div>
            )}
          </div>
          {links.slice(2).map((item) => (
            <LocaleLink key={item.to} to={item.to} className={isActive(location.pathname, item.to) ? "text-[var(--accent)]" : ""}>
              {item.label}
            </LocaleLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3 lg:ml-4">
          <LanguageSwitch />
          <button type="button" className="grid h-9 w-9 place-items-center border border-[var(--line)]" onClick={toggle} aria-label={theme === "dark" ? t.theme.toLight : t.theme.toDark}>
            {theme === "dark" ? "☀" : "☾"}
          </button>
          <LocaleLink to="/katalog" className="btn btn-primary hidden h-9 min-h-0 px-3 sm:inline-flex">
            {t.nav.catalog}
          </LocaleLink>
          <button type="button" className="btn btn-ghost h-9 min-h-0 px-3 lg:hidden" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            {open ? t.nav.close : t.nav.menu}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-[var(--line)] lg:hidden">
          <div className="wrap grid py-3">
            {links.map((item) => (
              <LocaleLink key={item.to} to={item.to} className="py-2">
                {item.label}
              </LocaleLink>
            ))}
            {companyLinks.map((item) => (
              <LocaleLink key={item.to} to={item.to} className="py-2 text-[var(--muted)]">
                {t.nav[item.key]}
              </LocaleLink>
            ))}
            <LocaleLink to="/katalog" className="py-2 text-[var(--accent)]">
              {t.nav.catalog}
            </LocaleLink>
          </div>
        </nav>
      )}
    </header>
  );
}

function LanguageSwitch() {
  const { locale } = useI18n();
  const location = useLocation();
  const path = stripLocale(location.pathname);
  return (
    <div className="flex items-center gap-1 text-xs font-semibold tracking-[0.14em]">
      <Link to={{ pathname: withLocale("tr", path), search: location.search }} aria-current={locale === "tr" ? "true" : undefined} className={locale === "tr" ? "text-[var(--accent)]" : ""}>
        TR
      </Link>
      <span className="text-[var(--muted)]">/</span>
      <Link to={{ pathname: withLocale("en", path), search: location.search }} aria-current={locale === "en" ? "true" : undefined} className={locale === "en" ? "text-[var(--accent)]" : ""}>
        EN
      </Link>
    </div>
  );
}

function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-[var(--line)]">
      <div className="wrap grid gap-8 py-12 md:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-[var(--muted)]">{t.footer.note}</p>
        </div>
        <div className="grid content-start gap-2 text-sm">
          <LocaleLink to="/urunler">{t.nav.products}</LocaleLink>
          <LocaleLink to="/katalog">{t.nav.catalog}</LocaleLink>
          <LocaleLink to="/karsilastir">{t.compare.open}</LocaleLink>
          <LocaleLink to="/satis-noktalari">{t.nav.dealers}</LocaleLink>
        </div>
        <div className="grid content-start gap-2 text-sm">
          <LocaleLink to="/hakkimizda">{t.nav.about}</LocaleLink>
          <LocaleLink to="/haberler">{t.nav.news}</LocaleLink>
          <LocaleLink to="/sss">{t.nav.faq}</LocaleLink>
          <LocaleLink to="/kvkk">{t.legal.kvkkTitle}</LocaleLink>
          <LocaleLink to="/cerez">{t.legal.cookieTitle}</LocaleLink>
        </div>
        <div className="grid content-start gap-2 text-sm">
          <a href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>
          {site.emails.map((email) => (
            <a key={email} href={`mailto:${email}`}>
              {email}
            </a>
          ))}
          <p className="text-[var(--muted)]">{site.address}</p>
          <div className="flex gap-3">
            <a href={site.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={site.facebook} target="_blank" rel="noreferrer">
              Facebook
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--line)]">
        <p className="wrap py-4 text-xs text-[var(--muted)]">Asel © {new Date().getFullYear()}. {t.footer.rights}</p>
      </div>
    </footer>
  );
}
