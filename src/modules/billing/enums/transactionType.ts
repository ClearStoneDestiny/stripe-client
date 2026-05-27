export const TransactionTypeEnum = {
  PURCHASE: "purchase",
  USAGE: "usage",
  REFUND: "refund",
  ADJUSTMENT: "adjustment",
} as const;

export type TransactionTypeEnum =
  (typeof TransactionTypeEnum)[keyof typeof TransactionTypeEnum];
