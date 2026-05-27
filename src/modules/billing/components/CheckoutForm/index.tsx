import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import type { PaymentModeEnum } from "@billing/enums/paymentMode";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { APP_ROUTES } from "@config/routes";
import { Button } from "@components/ui/button";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { createLogger } from "@utils/logger";

interface ICheckoutFormProps {
  mode: PaymentModeEnum;
}

const logger = createLogger("modules/billing/components/CheckoutForm");

export const CheckoutForm = ({ mode }: ICheckoutFormProps) => {
  const { t } = useTranslation("billing", { keyPrefix: "CheckoutForm" });

  const { enqueueSnackbar } = useSnackbar();

  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const baseUrl = window.location.origin;
    const returnUrl = `${baseUrl}${APP_ROUTES.BILLING_SUCCESS}`;

    try {
      let result;

      if (mode === "subscription") {
        // For subscriptions - confirmSetup
        result = await stripe.confirmSetup({
          elements,
          confirmParams: {
            return_url: returnUrl,
          },
          redirect: "if_required",
        });
      } else {
        // For one time payments - confirmPayment
        result = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: returnUrl,
          },
          redirect: "if_required",
        });
      }

      if (result.error) {
        setErrorMessage(result.error.message || t("errors.paymentFailed"));
        enqueueSnackbar(result.error.message || t("errors.paymentFailed"), {
          variant: "error",
        });
      } else {
        // Success - navigate to success page
        enqueueSnackbar(t("success"), { variant: "success" });
        window.location.href = returnUrl;
      }
    } catch (error) {
      logger.error("Payment error:", { error });
      setErrorMessage(t("errors.unexpectedError"));
      enqueueSnackbar(t("errors.unexpectedError"), { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border border-border bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">{t("paymentDetails")}</h2>
        <PaymentElement />
      </div>

      {errorMessage && (
        <div className="border border-destructive/40 bg-destructive/15 px-4 py-3 text-sm text-destructive">
          {errorMessage}
        </div>
      )}

      <Button
        type="submit"
        className="w-full bg-brand text-brand-foreground hover:bg-brand-soft"
        size="lg"
        disabled={!stripe || isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" />
            {t("processing")}
          </>
        ) : (
          t("submit")
        )}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        {t("securePayment")}
      </p>
    </form>
  );
};
