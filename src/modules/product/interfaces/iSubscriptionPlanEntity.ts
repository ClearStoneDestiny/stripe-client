import type { SubscriptionPlanCodeEnum } from "@product/enums/subscriptionPlanCode";
import type { SubscriptionPlanKindEnum } from "@product/enums/subscriptionPlanKind";
import type { ISubscriptionPlanPriceEntity } from "./iSubscriptionPlanPriceEntity";

export interface ISubscriptionPlanEntity {
  id: number;
  code: SubscriptionPlanCodeEnum;
  name: string;
  description?: string;
  kind: SubscriptionPlanKindEnum;
  sortOrder: number;
  includedGamesCount: number;
  prices: ISubscriptionPlanPriceEntity[];
}
