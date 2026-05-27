import authEn from "./locales/en/auth.json";
import commonEn from "./locales/en/common.json";
import billingEn from "./locales/en/billing.json";
import userEn from "./locales/en/user.json";

export const resources = {
  en: {
    auth: authEn,
    common: commonEn,
    billing: billingEn,
    user: userEn,
  },
} as const;

export type Resources = (typeof resources)["en"];
