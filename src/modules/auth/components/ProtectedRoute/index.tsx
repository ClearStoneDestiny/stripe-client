import { Navigate, useLocation } from "react-router";
import type { PropsWithChildren } from "react";
import { APP_ROUTES } from "@config/routes";
import { useAuth } from "@auth/hooks/useAuth";
import { FullPageLoader } from "@common/components";

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const { loading, user } = useAuth();

  if (loading) {
    return <FullPageLoader />;
  }

  if (!user) {
    return (
      <Navigate
        to={APP_ROUTES.LOGIN}
        replace
        state={{ from: location }}
      />
    );
  }

  return <>{children}</>;
};
