import type { StripeSubscriptionStatusEnum } from "@billing/enums/stripeSubscriptionStatus";
import type { ICurrentSubscriptionPlanEntity } from "./iCurrentSubscriptionPlanEntity";
import type { ICurrentSubscriptionPriceEntity } from "./iCurrentSubscriptionPriceEntity";

export interface ICurrentSubscriptionItemEntity {
  id: number;
  status: StripeSubscriptionStatusEnum;
  currentPeriodStart?: string;
  currentPeriodEnd?: string;
  cancelAtPeriodEnd: boolean;
  canceledAt?: string;
  trialEnd?: string;
  plan?: ICurrentSubscriptionPlanEntity;
  price?: ICurrentSubscriptionPriceEntity;
}
