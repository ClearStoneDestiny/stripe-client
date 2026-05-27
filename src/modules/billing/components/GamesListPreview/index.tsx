import config from "@config/index";
import {
  useGetCurrentSurpriseCollectionQuery,
  useGetProductsListQuery,
} from "@product/api/productApi";
import type { SubscriptionPlanCodeEnum } from "@product/index";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface IGamesListPreviewProps {
  planCode: SubscriptionPlanCodeEnum;
  isSurprise?: boolean;
}

export const GamesListPreview = ({
  planCode,
  isSurprise,
}: IGamesListPreviewProps) => {
  const { t } = useTranslation("billing", {
    keyPrefix: "SubscriptionPlanCard",
  });

  // For surprise take from surprise collection
  const { data: surpriseData, isLoading: surpriseLoading } =
    useGetCurrentSurpriseCollectionQuery(undefined, {
      skip: !isSurprise,
    });

  // For tiered - take games according to the plan code
  const { data: gamesData, isLoading: gamesLoading } = useGetProductsListQuery(
    {
      limit: config.PAGINATION.PRODUCTS_PREVIEW_PAGE_SIZE,
      planCode: planCode,
    },
    {
      skip: isSurprise,
    },
  );

  const isLoading = isSurprise ? surpriseLoading : gamesLoading;

  if (isLoading) {
    return (
      <div className="mb-4 flex items-center justify-center py-4">
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const games = isSurprise
    ? surpriseData?.games.slice(
        0,
        config.PAGINATION.PRODUCTS_PREVIEW_PAGE_SIZE,
      ) || []
    : gamesData?.items || [];

  const totalCount = isSurprise
    ? surpriseData?.games.length || 0
    : gamesData?.total || 0;

  const remainingCount =
    totalCount - config.PAGINATION.PRODUCTS_PREVIEW_PAGE_SIZE;

  if (games.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {t("gamesIncluded")}
      </p>
      <ul className="space-y-1 text-sm text-muted-foreground">
        {games.map((game) => (
          <li key={game.id} className="truncate">
            • {game.title}
          </li>
        ))}
        {remainingCount > 0 && (
          <li className="font-medium text-foreground">
            {t("andMore", { count: remainingCount })}
          </li>
        )}
      </ul>
    </div>
  );
};
