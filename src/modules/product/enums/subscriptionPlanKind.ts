export const SubscriptionPlanKindEnum = {
  TIERED: "tiered",
  SURPRISE: "surprise",
} as const;

export type SubscriptionPlanKindEnum =
  (typeof SubscriptionPlanKindEnum)[keyof typeof SubscriptionPlanKindEnum];
