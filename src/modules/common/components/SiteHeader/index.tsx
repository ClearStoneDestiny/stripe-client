import { useEffect, useState } from "react";
import { Button } from "@components/ui/button";
import { APP_ROUTES } from "@config/routes";
import { Gamepad2 } from "lucide-react";
import { Link } from "react-router";
import { cn } from "src/lib/utils";
import { useTranslation } from "react-i18next";
import { useAuth } from "@auth/index";
import { useShowHeader } from "@common/hooks/useShowHeader";

const publicNavItems = [
  { href: "#games", label: "Games" },
  { href: "#pricing", label: "Pricing" },
  { href: "#how-it-works", label: "How it works" },
];

const protectedNavItems = [
  { href: APP_ROUTES.HOME, label: "Home" },
  { href: `${APP_ROUTES.HOME}#popular`, label: "Catalog" },
  { href: APP_ROUTES.BILLING, label: "Prices" },
];

export const SiteHeader = () => {
  const { t } = useTranslation("common", { keyPrefix: "SiteHeader" });

  const { isAuthenticated } = useAuth();

  const [isFloating, setIsFloating] = useState(false);
  const navItems = isAuthenticated ? protectedNavItems : publicNavItems;

  const shouldShowHeader = useShowHeader();

  useEffect(() => {
    const handleScroll = () => {
      setIsFloating(window.scrollY > 72);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!shouldShowHeader) {
    return null;
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div
        className={cn(
          "mx-auto flex h-16 max-w-7xl items-center justify-between border border-transparent px-4 transition-all duration-300 sm:px-5",
          isFloating
            ? "max-w-3xl rounded-full border-glass-border bg-glass shadow-[var(--shadow-frost)] backdrop-blur-2xl"
            : "bg-transparent",
        )}
      >
        <Link
          to={APP_ROUTES.LANDING}
          className="flex items-center gap-3 text-white"
          aria-label="Mika Play home"
        >
          <span className="grid size-9 place-items-center rounded-full border border-white/15 bg-white/10">
            <Gamepad2 className="size-4" />
          </span>
          <span className="text-sm font-semibold tracking-widest uppercase">
            {t("headerTitle")}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-white/70 md:flex">
          {navItems.map((item) => (
            <a
              className="transition-colors hover:text-white"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            className="hidden border-white/15 text-white hover:bg-white/70 md:inline-flex"
            variant="outline"
          >
            <Link
              to={
                isAuthenticated
                  ? `${APP_ROUTES.HOME}#popular`
                  : APP_ROUTES.LOGIN
              }
            >
              {isAuthenticated ? t("catalog") : t("signIn")}
            </Link>
          </Button>
          <Button
            asChild
            className="bg-brand text-brand-foreground hover:bg-brand-soft"
          >
            <Link
              to={
                isAuthenticated
                  ? `${APP_ROUTES.HOME}#billing`
                  : APP_ROUTES.LOGIN
              }
            >
              {isAuthenticated ? t("billing") : t("start")}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
