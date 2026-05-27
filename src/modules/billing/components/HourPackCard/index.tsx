import type { IHourPackEntity } from "@product/index";
import type { PaymentProviderEnum } from "@billing/enums/paymentProvider";
import { Clock, Loader2 } from "lucide-react";
import { Button } from "@components/ui/button";
import { useTranslation } from "react-i18next";
import { usePayment } from "@billing/hooks/usePayment";

interface IHourPackCardProps {
  pack: IHourPackEntity;
  selectedProvider: PaymentProviderEnum;
}

export const HourPackCard = ({
  pack,
  selectedProvider,
}: IHourPackCardProps) => {
  const { t } = useTranslation("billing", { keyPrefix: "HourPackCard" });

  const { handlePurchase, isLoading } = usePayment();

  const onPurchase = () => {
    handlePurchase({
      provider: selectedProvider,
      hourPackId: pack.id,
    });
  };

  const amount = (pack.stripePrice.unitAmount / 100).toFixed(2);
  const currency = pack.stripePrice.currency.toUpperCase();

  return (
    <article className="group relative overflow-hidden border border-glass-border bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] p-6 text-white backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-brand/45 hover:bg-white/12 hover:shadow-[0_28px_90px_rgba(0,0,0,0.36)]">
      <div className="pointer-events-none absolute -top-24 right-0 size-48 rounded-full bg-brand/16 blur-3xl" />
      <div className="mb-4 flex items-start gap-3">
        <div className="bg-brand/15 p-2 text-brand-soft">
          <Clock className="h-6 w-6" />
        </div>
        <div>
          <h4 className="text-xl font-semibold">{pack.name}</h4>
          {pack.description && (
            <p className="mt-1 text-sm leading-6 text-surface-hero-muted">
              {pack.description}
            </p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-4xl font-semibold text-brand-soft">
          {pack.durationHours}
          <span className="ml-1 text-lg text-surface-hero-muted">
            {t("hours")}
          </span>
        </p>
        <p className="mt-1 text-xs text-surface-hero-muted">
          ({pack.durationMinutes} minutes)
        </p>
      </div>

      <div className="mb-6">
        <p className="text-3xl font-semibold">
          {amount}{" "}
          <span className="text-lg text-surface-hero-muted">{currency}</span>
        </p>
      </div>

      <Button
        className="w-full bg-white text-surface-frost-foreground hover:bg-brand-soft"
        size="lg"
        onClick={onPurchase}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" />
            {t("purchasing")}
          </>
        ) : (
          t("buy")
        )}
      </Button>
    </article>
  );
};
