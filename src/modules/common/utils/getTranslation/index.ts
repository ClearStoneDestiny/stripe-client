import type { TOptions } from "i18next";
import { getI18n } from "react-i18next";

export const getTranslation =
  (namespace: string) =>
  (key: string, options?: TOptions): string =>
    (getI18n().t as (key: string, options?: TOptions) => string)(
      `${namespace}:${key}`,
      options,
    );
