export const APP_ROUTES = {
  LANDING: "/",
  LOGIN: "/login",
  HOME: "/home",
  BILLING: "/billing",
  CHECKOUT: "/checkout",
  BILLING_SUCCESS: "/billing/success",
  BILLING_CANCEL: "/billing/cancel",
  PROFILE: "/profile",
  CATALOG: "/catalog",
} as const;

export const ROUTES_WITHOUT_HEADER = [
  APP_ROUTES.BILLING,
  APP_ROUTES.CHECKOUT,
  APP_ROUTES.BILLING_SUCCESS,
  APP_ROUTES.BILLING_CANCEL,
] as const;
