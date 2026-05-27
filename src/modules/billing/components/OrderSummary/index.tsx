import { useGetHourPacksQuery, useGetSubscriptionPlansQuery } from "@product/api/productApi";
import type { PaymentModeEnum } from "@billing/enums/paymentMode";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface IOrderSummaryProps {
  mode: PaymentModeEnum;
  priceId?: number;
  packId?: number;
}

export const OrderSummary = ({ mode, priceId, packId }: IOrderSummaryProps) => {
  const { t } = useTranslation("billing", { keyPrefix: "OrderSummary" });

  const { data: plans, isLoading: plansLoading } = useGetSubscriptionPlansQuery(
    { activeOnly: true },
    { skip: mode !== "subscription" || !priceId },
  );

  const { data: packs, isLoading: packsLoading } = useGetHourPacksQuery(
    { activeOnly: true },
    { skip: mode !== "payment" || !packId },
  );

  const isLoading = mode === "subscription" ? plansLoading : packsLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center border border-border bg-white p-6">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  let item: {
    name: string;
    price: number;
    currency: string;
    description?: string;
  } | null = null;

  if (mode === "subscription" && priceId && plans) {
    for (const plan of plans) {
      const price = plan.prices.find((p) => p.id === priceId);
      if (price) {
        item = {
          name: plan.name,
          price: price.unitAmount / 100,
          currency: price.currency.toUpperCase(),
          description: plan.description,
        };
        break;
      }
    }
  }

  if (mode === "payment" && packId && packs) {
    const packsArray = Array.isArray(packs) ? packs : [packs];
    const pack = packsArray.find((p) => p.id === packId);
    if (pack) {
      item = {
        name: pack.name,
        price: pack.stripePrice.unitAmount / 100,
        currency: pack.stripePrice.currency.toUpperCase(),
        description: pack.description,
      };
    }
  }

  if (!item) {
    return (
      <div className="border border-border bg-white p-6 text-center text-muted-foreground">
        {t("notFound")}
      </div>
    );
  }

  return (
    <div className="sticky top-4 border border-border bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold">{t("title")}</h2>

      <div className="space-y-4">
        <div>
          <p className="font-semibold">{item.name}</p>
          {item.description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {item.description}
            </p>
          )}
        </div>

        <div className="border-t border-border pt-4">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-muted-foreground">{t("total")}</span>
            <span className="text-2xl font-bold">
              {item.price.toFixed(2)} {item.currency}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
