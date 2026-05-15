import type { FC, ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@i18n/config";

interface IProps {
  children: ReactNode;
}

export const I18nProvider: FC<IProps> = ({ children }) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
