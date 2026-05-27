import type { IGamesEntity } from "./iGamesEntity";
import type { ISurprisePlanEntity } from "./iSurprisePlanEntity";

export interface ISurpriseCollectionEntity {
  id: number;
  title: string;
  description?: string;
  periodStart: string;
  periodEnd: string;
  plan: ISurprisePlanEntity;
  games: IGamesEntity[];
}
