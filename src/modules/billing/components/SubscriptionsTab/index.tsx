import { useGetSubscriptionPlansQuery } from "@product/api/productApi";
import type { PaymentProviderEnum } from "@billing/enums/paymentProvider";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SubscriptionPlanCard } from "../SubscriptionPlanCard";

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-brand" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-destructive/40 bg-destructive/15 px-4 py-3 text-sm text-destructive">
        {t("error")}
      </div>
    );
  }

  if (!plans || plans.length === 0) {
    return (
      <div className="py-20 text-center text-muted-foreground">
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
    <div className="space-y-12">
      {/* Tiered Plans */}
      {tieredPlans.length > 0 && (
        <div>
          <h3 className="mb-6 text-xl font-semibold">{t("tieredTitle")}</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {tieredPlans.map((plan) => (
              <SubscriptionPlanCard
                key={plan.id}
                plan={plan}
                selectedProvider={selectedProvider}
              />
            ))}
          </div>
        </div>
      )}

      {/* Surprise Plan */}
      {surprisePlan && (
        <div>
          <h3 className="mb-6 text-xl font-semibold">{t("surpriseTitle")}</h3>
          <div className="max-w-md">
            <SubscriptionPlanCard
              plan={surprisePlan}
              selectedProvider={selectedProvider}
              isSurprise
            />
          </div>
        </div>
      )}
    </div>
  );
};
