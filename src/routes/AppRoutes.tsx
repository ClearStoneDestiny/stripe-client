// import { ProtectedRoute, RedirectLoggedInUser } from "@auth/components";
// import { MainLayout } from "@common/layouts";
// import { HomePage, NotFoundPage } from "@common/pages";
import { LoginPage } from "@auth/pages";
import { NotFoundPage } from "@common/pages";
import { APP_ROUTES } from "@config/routes";
import { Route, Routes } from "react-router";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path={APP_ROUTES.LOGIN}
        element={
          // <RedirectLoggedInUser>
          //</RedirectLoggedInUser>
          <LoginPage />
        }
      />

      {/* Protected Routes + Main Layout */}
      <Route
      // element={
      //   <ProtectedRoute>
      //     <ViewModeRouter />
      //   </ProtectedRoute>
      // }
      >
        <Route
        // element={
        //   <ProtectedRoute>
        //     <MainLayout />
        //   </ProtectedRoute>
        // }
        ></Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
