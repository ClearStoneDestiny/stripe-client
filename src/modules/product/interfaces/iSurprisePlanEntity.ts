import type { SubscriptionPlanCodeEnum } from "@product/enums/subscriptionPlanCode";

export interface ISurprisePlanEntity {
  id: number;
  code: SubscriptionPlanCodeEnum;
  name: string;
}
