import { ProtectedRoute, RedirectLoggedInUser } from "@auth/components";
import { LoginPage } from "@auth/pages";
import { MainLayout } from "@common/layouts";
import { HomePage, LandingPage, NotFoundPage } from "@common/pages";
import { APP_ROUTES } from "@config/routes";
import { Route, Routes } from "react-router";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={APP_ROUTES.LANDING} element={<LandingPage />} />

      <Route
        path={APP_ROUTES.LOGIN}
        element={
          <RedirectLoggedInUser>
            <LoginPage />
          </RedirectLoggedInUser>
        }
      />

      {/* Protected Routes + Main Layout */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path={APP_ROUTES.HOME} element={<HomePage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
