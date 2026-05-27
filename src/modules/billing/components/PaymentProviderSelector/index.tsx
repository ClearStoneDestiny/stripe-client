import { CreditCard } from "lucide-react";
import type { PaymentProviderEnum } from "@billing/enums/paymentProvider";
import { PaymentProviderLabels } from "@billing/constants/paymentProviderLabels";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { useTranslation } from "react-i18next";

interface PaymentProviderSelectorProps {
  value: PaymentProviderEnum;
  onChange: (value: PaymentProviderEnum) => void;
}

export const PaymentProviderSelector = ({
  value,
  onChange,
}: PaymentProviderSelectorProps) => {
  const { t } = useTranslation("billing", {
    keyPrefix: "PaymentProviderSelector",
  });

  return (
    <div className="grid gap-3">
      <div className="flex items-center gap-2 text-sm font-medium text-surface-hero-muted">
        <CreditCard className="h-4 w-4" />
        <span>{t("label")}</span>
      </div>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-12 w-full border border-glass-border bg-black/28 px-3 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-brand/45 hover:bg-black/36 focus-visible:border-brand [&_svg]:text-brand-soft">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="border-glass-border bg-surface-hero text-white">
          {Object.entries(PaymentProviderLabels).map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
