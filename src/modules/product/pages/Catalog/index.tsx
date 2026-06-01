import { useState } from "react";
import { useGetProductsListQuery } from "@product/api/productApi";
import config from "@config/index";
import { Gamepad2, ImageOff, Search, SlidersHorizontal } from "lucide-react";
import { BackButton } from "@common/components";
import { APP_ROUTES } from "@config/routes";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { CatalogPagination, GameGrid } from "@product/components";
import { useTranslation } from "react-i18next";
import { PLAN_OPTIONS } from "@product/constants/planOptions";
import type { IGamesExtendedEntity } from "../../interfaces/iGamesExtendedEntity";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import { Link } from "react-router";
import { resolveProductImageUrl } from "@product/index";

export const CatalogPage = () => {
  const { t } = useTranslation("product", { keyPrefix: "CatalogPage" });

  const [page, setPage] = useState(1);
  const [planCode, setPlanCode] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selectedGame, setSelectedGame] = useState<IGamesExtendedEntity | null>(
    null,
  );

  const { data, isLoading, isFetching } = useGetProductsListQuery({
    extended: true,
    page,
    limit: config.PAGINATION.PRODUCTS_PAGE_SIZE,
    planCode: planCode === "all" ? undefined : planCode,
    search: search.trim() || undefined,
  });

  const games = (data?.items ?? []) as IGamesExtendedEntity[];
  const gamesFoundCount = data?.total ?? 0;
  const selectedGameImage = resolveProductImageUrl(
    selectedGame?.coverImageUrl,
  );

  const totalPages = data
    ? Math.ceil(data.total / config.PAGINATION.PRODUCTS_PAGE_SIZE)
    : 0;

  const handlePlanChange = (value: string) => {
    setPlanCode(value);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative min-h-dvh overflow-hidden bg-surface-hero px-[var(--page-x)] pt-[calc(var(--header-height)+var(--space-12))] pb-[var(--space-12)] text-surface-hero-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(122,184,232,0.22),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(74,143,212,0.18),transparent_26%),linear-gradient(145deg,var(--surface-hero)_0%,var(--color-bg-surface)_54%,var(--color-bg-base)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-white/8 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black/45 to-transparent" />

      <div className="relative z-10 mx-auto max-w-[var(--content-max)]">
        <div className="mb-8">
          <BackButton
            to={APP_ROUTES.HOME}
            label={t("backToHome")}
            className="text-surface-hero-muted hover:bg-white/8 hover:text-white"
          />
        </div>

        <section className="mb-10">
          <div className="mb-5 inline-flex items-center gap-2 border border-glass-border bg-white/6 px-3 py-2 text-xs font-semibold tracking-widest text-brand-soft uppercase backdrop-blur-xl">
            <Gamepad2 className="size-3.5" />
            {t("eyebrow")}
          </div>
          <h1 className="max-w-4xl text-[length:var(--text-section)] leading-tight font-semibold text-balance sm:text-[clamp(2.5rem,5vw,5.5rem)]">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-surface-hero-muted sm:text-base">
            {t("description")}
          </p>
        </section>

        <div className="mb-8 grid gap-4 border border-glass-border bg-white/5 p-4 backdrop-blur-xl lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="grid gap-3">
            <div className="relative w-full">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/45" />
              <Input
                placeholder={t("searchPlaceholder")}
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="h-12 w-full border border-glass-border bg-black/24 pl-10 text-white placeholder:text-white/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] hover:border-brand/35 focus-visible:border-brand focus-visible:ring-brand/20"
              />
            </div>

            <p className="text-sm text-white/70">
              {t("gamesFound", { count: gamesFoundCount })}
            </p>
          </div>

          <div className="grid gap-2">
            <div className="flex items-center gap-2 text-sm font-medium text-white/70">
              <SlidersHorizontal className="size-4 text-brand-soft" />
              <span>{t("filters.label")}</span>
            </div>
            <Select value={planCode} onValueChange={handlePlanChange}>
              <SelectTrigger className="h-12 w-full border border-glass-border bg-black/28 px-3 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-brand/45 hover:bg-black/36 focus-visible:border-brand [&_svg]:text-brand-soft">
                <SelectValue />
              </SelectTrigger>
              <SelectContent
                align="end"
                className="min-w-[var(--radix-select-trigger-width)] border-glass-border bg-surface-hero text-white"
                position="popper"
              >
                {PLAN_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <GameGrid
          games={games}
          isLoading={isLoading || isFetching}
          planCode={planCode === "all" ? undefined : planCode}
          onSelectGame={setSelectedGame}
        />

        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <CatalogPagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      <Dialog
        open={Boolean(selectedGame)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedGame(null);
          }
        }}
      >
        <DialogContent className="max-h-[90dvh] max-w-4xl overflow-y-auto p-0">
          {selectedGame && (
            <div className="grid md:grid-cols-[minmax(260px,0.42fr)_1fr]">
              <div className="relative aspect-[16/11] bg-black md:aspect-auto">
                {selectedGameImage ? (
                  <img
                    src={selectedGameImage}
                    alt={selectedGame.title}
                    className="h-full min-h-72 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full min-h-72 items-center justify-center bg-surface-hero">
                    <ImageOff className="size-12 text-white/20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              <div className="p-6 sm:p-8">
                <DialogHeader>
                  {selectedGame.requiredPlan && (
                    <span className="mb-3 inline-flex w-fit border border-brand/30 bg-brand/12 px-2.5 py-1 text-[10px] font-semibold tracking-widest text-brand-soft uppercase">
                      {t("includedIn")} {selectedGame.requiredPlan.name}
                    </span>
                  )}
                  <DialogTitle className="text-2xl normal-case">
                    {selectedGame.title}
                  </DialogTitle>
                  <DialogDescription className="text-surface-hero-muted">
                    {selectedGame.description ||
                      selectedGame.shortDescription ||
                      t("fallbackDescription")}
                  </DialogDescription>
                </DialogHeader>

                <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                  <div className="border border-glass-border bg-white/5 p-3">
                    <dt className="text-xs font-semibold tracking-widest text-white/50 uppercase">
                      {t("details.slug")}
                    </dt>
                    <dd className="mt-1 truncate text-white">
                      {selectedGame.slug}
                    </dd>
                  </div>
                  <div className="border border-glass-border bg-white/5 p-3">
                    <dt className="text-xs font-semibold tracking-widest text-white/50 uppercase">
                      {t("details.access")}
                    </dt>
                    <dd className="mt-1 text-white">
                      {selectedGame.requiredPlan?.name || t("filters.allPlans")}
                    </dd>
                  </div>
                </dl>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Button
                    asChild
                    className="bg-white text-surface-frost-foreground hover:bg-brand-soft"
                  >
                    <Link to={APP_ROUTES.BILLING}>{t("viewPlans")}</Link>
                  </Button>
                  <Button
                    className="border-glass-border text-white hover:bg-white/8"
                    variant="outline"
                    onClick={() => setSelectedGame(null)}
                  >
                    {t("closeDetails")}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
};
