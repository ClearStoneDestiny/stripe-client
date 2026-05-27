export const PaymentProviderEnum = {
  CHECKOUT: "checkout",
  PAYMENT_ELEMENT: "payment_element",
  PAYMENT_LINK: "payment_link",
} as const;

export type PaymentProviderEnum =
  (typeof PaymentProviderEnum)[keyof typeof PaymentProviderEnum];
