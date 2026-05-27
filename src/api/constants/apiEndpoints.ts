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
    HOUR_PACKS: "/catalog/hour-packs",
  },

  BILLING: {
    SESSION: "/billing/sessions",
    BALANCE: "/game-time/balance",
    TRANSACTIONS: "/game-time/transactions",
  },
};
