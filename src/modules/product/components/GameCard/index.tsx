import type { IGamesExtendedEntity } from "@product/interfaces/iGamesExtendedEntity";
import { ImageOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import { resolveProductImageUrl } from "@product/index";

interface IGameCardProps {
  game: IGamesExtendedEntity;
  planLabel?: string;
  onSelect?: (game: IGamesExtendedEntity) => void;
}

export const GameCard = ({ game, planLabel, onSelect }: IGameCardProps) => {
  const { t } = useTranslation("product", { keyPrefix: "GameCard" });
  const imageUrl = resolveProductImageUrl(game.coverImageUrl);

  return (
    <article>
      <button
        type="button"
        className="group block w-full cursor-pointer text-left"
        onClick={() => onSelect?.(game)}
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden border border-white/6 bg-surface-hero">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={game.title}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface-hero to-white/5">
              <ImageOff className="size-10 text-white/15" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        <div className="pt-3">
          {planLabel && (
            <p className="mb-2 inline-flex max-w-full items-center gap-1 border border-brand/25 bg-brand/10 px-2 py-1 text-[10px] font-semibold tracking-widest text-brand-soft uppercase">
              <span className="text-white/45">{t("includedWith")}</span>
              <span className="truncate">{planLabel}</span>
            </p>
          )}
          <h3 className="text-sm leading-snug font-bold text-white transition-colors duration-200 group-hover:text-brand-soft">
            {game.title}
          </h3>
        </div>
      </button>
    </article>
  );
};
