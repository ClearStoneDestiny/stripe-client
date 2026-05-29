import type { ICurrentSubscriptionItemEntity } from "./iCurrentSubscriptionItemEntity";

export interface ICancelSubscriptionOutput {
  message: string;
  subscription: Pick<
    ICurrentSubscriptionItemEntity,
    "id" | "status" | "cancelAtPeriodEnd" | "currentPeriodEnd"
  >;
}
