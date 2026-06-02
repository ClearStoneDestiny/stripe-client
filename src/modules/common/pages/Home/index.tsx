import { ProductsCarousel } from "@product/components";
import { apiSlice } from "@api/slices/apiSlice";
import { useLogoutMutation } from "@auth/api/authApi";
import {
  useGetCurrentSubscriptionQuery,
  useGetUserBalanceQuery,
} from "@billing/api/billingApi";
import { Button } from "@components/ui/button";
import { LoadingButton, Reveal } from "@common/components";
import { APP_ROUTES } from "@config/routes";
import {
  ArrowRight,
  Clock3,
  CreditCard,
  Gamepad2,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { format } from "date-fns";

export const HomePage = () => {
  const { t } = useTranslation("common", { keyPrefix: "HomePage" });

  const overviewCards = t("overviewCards", { returnObjects: true }) as Array<{
    description: string;
    title: string;
  }>;

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const { data: balance, isLoading: isBalanceLoading } =
    useGetUserBalanceQuery();
  const { data: currentSubscriptionData, isLoading: isSubscriptionLoading } =
    useGetCurrentSubscriptionQuery();

  const subscription = currentSubscriptionData?.subscription;
  const currentPlanName = subscription?.plan?.name ?? t("noActivePlan");
  const hasActiveAccess = currentSubscriptionData?.hasActiveAccess ?? false;

  const formatHours = (hours?: number) => {
    if (hours === undefined) {
      return t("loadingMetric");
    }

    return `${Number.isInteger(hours) ? hours : hours.toFixed(1)}h`;
  };

  const formatShortDate = (date?: string) => {
    if (!date) {
      return t("notScheduled");
    }

    try {
      return format(new Date(date), "MMM d");
    } catch {
      return t("notScheduled");
    }
  };

  const stats = [
    {
      label: t("stats.playCredits"),
      value: isBalanceLoading
        ? t("loadingMetric")
        : formatHours(balance?.availableHours),
    },
    {
      label: t("stats.currentPlan"),
      value: isSubscriptionLoading ? t("loadingMetric") : currentPlanName,
    },
    {
      label: t("stats.access"),
      value: isSubscriptionLoading
        ? t("loadingMetric")
        : hasActiveAccess
          ? t("accessActive")
          : t("accessInactive"),
    },
  ];

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch {
      enqueueSnackbar("generic", { variant: "error" });
    } finally {
      // Clearing all user cookies
      localStorage.removeItem("access_token");
      dispatch(apiSlice.util.resetApiState());
      navigate(APP_ROUTES.LOGIN);
    }
  };

  return (
    <main className="relative min-h-dvh overflow-hidden bg-surface-hero text-surface-hero-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_9%,var(--brand-glow),transparent_30%),radial-gradient(circle_at_86%_16%,rgba(208,234,251,0.12),transparent_28%),linear-gradient(145deg,var(--surface-hero)_0%,var(--color-bg-surface)_54%,var(--color-bg-base)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-white/8 to-transparent" />

      <section className="relative z-10 overflow-hidden px-[var(--page-x)] pt-[calc(var(--header-height)+var(--space-12))] pb-[var(--section-y)]">
        <div className="relative mx-auto grid max-w-[var(--content-max)] gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.45fr)] lg:items-end">
          <Reveal>
            <p className="text-xs font-semibold tracking-widest text-brand-soft uppercase">
              {t("eyebrow")}
            </p>
            <h1 className="mt-4 max-w-4xl font-heading text-5xl leading-[1.02] font-semibold tracking-tight text-balance sm:text-6xl">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-surface-hero-muted">
              {t("description")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="bg-brand text-brand-foreground hover:bg-brand-soft"
                size="lg"
              >
                <Link to={`${APP_ROUTES.HOME}#popular`}>
                  {t("sessionAction")}
                  <ArrowRight />
                </Link>
              </Button>
              <LoadingButton
                className="border-glass-border text-white hover:bg-white/70"
                isLoading={isLoggingOut}
                loaderText={t("logoutLoading")}
                onClick={handleLogout}
                size="lg"
                variant="outline"
              >
                {t("logout")}
              </LoadingButton>
            </div>
          </Reveal>

          <Reveal delayMs={180}>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {stats.map((stat) => (
                <article
                  className="border border-glass-border bg-white/7 p-5 backdrop-blur-xl"
                  key={stat.label}
                >
                  <p className="text-xs font-semibold tracking-widest text-surface-hero-muted uppercase">
                    {stat.label}
                  </p>
                  <p className="mt-2 font-heading text-3xl font-semibold text-white">
                    {stat.value}
                  </p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section
        className="relative z-10 border-y border-glass-border px-[var(--page-x)] py-[var(--section-y)]"
        id="popular"
      >
        <div className="mx-auto max-w-[var(--content-max)]">
          <Reveal className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h2 className="mt-3 max-w-3xl text-[length:var(--text-section)] leading-tight font-semibold text-balance">
                {t("popularTitle")}
              </h2>
            </div>
          </Reveal>

          <Reveal delayMs={160}>
            <ProductsCarousel />
          </Reveal>
        </div>
      </section>

      <section className="relative z-10 bg-surface-frost px-[var(--page-x)] py-[var(--section-y)] text-surface-frost-foreground">
        <div className="mx-auto grid max-w-[var(--content-max)] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal>
            <p className="text-xs font-semibold tracking-widest text-brand-deep uppercase">
              {t("overviewEyebrow")}
            </p>
            <h2 className="mt-3 text-[length:var(--text-section)] leading-tight font-semibold text-balance">
              {t("overviewTitle")}
            </h2>
          </Reveal>

          <div className="grid gap-3 md:grid-cols-3">
            {overviewCards.map((card, index) => {
              const icons = [CreditCard, ReceiptText, ShieldCheck] as const;
              const Icon = icons[index] ?? CreditCard;

              return (
                <Reveal
                  as="article"
                  className="border border-border bg-white p-5"
                  delayMs={index * 120}
                  key={card.title}
                >
                  <Icon className="mb-5 size-5 text-brand-deep" />
                  <h3 className="font-heading text-lg font-semibold tracking-wider uppercase">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {card.description}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section
        className="relative z-10 px-[var(--page-x)] py-[var(--section-y)]"
        id="billing"
      >
        <Reveal className="mx-auto grid max-w-[var(--content-max)] gap-8 border border-glass-border bg-white/6 p-6 backdrop-blur-xl sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-semibold tracking-widest text-brand-soft uppercase">
              {t("sessionEyebrow")}
            </p>
            <h2 className="mt-3 max-w-3xl text-4xl leading-tight font-semibold text-balance">
              {t("sessionTitle")}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-surface-hero-muted">
              {t("sessionDescription")}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:w-80 lg:grid-cols-1">
            <div className="border border-glass-border bg-surface-hero/60 p-5">
              <Clock3 className="mb-4 size-5 text-brand-soft" />
              <p className="text-sm leading-6 text-surface-hero-muted">
                {t("creditsSummary", {
                  hours: isBalanceLoading
                    ? t("loadingMetric")
                    : formatHours(balance?.availableHours),
                  reset: formatShortDate(balance?.nextResetAt),
                })}
              </p>
            </div>
            <div className="border border-glass-border bg-surface-hero/60 p-5">
              <Gamepad2 className="mb-4 size-5 text-brand-soft" />
              <p className="text-sm leading-6 text-surface-hero-muted">
                {t("subscriptionSummary", {
                  plan: isSubscriptionLoading
                    ? t("loadingMetric")
                    : currentPlanName,
                  periodEnd: formatShortDate(subscription?.currentPeriodEnd),
                })}
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
};
