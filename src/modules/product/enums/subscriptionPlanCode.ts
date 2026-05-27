export const SubscriptionPlanCodeEnum = {
  START: "start",
  MEDIUM: "medium",
  PRO: "pro",
  SURPRISE: "surprise",
} as const;

export type SubscriptionPlanCodeEnum =
  (typeof SubscriptionPlanCodeEnum)[keyof typeof SubscriptionPlanCodeEnum];
