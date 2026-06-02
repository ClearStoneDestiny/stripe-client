import type { SubscriptionPlanCodeEnum } from "@product/enums/subscriptionPlanCode";
import type { IGamesEntity } from "./iGamesEntity";

export interface IGamesExtendedEntity extends IGamesEntity {
  description?: string;
  requiredPlan?: {
    id: number;
    code: SubscriptionPlanCodeEnum;
    name: string;
    sortOrder: number;
  } | null;
}
