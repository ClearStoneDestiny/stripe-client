export const StripePriceIntervalEnum = {
  DAY: "day",
  WEEK: "week",
  MONTH: "month",
  YEAR: "year",
} as const;

export type StripePriceIntervalEnum =
  (typeof StripePriceIntervalEnum)[keyof typeof StripePriceIntervalEnum];
