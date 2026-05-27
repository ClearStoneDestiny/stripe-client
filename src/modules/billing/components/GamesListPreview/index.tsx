import config from "@config/index";
import {
  useGetCurrentSurpriseCollectionQuery,
  useGetProductsListQuery,
} from "@product/api/productApi";
import {
  resolveProductImageUrl,
  type IGamesEntity,
  type SubscriptionPlanCodeEnum,
} from "@product/index";
import { Gamepad2, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";

interface IGamesListPreviewProps {
  planCode: SubscriptionPlanCodeEnum;
  includedGamesCount: number;
  previousGamesCount?: number;
  isSurprise?: boolean;
}

export const GamesListPreview = ({
  planCode,
  includedGamesCount,
  previousGamesCount = 0,
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

  const previewSize = config.PAGINATION.PRODUCTS_PREVIEW_PAGE_SIZE;

  // For tiered - load the plan library and display only games added after the previous tier.
  const { data: gamesData, isLoading: gamesLoading } = useGetProductsListQuery(
    {
      limit: Math.max(includedGamesCount, previewSize),
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
    ? surpriseData?.games.slice(0, previewSize) || []
    : gamesData?.items.slice(
        previousGamesCount,
        previousGamesCount + previewSize,
      ) || [];

  const totalCount = isSurprise
    ? surpriseData?.games.length || 0
    : Math.max(
        (gamesData?.total || includedGamesCount) - previousGamesCount,
        0,
      );

  const remainingCount = Math.max(totalCount - previewSize, 0);

  if (games.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <p className="mb-3 text-xs font-semibold tracking-widest text-surface-hero-muted uppercase">
        {t("gamesIncluded")}
      </p>

      <TooltipProvider>
        <div className="flex items-center gap-2">
          {games.slice(0, 3).map((game, index) => (
            <GameAvatar game={game} index={index} key={game.id} />
          ))}

          {remainingCount > 0 && (
            <span className="grid size-14 place-items-center rounded-md border border-glass-border bg-white text-xs font-semibold text-surface-frost-foreground shadow-[0_10px_24px_rgba(0,0,0,0.28)]">
              +{remainingCount}
            </span>
          )}
        </div>
      </TooltipProvider>

      <div className="mt-4 flex flex-wrap gap-x-2 gap-y-1 text-sm leading-6 text-surface-hero-muted">
        {games.slice(0, 3).map((game, index) => (
          <span className="max-w-full truncate" key={game.id}>
            {game.title}
            {index < games.slice(0, 3).length - 1 || remainingCount > 0
              ? ","
              : ""}
          </span>
        ))}
        {remainingCount > 0 && (
          <span className="font-medium text-brand-soft">
            {t("andMore", { count: remainingCount })}
          </span>
        )}
      </div>
    </div>
  );
};

interface IGameAvatarProps {
  game: IGamesEntity;
  index: number;
}

const GameAvatar = ({ game, index }: IGameAvatarProps) => {
  const imageUrl = resolveProductImageUrl(game.coverImageUrl);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          className="relative grid size-14 place-items-center overflow-hidden rounded-md border border-glass-border bg-surface-hero text-brand-soft shadow-[0_10px_24px_rgba(0,0,0,0.28)]"
          style={{ zIndex: 10 - index }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={game.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <Gamepad2 className="size-5" />
          )}
        </span>
      </TooltipTrigger>
      <TooltipContent sideOffset={8}>
        <span>{game.title}</span>
      </TooltipContent>
    </Tooltip>
  );
};
