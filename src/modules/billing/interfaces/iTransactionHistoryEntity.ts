import type { TransactionTypeEnum } from "@billing/enums/transactionType";

export interface ITransactionHistoryEntity {
  id: number;
  type: TransactionTypeEnum;
  minutes: number;
  hours: number;
  reason?: string;
  createdAt: string;
}
