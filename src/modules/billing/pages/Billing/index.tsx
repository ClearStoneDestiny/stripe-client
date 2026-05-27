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
  CurrentSubscriptionBanner,
  HourPacksTab,
} from "@billing/components";
import { useTranslation } from "react-i18next";

export const BillingPage = () => {
  const { t } = useTranslation("billing", { keyPrefix: "BillingPage" });

  const [activeTab, setActiveTab] = useState<BillingTabsType>(
    BillingTabs.SUBSCRIPTIONS,
  );
  const [selectedProvider, setSelectedProvider] =
    useState<PaymentProviderEnum>("checkout");

  return (
    <main className="min-h-dvh bg-surface-frost px-[var(--page-x)] py-[var(--space-12)]">
      <div className="mx-auto max-w-[var(--content-max)]">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold tracking-widest text-brand-deep uppercase">
            {t("eyebrow")}
          </p>
          <h1 className="mt-3 text-[length:var(--text-section)] leading-tight font-semibold">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
            {t("description")}
          </p>
        </div>

        {/* Payment Provider Selector */}
        <div className="mb-8">
          <PaymentProviderSelector
            value={selectedProvider}
            onChange={setSelectedProvider}
          />
        </div>

        {/* Current Subscription Banner */}
        <CurrentSubscriptionBanner />

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as BillingTabsType)}
        >
          <TabsList className="mb-8">
            <TabsTrigger value={BillingTabs.SUBSCRIPTIONS}>
              {t("tabs.subscriptions")}
            </TabsTrigger>
            <TabsTrigger value={BillingTabs.HOUR_PACKS}>
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
