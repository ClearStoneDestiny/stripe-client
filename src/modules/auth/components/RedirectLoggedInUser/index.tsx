import { Navigate, useLocation } from "react-router";
import type { PropsWithChildren } from "react";
import { APP_ROUTES } from "@config/routes";
import { FullPageLoader } from "@common/components";
import { useAuth } from "@auth/hooks/useAuth";

interface IRedirectState {
  from?: {
    pathname?: string;
    search?: string;
  };
}

export const RedirectLoggedInUser = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const { loading, user } = useAuth();
  const state = location.state as IRedirectState | null;
  const redirectPath = state?.from?.pathname ?? APP_ROUTES.HOME;
  const redirectSearch = state?.from?.search ?? "";

  if (loading) {
    return <FullPageLoader />;
  }

  if (user) {
    return <Navigate to={`${redirectPath}${redirectSearch}`} replace />;
  }

  return <>{children}</>;
};
