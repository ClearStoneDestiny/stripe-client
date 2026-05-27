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
    <article className="border border-border bg-white p-6 transition-shadow hover:shadow-lg">
      {/* Header */}
      <div className="mb-4 flex items-start gap-3">
        <div className="rounded-lg bg-brand/10 p-2">
          <Clock className="h-6 w-6 text-brand" />
        </div>
        <div>
          <h4 className="text-xl font-semibold">{pack.name}</h4>
          {pack.description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {pack.description}
            </p>
          )}
        </div>
      </div>

      {/* Hours Display */}
      <div className="mb-6">
        <p className="text-4xl font-bold text-brand">
          {pack.durationHours}
          <span className="ml-1 text-lg text-muted-foreground">
            {t("hours", { count: pack.durationHours })}
          </span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          ({pack.durationMinutes} minutes)
        </p>
      </div>

      {/* Price */}
      <div className="mb-6">
        <p className="text-3xl font-bold">
          {amount}{" "}
          <span className="text-lg text-muted-foreground">{currency}</span>
        </p>
      </div>

      {/* Buy Button */}
      <Button
        className="w-full"
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
