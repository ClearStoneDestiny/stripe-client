import { getTranslation } from "@common/index";

const t = getTranslation("product");

export const PLAN_OPTIONS = [
  { value: "all", label: t("CatalogPage.filters.allPlans") },
  { value: "start", label: t("CatalogPage.filters.start") },
  { value: "medium", label: t("CatalogPage.filters.medium") },
  { value: "pro", label: t("CatalogPage.filters.pro") },
];
