export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    GET_ME: "/auth/me",
    REFRESH: "/auth/token",
    LOGOUT: "/auth/logout",
  },

  PRODUCTS: {
    LIST: "/catalog/games",
    SURPRISE_COLLECTION: "/catalog/surprise/current",
    SUBSCRIPTION_PLANS: "/catalog/subscription-plans",
    HOUR_PACKS: "/catalog/hour-packs",
  },

  BILLING: {
    SESSION: "/stripe/billing/sessions",
    BALANCE: "/game-time/balance",
    TRANSACTIONS: "/game-time/transactions",

    SUBSCRIPTION: {
      CURRENT: "/stripe/billing/subscription/current",
      CANCEL: "/stripe/billing/subscription",
    },
  },
};
