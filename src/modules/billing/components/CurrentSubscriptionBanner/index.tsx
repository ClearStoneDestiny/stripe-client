import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import type { StripeSubscriptionStatusEnum } from "@billing/enums/stripeSubscriptionStatus";
import { useGetCurrentSubscriptionQuery } from "@billing/api/billingApi";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

const statusIcons: Record<StripeSubscriptionStatusEnum, React.ReactNode> = {
  active: <CheckCircle2 className="h-5 w-5 text-green-600" />,
  trialing: <CheckCircle2 className="h-5 w-5 text-blue-600" />,
  past_due: <AlertCircle className="h-5 w-5 text-yellow-600" />,
  canceled: <XCircle className="h-5 w-5 text-red-600" />,
  paused: <AlertCircle className="h-5 w-5 text-gray-600" />,
  incomplete: <AlertCircle className="h-5 w-5 text-yellow-600" />,
  incomplete_expired: <XCircle className="h-5 w-5 text-red-600" />,
  unpaid: <AlertCircle className="h-5 w-5 text-red-600" />,
};

export const CurrentSubscriptionBanner = () => {
  const { t } = useTranslation("billing", {
    keyPrefix: "CurrentSubscriptionBanner",
  });

  const { data, isLoading } = useGetCurrentSubscriptionQuery();

  if (isLoading || !data?.subscription) {
    return null;
  }

  const { subscription } = data;
  const statusKey = subscription.status;
  const statusLabel = t(`statuses.${statusKey}`);

  return (
    <div className="mb-8 border border-border bg-white p-6">
      <div className="flex items-start gap-4">
        <div className="mt-0.5">{statusIcons[statusKey]}</div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold">{t("title")}</h3>

          <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
            {subscription.plan && (
              <p>{t("plan", { name: subscription.plan.name })}</p>
            )}

            <p>{t("status", { status: statusLabel })}</p>

            {subscription.currentPeriodEnd && (
              <p>
                {t("period", {
                  date: format(new Date(subscription.currentPeriodEnd), "PPP"),
                })}
              </p>
            )}

            {subscription.price && (
              <p className="font-semibold text-foreground">
                {(subscription.price.unitAmount / 100).toFixed(2)}{" "}
                {subscription.price.currency.toUpperCase()}
                {subscription.price.interval && (
                  <span className="text-muted-foreground">
                    {t(`interval.${subscription.price.interval}`, {
                      ns: "billing",
                      keyPrefix: "SubscriptionPlanCard",
                    })}
                  </span>
                )}
              </p>
            )}
          </div>

          {subscription.cancelAtPeriodEnd && (
            <div className="mt-4 border-l-4 border-yellow-500 bg-yellow-50 px-4 py-2 text-sm text-yellow-800">
              {t("canceledNotice")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
