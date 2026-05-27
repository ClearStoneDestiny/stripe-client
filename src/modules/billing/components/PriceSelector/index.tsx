import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import type { ISubscriptionPlanPriceEntity } from "@product/index";
import { useTranslation } from "react-i18next";

interface IPriceSelectorProps {
  prices: ISubscriptionPlanPriceEntity[];
  selectedPriceId?: number;
  onChange: (priceId: number) => void;
}

export const PriceSelector = ({
  prices,
  selectedPriceId,
  onChange,
}: IPriceSelectorProps) => {
  const { t } = useTranslation("billing", {
    keyPrefix: "SubscriptionPlanCard",
  });

  const sortedPrices = [...prices].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div>
      <label className="mb-2 block text-xs font-semibold tracking-widest text-surface-hero-muted uppercase">
        {t("selectPrice")}
      </label>
      <Select
        value={selectedPriceId?.toString()}
        onValueChange={(value) => onChange(Number(value))}
      >
        <SelectTrigger className="h-11 w-full border border-glass-border bg-black/24 px-3 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] hover:border-brand/45 hover:bg-black/34 focus-visible:border-brand [&_svg]:text-brand-soft">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="border-glass-border bg-surface-hero text-white">
          {sortedPrices.map((price) => {
            const label =
              price.label ||
              (price.billingInterval
                ? `${price.intervalCount || 1} ${price.billingInterval}${(price.intervalCount || 1) > 1 ? "s" : ""}`
                : "One-time");

            const amount = (price.unitAmount / 100).toFixed(2);
            const currency = price.currency.toUpperCase();

            return (
              <SelectItem key={price.id} value={price.id.toString()}>
                {label} - {amount} {currency}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};
