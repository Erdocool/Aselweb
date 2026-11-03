import type { ComponentProps } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "@/context/Locale";
import { withLocale } from "@/lib/paths";

export function LocaleLink({ to, ...rest }: { to: string } & Omit<ComponentProps<typeof Link>, "to">) {
  const { locale } = useI18n();
  return <Link to={withLocale(locale, to)} {...rest} />;
}
