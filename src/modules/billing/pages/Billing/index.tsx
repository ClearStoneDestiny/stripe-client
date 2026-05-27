import { useState } from "react";
import {
  BillingTabs,
  type BillingTabsType,
} from "@billing/constants/billingTabs";
import type { PaymentProviderEnum } from "@billing/enums/paymentProvider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import {
  SubscriptionsTab,
  PaymentProviderSelector,
  HourPacksTab,
} from "@billing/components";
import { useTranslation } from "react-i18next";
import { APP_ROUTES } from "@config/routes";
import { BackButton } from "@common/components";
import { CreditCard, Sparkles, Zap } from "lucide-react";

export const BillingPage = () => {
  const { t } = useTranslation("billing", { keyPrefix: "BillingPage" });

  const [activeTab, setActiveTab] = useState<BillingTabsType>(
    BillingTabs.SUBSCRIPTIONS,
  );
  const [selectedProvider, setSelectedProvider] =
    useState<PaymentProviderEnum>("checkout");

  return (
    <main className="relative min-h-dvh overflow-hidden bg-surface-hero px-[var(--page-x)] py-[var(--space-12)] text-surface-hero-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(122,184,232,0.22),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(74,143,212,0.18),transparent_26%),linear-gradient(145deg,var(--surface-hero)_0%,var(--color-bg-surface)_54%,var(--color-bg-base)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-white/8 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black/45 to-transparent" />

      <div className="relative z-10 mx-auto max-w-[var(--content-max)]">
        <div className="mb-8">
          <BackButton
            to={APP_ROUTES.LANDING}
            label={t("backToHome")}
            className="text-surface-hero-muted hover:bg-white/8 hover:text-white"
          />
        </div>

        <section className="mb-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 border border-glass-border bg-white/6 px-3 py-2 text-xs font-semibold tracking-widest text-brand-soft uppercase backdrop-blur-xl">
              <Sparkles className="size-3.5" />
              {t("eyebrow")}
            </div>
            <h1 className="max-w-4xl text-[length:var(--text-section)] leading-tight font-semibold text-balance sm:text-[clamp(3rem,6vw,6.5rem)]">
              {t("title")}
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-surface-hero-muted sm:text-base">
              {t("description")}
            </p>
          </div>

          <aside className="border border-glass-border bg-white/7 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid size-10 place-items-center bg-brand/18 text-brand-soft">
                <CreditCard className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">
                  {t("checkoutCard.title")}
                </p>
                <p className="text-xs leading-5 text-surface-hero-muted">
                  {t("checkoutCard.description")}
                </p>
              </div>
            </div>

            <PaymentProviderSelector
              value={selectedProvider}
              onChange={setSelectedProvider}
            />

            <div className="mt-5 flex items-center gap-2 border border-brand/25 bg-brand/10 px-3 py-2 text-xs font-semibold text-brand-soft">
              <Zap className="size-3.5" />
              {t("checkoutCard.note")}
            </div>
          </aside>
        </section>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as BillingTabsType)}
          className="gap-8"
        >
          <TabsList className="border border-glass-border bg-black/24 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
            <TabsTrigger
              className="text-surface-hero-muted hover:bg-white/8 hover:text-white data-active:bg-white data-active:text-surface-frost-foreground dark:text-surface-hero-muted dark:hover:text-white dark:data-active:bg-white dark:data-active:text-surface-frost-foreground"
              value={BillingTabs.SUBSCRIPTIONS}
            >
              {t("tabs.subscriptions")}
            </TabsTrigger>
            <TabsTrigger
              className="text-surface-hero-muted hover:bg-white/8 hover:text-white data-active:bg-white data-active:text-surface-frost-foreground dark:text-surface-hero-muted dark:hover:text-white dark:data-active:bg-white dark:data-active:text-surface-frost-foreground"
              value={BillingTabs.HOUR_PACKS}
            >
              {t("tabs.hourPacks")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value={BillingTabs.SUBSCRIPTIONS}>
            <SubscriptionsTab selectedProvider={selectedProvider} />
          </TabsContent>

          <TabsContent value={BillingTabs.HOUR_PACKS}>
            <HourPacksTab selectedProvider={selectedProvider} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};
