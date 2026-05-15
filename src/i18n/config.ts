import { env } from "@config/env";
import { resources } from "@i18n/index";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const defaultNS = "common";
export const supportedLngs = ["en"] as const;
export const defaultLng = "en";

export type SupportedLng = (typeof supportedLngs)[number];

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLng,
  fallbackLng: defaultLng,
  defaultNS,
  supportedLngs: [...supportedLngs],
  interpolation: {
    escapeValue: false,
  },
  debug: env.isDev,
});

export default i18n;
