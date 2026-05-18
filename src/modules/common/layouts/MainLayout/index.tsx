import { Outlet } from "react-router";
import "./index.css";

export const MainLayout = () => {
  return (
    <div className="layoutRoot">
      <div className="contentArea">
        <Outlet />
      </div>
    </div>
  );
};
