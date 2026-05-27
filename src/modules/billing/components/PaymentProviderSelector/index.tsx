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
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-sm font-medium">
        <CreditCard className="h-4 w-4" />
        <span>{t("label")}</span>
      </div>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[240px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
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
