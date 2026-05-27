import type { StripePriceIntervalEnum } from "@product/index";

export interface ICurrentSubscriptionPriceEntity {
  id: number;
  unitAmount: number;
  currency: string;
  interval?: StripePriceIntervalEnum;
  intervalCount?: number;
}
