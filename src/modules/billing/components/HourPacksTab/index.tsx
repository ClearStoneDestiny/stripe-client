import { useGetHourPacksQuery } from "@product/api/productApi";
import type { PaymentProviderEnum } from "@billing/enums/paymentProvider";
import { Loader2 } from "lucide-react";
import { HourPackCard } from "../HourPackCard";
import { useTranslation } from "react-i18next";

interface IHourPacksTabProps {
  selectedProvider: PaymentProviderEnum;
}

export const HourPacksTab = ({ selectedProvider }: IHourPacksTabProps) => {
  const { t } = useTranslation("billing", { keyPrefix: "HourPacksTab" });

  const {
    data: packs = [],
    isLoading,
    error,
  } = useGetHourPacksQuery({
    activeOnly: true,
  });

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

  if (packs.length === 0) {
    return (
      <div className="py-20 text-center text-surface-hero-muted">
        {t("empty")}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {packs.map((pack) => (
        <HourPackCard
          key={pack.id}
          pack={pack}
          selectedProvider={selectedProvider}
        />
      ))}
    </div>
  );
};
