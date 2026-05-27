import type {
  SubscriptionPlanCodeEnum,
  SubscriptionPlanKindEnum,
} from "@product/index";

export interface ICurrentSubscriptionPlanEntity {
  id: number;
  code: SubscriptionPlanCodeEnum;
  name: string;
  kind: SubscriptionPlanKindEnum;
  sortOrder: number;
}
