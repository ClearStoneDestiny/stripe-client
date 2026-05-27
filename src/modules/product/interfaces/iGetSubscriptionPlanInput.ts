import type { SubscriptionPlanKindEnum } from "@product/enums/subscriptionPlanKind";

export interface IGetSubscriptionPlanInput {
  activeOnly?: boolean;
  kind?: SubscriptionPlanKindEnum;
}
