import { useNavigate, useSearchParams } from "react-router";
import type { PaymentModeEnum } from "@billing/enums/paymentMode";
import { useEffect } from "react";
import { APP_ROUTES } from "@config/routes";
import { Loader2 } from "lucide-react";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@config/stripe";
import { useTranslation } from "react-i18next";
import { CheckoutForm, OrderSummary } from "@billing/components";

export const CheckoutPage = () => {
  const { t } = useTranslation("billing", { keyPrefix: "CheckoutPage" });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const mode = searchParams.get("mode") as PaymentModeEnum | null;
  const clientSecret = searchParams.get("clientSecret");
  const priceId = searchParams.get("priceId");
  const packId = searchParams.get("packId");

  useEffect(() => {
    // Parameters validation
    if (!mode || !clientSecret || (!priceId && !packId)) {
      navigate(APP_ROUTES.BILLING, { replace: true });
    }
  }, [mode, clientSecret, priceId, packId, navigate]);

  if (!clientSecret) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand" />
      </div>
    );
  }

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe" as const,
      variables: {
        colorPrimary: "hsl(var(--brand))",
        colorBackground: "#ffffff",
        colorText: "hsl(var(--foreground))",
        colorDanger: "hsl(var(--destructive))",
        fontFamily: "inherit",
        borderRadius: "0.375rem",
      },
    },
  };

  return (
    <main className="min-h-dvh bg-surface-frost px-[var(--page-x)] py-[var(--space-12)]">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold">{t("title")}</h1>
          <p className="mt-2 text-muted-foreground">{t("description")}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Order Summary */}
          <div className="order-2 lg:order-1">
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm mode={mode!} />
            </Elements>
          </div>

          {/* Order Details */}
          <div className="order-1 lg:order-2">
            <OrderSummary
              mode={mode!}
              priceId={priceId ? Number(priceId) : undefined}
              packId={packId ? Number(packId) : undefined}
            />
          </div>
        </div>
      </div>
    </main>
  );
};
