import authEn from "./locales/en/auth.json";
import commonEn from "./locales/en/common.json";
import billingEn from "./locales/en/billing.json";

export const resources = {
  en: {
    auth: authEn,
    common: commonEn,
    billing: billingEn,
  },
} as const;

export type Resources = (typeof resources)["en"];
