import heroImage from "@assets/hero.png";
import { LoginForm } from "@auth/components";
import { BadgeCheck, CreditCard, ShieldCheck, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

const featureIcons = [CreditCard, ShieldCheck, Sparkles] as const;

export const LoginPage = () => {
  const { t } = useTranslation("auth", { keyPrefix: "LoginPage" });

  const features = t("features", { returnObjects: true }) as string[];

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <div className="grid min-h-dvh lg:grid-cols-[minmax(0,1fr)_minmax(420px,520px)]">
        <section className="relative overflow-hidden border-b border-border bg-[radial-gradient(circle_at_20%_10%,oklch(0.92_0.04_150),transparent_32%),linear-gradient(135deg,oklch(0.99_0.01_95),oklch(0.96_0.02_210))] px-6 py-10 sm:px-10 lg:border-r lg:border-b-0 lg:px-14 lg:py-12">
          <div className="relative z-10 flex min-h-[520px] flex-col justify-between gap-12">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center border border-foreground/15 bg-background/75 shadow-sm">
                <CreditCard className="size-5" />
              </div>
              <div>
                <p className="font-heading text-lg font-semibold tracking-wider uppercase">
                  {t("brand")}
                </p>
                <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                  {t("brandCaption")}
                </p>
              </div>
            </div>

            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 border border-foreground/10 bg-background/70 px-3 py-2 text-xs font-semibold tracking-widest text-foreground uppercase">
                <BadgeCheck className="size-4" />
                {t("badge")}
              </div>
              <h1 className="max-w-4xl font-heading text-5xl leading-[0.95] font-semibold tracking-normal text-balance sm:text-6xl lg:text-7xl">
                {t("title")}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                {t("description")}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {features.map((feature, index) => {
                const Icon = featureIcons[index] ?? Sparkles;

                return (
                  <div
                    className="border border-foreground/10 bg-background/70 p-4 shadow-sm backdrop-blur"
                    key={feature}
                  >
                    <Icon className="mb-4 size-5" />
                    <p className="text-sm leading-6 text-muted-foreground">
                      {feature}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <img
            src={heroImage}
            alt=""
            className="pointer-events-none absolute right-[-42px] bottom-[-38px] w-[240px] opacity-70 sm:w-[320px] lg:right-6 lg:bottom-4"
          />
        </section>

        <section className="flex items-center justify-center px-6 py-10 sm:px-10">
          <div className="w-full max-w-[440px]">
            <LoginForm />
            <p className="mt-5 text-center text-sm leading-6 text-muted-foreground">
              {t("disclaimer")}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};
