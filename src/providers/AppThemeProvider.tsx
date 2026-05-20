import { useEffect, type ReactNode } from "react";

interface IAppThemeProviderProps {
  children: ReactNode;
}

export const AppThemeProvider = ({ children }: IAppThemeProviderProps) => {
  useEffect(() => {
    const root = document.documentElement;
    const previousTheme = root.dataset.theme;
    const previousColorScheme = root.style.colorScheme;

    root.dataset.theme = "nebula";
    root.style.colorScheme = "dark light";

    return () => {
      if (previousTheme) {
        root.dataset.theme = previousTheme;
      } else {
        delete root.dataset.theme;
      }

      root.style.colorScheme = previousColorScheme;
    };
  }, []);

  return <>{children}</>;
};
