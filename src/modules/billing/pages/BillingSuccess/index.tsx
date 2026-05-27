import { useEffect } from "react";
import {
  useGetCurrentSubscriptionQuery,
  useGetUserBalanceQuery,
} from "@billing/api/billingApi";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@components/ui/button";
import { APP_ROUTES } from "@config/routes";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

export const BillingSuccessPage = () => {
  const { t } = useTranslation("billing", { keyPrefix: "BillingSuccessPage" });

  // Refetch the data after successful payment
  const { refetch: refetchSubscription } = useGetCurrentSubscriptionQuery();
  const { refetch: refetchBalance } = useGetUserBalanceQuery();

  useEffect(() => {
    // Small delay for webhook handling
    const timer = setTimeout(() => {
      refetchSubscription();
      refetchBalance();
    }, 2000);

    return () => clearTimeout(timer);
  }, [refetchSubscription, refetchBalance]);

  return (
    <main className="flex min-h-dvh items-center justify-center bg-surface-frost px-[var(--page-x)]">
      <div className="max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-green-100 p-4">
            <CheckCircle2 className="h-16 w-16 text-green-600" />
          </div>
        </div>

        <h1 className="mb-4 text-3xl font-semibold">{t("title")}</h1>
        <p className="mb-8 text-muted-foreground">{t("description")}</p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="bg-brand hover:bg-brand-soft">
            <Link to={APP_ROUTES.HOME}>{t("goToGames")}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to={APP_ROUTES.BILLING}>{t("viewBilling")}</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};
