import { SiteHeader } from "@common/components";
import { Outlet } from "react-router";
import "./index.css";

export const MainLayout = () => {
  return (
    <div className="layoutRoot">
      <SiteHeader />
      <div className="contentArea">
        <Outlet />
      </div>
    </div>
  );
};
