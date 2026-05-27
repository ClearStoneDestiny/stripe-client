import { ROUTES_WITHOUT_HEADER } from "@config/routes";
import { useLocation } from "react-router";

export const useShowHeader = (): boolean => {
  const location = useLocation();

  const exactMatch = ROUTES_WITHOUT_HEADER.includes(
    location.pathname as (typeof ROUTES_WITHOUT_HEADER)[number],
  );

  return !exactMatch;
};
