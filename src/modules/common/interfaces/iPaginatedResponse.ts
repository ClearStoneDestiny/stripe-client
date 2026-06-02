import type { IPaginatedResponseMeta } from "./iPaginatedResponseMeta";

export interface IPaginatedResponse<T> {
  items: T[];
  meta: IPaginatedResponseMeta;
}
