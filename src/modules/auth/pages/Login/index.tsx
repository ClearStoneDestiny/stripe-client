import { Reveal } from "@common/components";
import { LoginForm } from "@auth/components";
import { APP_ROUTES } from "@config/routes";
import {
  BadgeCheck,
  CreditCard,
  Gamepad2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const featureIcons = [CreditCard, ShieldCheck, Sparkles] as const;

export const LoginPage = () => {
  const { t } = useTranslation("auth", { keyPrefix: "LoginPage" });

  const features = t("features", { returnObjects: true }) as string[];

  return (
    <main className="min-h-dvh bg-surface-hero text-surface-hero-foreground">
      <div className="grid min-h-dvh lg:grid-cols-[minmax(0,1fr)_minmax(420px,560px)]">
        <section className="relative overflow-hidden border-b border-glass-border px-[var(--page-x)] py-[var(--space-8)] lg:border-r lg:border-b-0 lg:py-[var(--space-12)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,var(--brand-glow),transparent_30%),radial-gradient(circle_at_86%_72%,rgba(208,234,251,0.13),transparent_28%),linear-gradient(145deg,var(--surface-hero)_0%,var(--color-bg-surface)_54%,var(--color-bg-base)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-surface-hero to-transparent" />

          <Reveal
            as="div"
            animation="animate__fadeInUp"
            className="relative z-10 flex min-h-[calc(100dvh-var(--space-16))] flex-col justify-between gap-[var(--space-16)]"
          >
            <Link
              to={APP_ROUTES.LANDING}
              className="flex w-fit items-center gap-3 text-white"
              aria-label="Mika Play home"
            >
              <span className="grid size-10 place-items-center rounded-full border border-glass-border bg-white/10 backdrop-blur">
                <Gamepad2 className="size-5 text-brand-soft" />
              </span>
              <div>
                <p className="font-heading text-lg font-semibold tracking-wider uppercase">
                  {t("brand")}
                </p>
                <p className="text-xs font-semibold tracking-widest text-surface-hero-muted uppercase">
                  {t("brandCaption")}
                </p>
              </div>
            </Link>

            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-glass-border bg-white/8 px-4 py-2 text-xs font-semibold tracking-widest text-brand-soft uppercase backdrop-blur-xl">
                <BadgeCheck className="size-4" />
                {t("badge")}
              </div>
              <h1 className="max-w-4xl font-heading text-5xl leading-[1.02] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
                {t("title")}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-surface-hero-muted sm:text-lg">
                {t("description")}
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {features.map((feature, index) => {
                const Icon = featureIcons[index] ?? Sparkles;

                return (
                  <div
                    className="border border-glass-border bg-white/7 p-4 shadow-[var(--shadow-sm)] backdrop-blur-xl"
                    key={feature}
                  >
                    <Icon className="mb-4 size-5 text-brand-soft" />
                    <p className="text-sm leading-6 text-surface-hero-muted">
                      {feature}
                    </p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </section>

        <section className="relative flex items-center justify-center overflow-hidden px-[var(--page-x)] py-[var(--space-12)]">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-bg-base)_0%,var(--color-bg-surface)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(122,184,232,0.18),transparent_32%)]" />
          <Reveal
            as="div"
            animation="animate__fadeInRightBig"
            className="w-full max-w-[440px]"
          >
            <LoginForm />
            <p className="relative z-10 mt-5 text-center text-sm leading-6 text-surface-hero-muted">
              {t("disclaimer")}
            </p>
          </Reveal>
        </section>
      </div>
    </main>
  );
};
