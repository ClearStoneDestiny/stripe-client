import type { PaymentProviderEnum } from "@billing/enums/paymentProvider";
import type { PaymentModeEnum } from "@billing/enums/paymentMode";

export interface ICreateBillingSessionInput {
  provider: PaymentProviderEnum;
  mode: PaymentModeEnum;

  // If selected type is subscription
  subscriptionPlanPriceId?: number;

  // If selected type is payment
  hourPackId?: number;

  successUrl?: string;
  cancelUrl?: string;
}
