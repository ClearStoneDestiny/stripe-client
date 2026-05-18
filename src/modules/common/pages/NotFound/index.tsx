import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Button } from "@components/ui/button";
import { APP_ROUTES } from "@config/routes";
import { SearchX } from "lucide-react";

export const NotFoundPage = () => {
  const { t } = useTranslation("common", { keyPrefix: "NotFoundPage" });
  const navigate = useNavigate();

  return (
    <div className="container flex min-h-dvh items-center justify-center py-10">
      <div className="flex w-full max-w-md flex-col items-center gap-6 text-center">
        <SearchX className="size-32 text-muted-foreground" />

        <div className="space-y-2">
          <h1 className="text-8xl font-bold tracking-tight">404</h1>

          <h2 className="text-2xl font-semibold text-muted-foreground">
            {t("title")}
          </h2>

          <p className="text-muted-foreground">{t("description")}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button variant="outline" onClick={() => navigate(-1)}>
            {t("goBack")}
          </Button>

          <Button onClick={() => navigate(APP_ROUTES.LANDING)}>
            {t("goHome")}
          </Button>
        </div>
      </div>
    </div>
  );
};
