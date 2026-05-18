import {
  BentoGallery,
  InteractiveHeroField,
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

  return (
    <main className="min-h-dvh bg-surface-hero text-surface-hero-foreground">
      <SiteHeader />

      <section className="relative isolate flex min-h-dvh items-center overflow-hidden px-[var(--page-x)] pt-[calc(var(--header-height)+var(--space-10))] pb-[var(--space-12)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,var(--brand-glow),transparent_32%),linear-gradient(145deg,var(--surface-hero)_0%,var(--color-bg-surface)_54%,var(--color-bg-base)_100%)]" />
        <InteractiveHeroField />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,transparent_0%,rgba(10,10,15,0.18)_42%,var(--color-hero-vignette)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-hero-scrim)_0%,rgba(10,10,15,0.28)_46%,rgba(10,10,15,0.5)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-surface-hero to-transparent" />

        <div className="relative z-10 mx-auto flex w-full max-w-[var(--content-max)] items-center">
          <div className="max-w-5xl">
            <h1 className="max-w-5xl text-[length:var(--text-hero)] leading-[1.2] font-semibold tracking-tight text-balance">
              {t("title")}
            </h1>

            <p className="mt-[var(--space-6)] max-w-2xl text-base leading-8 text-surface-hero-muted sm:text-lg">
              {t("description")}
            </p>

            <div className="mt-[var(--space-8)] flex flex-col gap-[var(--space-3)] sm:flex-row">
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
            </div>
          </div>
        </div>
      </section>

      <section
        className="border-y border-glass-border bg-surface-hero px-[var(--page-x)] pt-[var(--section-y)] pb-3"
        id="games"
      >
        <div className="mx-auto max-w-[var(--content-max)]">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold tracking-widest text-brand-soft uppercase">
                {t("galleryEyebrow")}
              </p>
              <h2 className="mt-3 max-w-2xl text-[length:var(--text-section)] leading-tight font-semibold text-balance">
                {t("galleryTitle")}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-surface-hero-muted">
              {t("galleryDescription")}
            </p>
          </div>

          <BentoGallery />
        </div>
      </section>

      <section
        className="bg-surface-frost px-[var(--page-x)] py-[var(--section-y)] text-surface-frost-foreground"
        id="how-it-works"
      >
        <div className="mx-auto grid max-w-[var(--content-max)] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold tracking-widest text-brand-deep uppercase">
              {t("stepsEyebrow")}
            </p>
            <h2 className="mt-3 text-[length:var(--text-section)] leading-tight font-semibold text-balance">
              {t("stepsTitle")}
            </h2>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {steps.map((step, index) => (
              <article className="border border-border bg-white p-5" key={step}>
                <span className="text-xs font-semibold tracking-widest text-brand-muted uppercase">
                  0{index + 1}
                </span>
                <p className="mt-6 text-lg leading-7 font-semibold">{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="bg-surface-hero px-[var(--page-x)] py-[var(--section-y)] text-white"
        id="pricing"
      >
        <div className="mx-auto flex max-w-[var(--content-max)] flex-col items-start justify-between gap-8 border border-glass-border bg-white/6 p-6 sm:p-8 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-semibold tracking-widest text-brand-soft uppercase">
              {t("pricingEyebrow")}
            </p>
            <h2 className="mt-3 max-w-3xl text-[length:var(--text-section)] leading-tight font-semibold text-balance">
              {t("pricingTitle")}
            </h2>
          </div>
          <Button
            asChild
            className="bg-surface-frost text-surface-frost-foreground hover:bg-brand-soft"
          >
            <Link to={APP_ROUTES.LOGIN}>{t("pricingAction")}</Link>
          </Button>
        </div>
      </section>
    </main>
  );
};
