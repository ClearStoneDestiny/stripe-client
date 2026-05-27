export const BillingTabs = {
  SUBSCRIPTIONS: "subscriptions",
  HOUR_PACKS: "hour_packs",
} as const;

export type BillingTabsType = (typeof BillingTabs)[keyof typeof BillingTabs];
