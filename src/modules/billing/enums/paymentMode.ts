export const PaymentModeEnum = {
  SUBSCRIPTION: "subscription",
  PAYMENT: "payment",
} as const;

export type PaymentModeEnum =
  (typeof PaymentModeEnum)[keyof typeof PaymentModeEnum];
