import { useGetSubscriptionPlansQuery } from "@product/api/productApi";
import type { PaymentProviderEnum } from "@billing/enums/paymentProvider";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SubscriptionPlanCard } from "../SubscriptionPlanCard";
import { useGetCurrentSubscriptionQuery } from "@billing/api/billingApi";
import type { StripeSubscriptionStatusEnum } from "@billing/enums/stripeSubscriptionStatus";

interface SubscriptionsTabProps {
  selectedProvider: PaymentProviderEnum;
}

export const SubscriptionsTab = ({
  selectedProvider,
}: SubscriptionsTabProps) => {
  const { t } = useTranslation("billing", { keyPrefix: "SubscriptionsTab" });

  const {
    data: plans,
    isLoading,
    error,
  } = useGetSubscriptionPlansQuery({
    activeOnly: true,
  });

  const { data: currentSubscriptionData } = useGetCurrentSubscriptionQuery();

  const currentSubscription = currentSubscriptionData?.subscription;
  const activeStatuses: StripeSubscriptionStatusEnum[] = [
    "active",
    "trialing",
  ];
  const activePlanCode =
    currentSubscription && activeStatuses.includes(currentSubscription.status)
      ? currentSubscription.plan?.code
      : undefined;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-brand-soft" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-destructive/40 bg-destructive/15 px-4 py-3 text-sm text-red-100">
        {t("error")}
      </div>
    );
  }

  if (!plans || plans.length === 0) {
    return (
      <div className="py-20 text-center text-surface-hero-muted">
        {t("empty")}
      </div>
    );
  }

  // Divide on tiered and surprise
  const tieredPlans = plans
    .filter((p) => p.kind === "tiered")
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const surprisePlan = plans.find((p) => p.kind === "surprise");

  return (
    <div className="space-y-10">
      {tieredPlans.length > 0 && (
        <div>
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold tracking-widest text-brand-soft uppercase">
                {t("tieredEyebrow")}
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white">
                {t("tieredTitle")}
              </h3>
            </div>
            <p className="max-w-md text-sm leading-6 text-surface-hero-muted">
              {t("tieredDescription")}
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {tieredPlans.map((plan, index) => {
              const previousPlan = tieredPlans[index - 1];

              return (
                <SubscriptionPlanCard
                  key={plan.id}
                  plan={plan}
                  selectedProvider={selectedProvider}
                  isActive={activePlanCode === plan.code}
                  hasActiveSubscription={Boolean(activePlanCode)}
                  previousGamesCount={previousPlan?.includedGamesCount || 0}
                  previousPlanName={previousPlan?.name}
                />
              );
            })}
          </div>
        </div>
      )}

      {surprisePlan && (
        <div className="grid gap-6 border border-glass-border bg-white/5 p-5 backdrop-blur-xl lg:grid-cols-[minmax(260px,0.42fr)_1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold tracking-widest text-brand-soft uppercase">
              {t("surpriseEyebrow")}
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              {t("surpriseTitle")}
            </h3>
            <p className="mt-3 text-sm leading-6 text-surface-hero-muted">
              {t("surpriseDescription")}
            </p>
          </div>
          <div>
            <SubscriptionPlanCard
              plan={surprisePlan}
              selectedProvider={selectedProvider}
              isActive={activePlanCode === surprisePlan.code}
              hasActiveSubscription={Boolean(activePlanCode)}
              isSurprise
            />
          </div>
        </div>
      )}
    </div>
  );
};
