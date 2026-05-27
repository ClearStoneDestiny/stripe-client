import { Button } from "@components/ui/button";
import { APP_ROUTES } from "@config/routes";
import { XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export const BillingCancelPage = () => {
  const { t } = useTranslation("billing", { keyPrefix: "BillingCancelPage" });

  return (
    <main className="flex min-h-dvh items-center justify-center bg-surface-frost px-[var(--page-x)]">
      <div className="max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-yellow-100 p-4">
            <XCircle className="h-16 w-16 text-yellow-600" />
          </div>
        </div>

        <h1 className="mb-4 text-3xl font-semibold">{t("title")}</h1>
        <p className="mb-8 text-muted-foreground">{t("description")}</p>

        <Button asChild size="lg" className="bg-brand hover:bg-brand-soft">
          <Link to={APP_ROUTES.BILLING}>{t("tryAgain")}</Link>
        </Button>
      </div>
    </main>
  );
};
