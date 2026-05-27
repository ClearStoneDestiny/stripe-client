import type { StripeSubscriptionStatusEnum } from "@billing/enums/stripeSubscriptionStatus";
import type { ICurrentSubscriptionPlanEntity } from "./iCurrentSubscriptionPlanEntity";
import type { ICurrentSubscriptionPriceEntity } from "./iCurrentSubscriptionPriceEntity";

export interface ICurrentSubscriptionItemEntity {
  id: number;
  status: StripeSubscriptionStatusEnum;
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd: boolean;
  canceledAt?: Date;
  trialEnd?: Date;
  plan?: ICurrentSubscriptionPlanEntity;
  price?: ICurrentSubscriptionPriceEntity;
}
