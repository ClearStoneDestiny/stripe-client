import type { StripePriceIntervalEnum } from "@product/enums/stripePriceInterval";

export interface ISubscriptionPlanPriceEntity {
  id: number;
  label?: string;
  billingInterval?: StripePriceIntervalEnum;
  intervalCount?: number;
  unitAmount: number;
  currency: string;
  isDefault: boolean;
  sortOrder: number;
}
