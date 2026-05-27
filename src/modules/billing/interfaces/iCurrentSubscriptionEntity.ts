import type { ICurrentSubscriptionItemEntity } from "./iCurrentSubscriptionItemEntity";

export interface ICurrentSubscriptionEntity {
  hasActiveAccess: boolean;
  subscription?: ICurrentSubscriptionItemEntity;
}
