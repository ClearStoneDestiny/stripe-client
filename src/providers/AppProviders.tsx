// @refresh reset
import type { ReactNode } from "react";
import { store } from "@store/store";
import { BrowserRouter } from "react-router";
import { Provider as ReduxProvider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { I18nProvider } from "@providers/I18nProvider";
import { ErrorFallback } from "@common/components";
import { ErrorBoundary } from "react-error-boundary";
import { createLogger } from "@utils/logger";

interface IAppProvidersProps {
  children: ReactNode;
}

const logger = createLogger("src/providers/AppProviders");

export const AppProviders = ({ children }: IAppProvidersProps) => {
  const handleError = (
    error: unknown,
    info: { componentStack?: string | null },
  ) => {
    logger.error("App Error:", { error });
    logger.error("Component Stack:", {
      context: { info: info.componentStack },
    });
  };

  return (
    // Error boundary
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={handleError}>
      {/* Redux */}
      <ReduxProvider store={store}>
        {/* Locales */}
        <I18nProvider>
          {/* Router */}
          <BrowserRouter>
            {/* UI and notification */}
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {children}
            </SnackbarProvider>
          </BrowserRouter>
        </I18nProvider>
      </ReduxProvider>
    </ErrorBoundary>
  );
};
