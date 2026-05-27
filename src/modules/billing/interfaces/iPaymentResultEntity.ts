import type { PaymentProviderEnum } from "@billing/enums/paymentProvider";

export interface IPaymentResultEntity {
  type: PaymentProviderEnum;
  url?: string;
  clientSecret?: string;
  sessionId?: string;
  paymentIntentId?: string;
  paymentLinkId?: string;
  subscriptionId?: string;
}
