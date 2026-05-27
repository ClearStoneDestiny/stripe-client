import type { ISubscriptionPlanEntity } from "@product/index";
import type { PaymentProviderEnum } from "@billing/enums/paymentProvider";
import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@components/ui/button";
import { PriceSelector } from "../PriceSelector";
import { GamesListPreview } from "../GamesListPreview";
import { useTranslation } from "react-i18next";
import { usePayment } from "@billing/hooks/usePayment";

interface ISubscriptionPlanCardProps {
  plan: ISubscriptionPlanEntity;
  selectedProvider: PaymentProviderEnum;
  isSurprise?: boolean;
}

export const SubscriptionPlanCard = ({
  plan,
  selectedProvider,
  isSurprise = false,
}: ISubscriptionPlanCardProps) => {
  const { t } = useTranslation("billing", {
    keyPrefix: "SubscriptionPlanCard",
  });

  const defaultPrice = plan.prices.find((p) => p.isDefault) || plan.prices[0];
  const [selectedPriceId, setSelectedPriceId] = useState(defaultPrice?.id);

  const { handleSubscribe, isLoading } = usePayment();

  const selectedPrice = plan.prices.find((p) => p.id === selectedPriceId);

  const onSubscribe = () => {
    if (!selectedPriceId) return;
    handleSubscribe({
      provider: selectedProvider,
      subscriptionPlanPriceId: selectedPriceId,
    });
  };

  return (
    <article
      className={`border bg-white p-6 transition-shadow hover:shadow-lg ${
        isSurprise ? "border-brand-soft shadow-md" : "border-border"
      }`}
    >
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between">
          <h4 className="text-xl font-semibold">{plan.name}</h4>
          {isSurprise && (
            <Sparkles className="h-5 w-5 text-brand" aria-label="Surprise" />
          )}
        </div>

        {plan.description && (
          <p className="mt-2 text-sm text-muted-foreground">
            {plan.description}
          </p>
        )}
      </div>

      {/* Games Count */}
      <div className="mb-4">
        <p className="text-sm font-medium text-muted-foreground">
          {t("gamesCount", { count: plan.includedGamesCount })}
        </p>
      </div>

      {/* Games Preview */}
      <GamesListPreview planCode={plan.code} isSurprise={isSurprise} />

      {/* Price Selector */}
      {plan.prices.length > 1 ? (
        <div className="mb-6">
          <PriceSelector
            prices={plan.prices}
            selectedPriceId={selectedPriceId}
            onChange={setSelectedPriceId}
          />
        </div>
      ) : null}

      {/* Selected Price Display */}
      {selectedPrice && (
        <div className="mb-6">
          <p className="text-3xl font-bold">
            {(selectedPrice.unitAmount / 100).toFixed(2)}{" "}
            <span className="text-lg text-muted-foreground">
              {selectedPrice.currency.toUpperCase()}
            </span>
          </p>
          {selectedPrice.billingInterval && (
            <p className="text-sm text-muted-foreground">
              {t(`interval.${selectedPrice.billingInterval}`)}
            </p>
          )}
        </div>
      )}

      {/* Subscribe Button */}
      <Button
        className="w-full"
        size="lg"
        onClick={onSubscribe}
        disabled={isLoading || !selectedPriceId}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" />
            {t("subscribing")}
          </>
        ) : (
          t("subscribe")
        )}
      </Button>
    </article>
  );
};
