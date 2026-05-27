import { useSnackbar } from "notistack";
import type { PaymentProviderEnum } from "@billing/enums/paymentProvider";
import { useNavigate } from "react-router";
import { useCreateBillingSessionMutation } from "@billing/api/billingApi";
import { useState } from "react";
import { APP_ROUTES } from "@config/routes";
import type { PaymentModeEnum } from "@billing/enums/paymentMode";
import { useTranslation } from "react-i18next";
import { createLogger } from "@utils/logger";

interface IUsePaymentSubscribeParams {
  provider: PaymentProviderEnum;
  subscriptionPlanPriceId: number;
}

interface IUsePaymentPurchaseParams {
  provider: PaymentProviderEnum;
  hourPackId: number;
}

const logger = createLogger("modules/billing/hooks/usePayment");

export const usePayment = () => {
  const { t } = useTranslation("billing", { keyPrefix: "usePayment" });

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [createBillingSession, { isLoading }] =
    useCreateBillingSessionMutation();

  const [loadingId, setLoadingId] = useState<number | null>(null);

  const baseUrl = window.location.origin;
  const successUrl = `${baseUrl}${APP_ROUTES.BILLING_SUCCESS}`;
  const cancelUrl = `${baseUrl}${APP_ROUTES.BILLING_CANCEL}`;

  const handlePayment = async (
    provider: PaymentProviderEnum,
    mode: PaymentModeEnum,
    params: {
      subscriptionPlanPriceId?: number;
      hourPackId?: number;
    },
  ) => {
    const itemId = params.subscriptionPlanPriceId || params.hourPackId;
    setLoadingId(itemId || null);

    try {
      const result = await createBillingSession({
        provider,
        mode,
        ...params,
        successUrl,
        cancelUrl,
      }).unwrap();

      // If checkout or payment_link - redirect to URL
      if (provider === "checkout" || provider === "payment_link") {
        if (result.url) {
          window.location.href = result.url;
        } else {
          throw new Error("No payment URL received");
        }
      }

      // If payment_element - go to the checkout page
      if (provider === "payment_element") {
        if (!result.clientSecret) {
          throw new Error("No client secret received");
        }

        // Passing parameters via URL
        const queryParams = new URLSearchParams({
          mode,
          clientSecret: result.clientSecret,
          ...(params.subscriptionPlanPriceId && {
            priceId: params.subscriptionPlanPriceId.toString(),
          }),
          ...(params.hourPackId && {
            packId: params.hourPackId.toString(),
          }),
        });

        navigate(`${APP_ROUTES.CHECKOUT}?${queryParams.toString()}`);
      }
    } catch (error) {
      logger.error("Payment error:", { error });
      enqueueSnackbar(t("errors.paymentFailed"), { variant: "error" });
    } finally {
      setLoadingId(null);
    }
  };

  const handleSubscribe = (params: IUsePaymentSubscribeParams) => {
    return handlePayment(params.provider, "subscription", {
      subscriptionPlanPriceId: params.subscriptionPlanPriceId,
    });
  };

  const handlePurchase = (params: IUsePaymentPurchaseParams) => {
    return handlePayment(params.provider, "payment", {
      hourPackId: params.hourPackId,
    });
  };

  return {
    handleSubscribe,
    handlePurchase,
    isLoading: isLoading,
    loadingId,
  };
};
