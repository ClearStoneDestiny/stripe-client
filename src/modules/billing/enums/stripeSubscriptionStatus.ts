export const StripeSubscriptionStatusEnum = {
  INCOMPLETE: "incomplete",
  INCOMPLETE_EXPIRED: "incomplete_expired",
  TRIALING: "trialing",
  ACTIVE: "active",
  PAST_DUE: "past_due",
  CANCELED: "canceled",
  UNPAID: "unpaid",
  PAUSED: "paused",
} as const;

export type StripeSubscriptionStatusEnum =
  (typeof StripeSubscriptionStatusEnum)[keyof typeof StripeSubscriptionStatusEnum];
