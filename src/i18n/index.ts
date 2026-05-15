import authEn from "./locales/en/auth.json";
import commonEn from "./locales/en/common.json";

export const resources = {
  en: {
    auth: authEn,
    common: commonEn,
  },
} as const;

export type Resources = (typeof resources)["en"];
