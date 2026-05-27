import {
  BentoGallery,
  InteractiveHeroField,
  Reveal,
  SiteHeader,
} from "@common/components";
import { Button } from "@components/ui/button";
import { APP_ROUTES } from "@config/routes";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export const LandingPage = () => {
  const { t } = useTranslation("common", { keyPrefix: "LandingPage" });

  const steps = t("steps", { returnObjects: true }) as string[];
  const pricingHighlights = t("pricingHighlights", {
    returnObjects: true,
  }) as string[];

  return (
    <main className="min-h-dvh bg-surface-hero text-surface-hero-foreground">
      <SiteHeader />

      <section className="relative isolate flex min-h-dvh items-center overflow-hidden px-[var(--page-x)] pt-[calc(var(--header-height)+var(--space-10))] pb-[var(--space-12)] ">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,var(--brand-glow),transparent_32%),linear-gradient(145deg,var(--surface-hero)_0%,var(--color-bg-surface)_54%,var(--color-bg-base)_100%)]" />
        <InteractiveHeroField />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,transparent_0%,rgba(10,10,15,0.18)_42%,var(--color-hero-vignette)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-hero-scrim)_0%,rgba(10,10,15,0.28)_46%,rgba(10,10,15,0.5)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-surface-hero to-transparent" />

        <div className="relative z-10 mx-auto flex w-full max-w-[var(--content-max)] items-center">
          <div className="max-w-5xl">
            <Reveal
              as="h1"
              animation="animate__fadeInUp"
              className="max-w-5xl text-[length:var(--text-hero)] leading-[1.2] font-semibold tracking-tight text-balance"
            >
              {t("title")}
            </Reveal>

            <Reveal
              as="p"
              animation="animate__fadeInUp"
              className="mt-[var(--space-6)] max-w-2xl text-base leading-8 text-surface-hero-muted sm:text-lg"
              delayMs={160}
            >
              {t("description")}
            </Reveal>

            <Reveal
              className="mt-[var(--space-8)] flex flex-col gap-[var(--space-3)] sm:flex-row"
              delayMs={280}
            >
              <Button
                asChild
                className="bg-brand text-brand-foreground hover:bg-brand-soft"
                size="lg"
              >
                <Link to={APP_ROUTES.LOGIN}>
                  {t("primaryAction")}
                  <ArrowRight />
                </Link>
              </Button>
              <Button
                asChild
                className="border-glass-border text-white hover:bg-white/10"
                size="lg"
                variant="outline"
              >
                <a href="#games">{t("secondaryAction")}</a>
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        className="border-y border-glass-border bg-surface-hero px-[var(--page-x)] pt-[var(--section-y)] pb-3"
        id="games"
      >
        <div className="mx-auto max-w-[var(--content-max)]">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <Reveal animation="animate__fadeInLeft">
              <p className="text-xs font-semibold tracking-widest text-brand-soft uppercase">
                {t("galleryEyebrow")}
              </p>
              <h2 className="mt-3 max-w-2xl text-[length:var(--text-section)] leading-tight font-semibold text-balance">
                {t("galleryTitle")}
              </h2>
            </Reveal>
          </div>

          <BentoGallery />
        </div>
      </section>

      <section
        className="bg-surface-frost px-[var(--page-x)] py-[var(--section-y)] text-surface-frost-foreground"
        id="how-it-works"
      >
        <div className="mx-auto grid max-w-[var(--content-max)] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <Reveal animation="animate__fadeInUp">
            <p className="text-xs font-semibold tracking-widest text-brand-deep uppercase">
              {t("stepsEyebrow")}
            </p>
            <h2 className="mt-3 text-[length:var(--text-section)] leading-tight font-semibold text-balance">
              {t("stepsTitle")}
            </h2>
          </Reveal>

          <div className="grid gap-3 md:grid-cols-3">
            {steps.map((step, index) => (
              <Reveal
                as="article"
                animation="animate__fadeInUp"
                className="border border-border bg-white p-5"
                delayMs={index * 140}
                key={step}
              >
                <span className="text-xs font-semibold tracking-widest text-brand-muted uppercase">
                  0{index + 1}
                </span>
                <p className="mt-6 text-lg leading-7 font-semibold">{step}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        className="bg-surface-hero px-[var(--page-x)] py-[var(--section-y)] text-white"
        id="pricing"
      >
        <Reveal
          animation="animate__fadeInUp"
          className="mx-auto grid max-w-[var(--content-max)] gap-10 border border-glass-border bg-white/6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.48fr)] lg:items-center"
        >
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-widest text-brand-soft uppercase">
              {t("pricingEyebrow")}
            </p>
            <h2 className="mt-3 text-[length:var(--text-section)] leading-tight font-semibold text-balance">
              {t("pricingTitle")}
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-surface-hero-muted sm:text-base">
              {t("pricingDescription")}
            </p>
          </div>

          <div className="grid gap-5">
            <ul className="grid gap-3">
              {pricingHighlights.map((highlight, index) => (
                <li
                  className="flex items-start gap-3 border border-glass-border bg-white/7 p-4 text-sm leading-6 text-surface-hero-muted"
                  key={highlight}
                >
                  <span className="mt-1 text-xs font-semibold tracking-widest text-brand-soft">
                    0{index + 1}
                  </span>
                  {highlight}
                </li>
              ))}
            </ul>

            <Button
              asChild
              className="bg-surface-frost text-surface-frost-foreground hover:bg-brand-soft"
            >
              <Link to={APP_ROUTES.LOGIN}>{t("pricingAction")}</Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </main>
  );
};
