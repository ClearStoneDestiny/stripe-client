import type { ISubscriptionPlanEntity } from "@product/index";
import type { PaymentProviderEnum } from "@billing/enums/paymentProvider";
import { useState } from "react";
import { Check, Loader2, Sparkles } from "lucide-react";
import { Button } from "@components/ui/button";
import { PriceSelector } from "../PriceSelector";
import { GamesListPreview } from "../GamesListPreview";
import { useTranslation } from "react-i18next";
import { usePayment } from "@billing/hooks/usePayment";
import { cn } from "@/lib/utils";

interface ISubscriptionPlanCardProps {
  plan: ISubscriptionPlanEntity;
  selectedProvider: PaymentProviderEnum;
  isSurprise?: boolean;
  isActive?: boolean;
  hasActiveSubscription?: boolean;
  previousGamesCount?: number;
  previousPlanName?: string;
  onCancelSubscription?: () => void;
  isCanceling?: boolean;
  isCancelAtPeriodEnd?: boolean;
}

export const SubscriptionPlanCard = ({
  plan,
  selectedProvider,
  isSurprise = false,
  isActive = false,
  hasActiveSubscription = false,
  previousGamesCount = 0,
  previousPlanName,
  onCancelSubscription,
  isCanceling,
  isCancelAtPeriodEnd,
}: ISubscriptionPlanCardProps) => {
  const { t } = useTranslation("billing", {
    keyPrefix: "SubscriptionPlanCard",
  });

  const defaultPrice = plan.prices.find((p) => p.isDefault) || plan.prices[0];
  const [selectedPriceId, setSelectedPriceId] = useState(defaultPrice?.id);

  const { handleSubscribe, isLoading } = usePayment();

  const selectedPrice = plan.prices.find((p) => p.id === selectedPriceId);
  const buttonLabel = isActive
    ? t("active")
    : hasActiveSubscription
      ? t("upgrade")
      : t("subscribe");

  const onSubscribe = () => {
    if (!selectedPriceId || isActive) {
      return;
    }

    handleSubscribe({
      provider: selectedProvider,
      subscriptionPlanPriceId: selectedPriceId,
    });
  };

  return (
    <article
      className={cn(
        "group relative flex min-h-[560px] flex-col overflow-hidden border p-6 transition duration-300",
        "bg-[linear-gradient(180deg,rgba(255,255,255,0.105),rgba(255,255,255,0.045))] backdrop-blur-xl",
        "hover:-translate-y-1 hover:border-brand/45 hover:bg-white/12 hover:shadow-[0_28px_90px_rgba(0,0,0,0.36)]",
        isSurprise ? "border-brand/45" : "border-glass-border",
        isActive &&
          "border-brand-soft bg-[linear-gradient(180deg,rgba(122,184,232,0.22),rgba(255,255,255,0.055))] shadow-[0_0_54px_rgba(122,184,232,0.18)]",
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      <div className="pointer-events-none absolute -top-24 right-0 size-52 rounded-full bg-brand/18 blur-3xl transition-opacity group-hover:opacity-100" />

      <div className="mb-4">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-2xl font-semibold text-white">{plan.name}</h4>
            {isActive && (
              <span className="mt-3 inline-flex items-center gap-1.5 bg-brand-soft px-2.5 py-1 text-xs font-semibold tracking-widest text-surface-frost-foreground uppercase shadow-[0_0_24px_rgba(122,184,232,0.55)]">
                <Check className="size-3.5" />
                {t("currentPlan")}
              </span>
            )}
          </div>
          {isSurprise && (
            <span className="grid size-10 place-items-center border border-brand/35 bg-brand/12 text-brand-soft">
              <Sparkles className="size-5" aria-label="Surprise" />
            </span>
          )}
        </div>

        {plan.description && (
          <p className="mt-4 min-h-12 text-sm leading-6 text-surface-hero-muted">
            {plan.description}
          </p>
        )}
      </div>

      <div className="mb-5 border border-glass-border bg-black/18 px-3 py-2">
        <p className="text-xs font-semibold tracking-widest text-brand-soft uppercase">
          {t("gamesCount", { count: plan.includedGamesCount })}
        </p>
        {previousPlanName && (
          <p className="mt-1 text-xs leading-5 text-surface-hero-muted">
            {t("includesPreviousPlan", { name: previousPlanName })}
          </p>
        )}
      </div>

      <GamesListPreview
        planCode={plan.code}
        includedGamesCount={plan.includedGamesCount}
        previousGamesCount={previousGamesCount}
        isSurprise={isSurprise}
      />

      {plan.prices.length > 1 ? (
        <div className="mb-6">
          <PriceSelector
            prices={plan.prices}
            selectedPriceId={selectedPriceId}
            onChange={setSelectedPriceId}
          />
        </div>
      ) : null}

      {selectedPrice && (
        <div className="mt-auto mb-6">
          <p className="text-4xl font-semibold tracking-tight text-white">
            {(selectedPrice.unitAmount / 100).toFixed(2)}{" "}
            <span className="text-base font-medium text-surface-hero-muted">
              {selectedPrice.currency.toUpperCase()}
            </span>
          </p>
          {selectedPrice.billingInterval && (
            <p className="mt-1 text-sm text-surface-hero-muted">
              {t(`interval.${selectedPrice.billingInterval}`)}
            </p>
          )}
        </div>
      )}

      <Button
        className={cn(
          "w-full",
          isActive
            ? "border-brand-soft bg-brand-soft text-surface-frost-foreground shadow-[0_0_18px_rgba(122,184,232,0.85),0_0_44px_rgba(74,143,212,0.48)] ring-2 ring-brand-soft/50 hover:bg-white"
            : "bg-white text-surface-frost-foreground hover:bg-brand-soft",
        )}
        size="lg"
        onClick={onSubscribe}
        disabled={isLoading || !selectedPriceId}
        aria-disabled={isActive}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" />
            {t("subscribing")}
          </>
        ) : (
          buttonLabel
        )}
      </Button>

      {isActive && !isCancelAtPeriodEnd && (
        <div className="flex justify-center mt-4">
          <button
            type="button"
            onClick={onCancelSubscription}
            disabled={isCanceling}
            className="text-sm text-surface-hero-muted transition hover:text-red-400 disabled:opacity-50"
          >
            {isCanceling ? t("canceling") : t("cancelSubscription")}
          </button>
        </div>
      )}
    </article>
  );
};
