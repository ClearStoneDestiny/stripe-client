import type { IStripePriceEntity } from "./iStripePriceEntity";

export interface IHourPackEntity {
  id: number;
  code: string;
  name: string;
  description?: string;
  durationMinutes: number;
  durationHours: number;
  sortOrder: number;
  stripePrice: IStripePriceEntity;
}
