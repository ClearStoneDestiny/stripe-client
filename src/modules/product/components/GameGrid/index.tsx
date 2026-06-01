import { Skeleton } from "@components/ui/skeleton";
import type { IGamesExtendedEntity } from "@product/interfaces/iGamesExtendedEntity";
import { GameCard } from "../GameCard";
import { useTranslation } from "react-i18next";

const PLAN_LABELS: Record<string, string> = {
  start: "Start",
  medium: "Medium",
  pro: "Pro",
};

interface GameGridProps {
  games: IGamesExtendedEntity[];
  isLoading?: boolean;
  planCode?: string;
  onSelectGame?: (game: IGamesExtendedEntity) => void;
}

const SKELETON_COUNT = 12;

export const GameGrid = ({
  games,
  isLoading,
  planCode,
  onSelectGame,
}: GameGridProps) => {
  const { t } = useTranslation("product", { keyPrefix: "GameGrid" });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-[3/4] w-full border border-white/4 bg-white/5" />
            <Skeleton className="h-3 w-3/4 bg-white/5" />
            <Skeleton className="h-4 w-full bg-white/5" />
          </div>
        ))}
      </div>
    );
  }

  if (!games.length) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center border border-white/6 bg-white/3 text-center">
        <p className="text-lg font-semibold text-white">{t("notFound")}</p>
        <p className="mt-2 text-sm text-surface-hero-muted">
          {t("adjustFilters")}
        </p>
      </div>
    );
  }

  const planLabel = planCode ? (PLAN_LABELS[planCode] ?? planCode) : undefined;

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
      {games.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          planLabel={game.requiredPlan?.name || planLabel}
          onSelect={onSelectGame}
        />
      ))}
    </div>
  );
};
