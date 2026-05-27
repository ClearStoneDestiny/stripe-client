import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import { Separator } from "@components/ui/separator";
import { APP_ROUTES } from "@config/routes";
import { useLogoutMutation } from "@auth/api/authApi";
import {
  useGetCurrentSubscriptionQuery,
  useGetUserBalanceQuery,
} from "@billing/api/billingApi";
import type { IGetMeOutput } from "@auth/interfaces/iGetMeOutput";
import {
  CheckCircle2,
  Clock,
  CreditCard,
  Loader2,
  LogOut,
  Mail,
  XCircle,
} from "lucide-react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

interface IUserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: IGetMeOutput;
}

export const UserProfileModal = ({
  isOpen,
  onClose,
  user,
}: IUserProfileModalProps) => {
  const { t } = useTranslation("user", { keyPrefix: "UserProfileModal" });

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { data: subscription, isLoading: subscriptionLoading } =
    useGetCurrentSubscriptionQuery();

  const { data: balance, isLoading: balanceLoading } = useGetUserBalanceQuery();

  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      enqueueSnackbar(t("logoutSuccess"), { variant: "success" });
      onClose();
      navigate(APP_ROUTES.LANDING);
    } catch (error) {
      enqueueSnackbar(t("logoutError"), { variant: "error" });
    }
  };

  const handleGoToBilling = () => {
    onClose();
    navigate(APP_ROUTES.BILLING);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-[var(--color-glass-border)] bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[var(--color-text-primary)]">
            {t("title")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Email */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-bg-overlay)]">
              <Mail className="h-5 w-5 text-[var(--color-accent-primary)]" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs text-[var(--color-text-secondary)]">
                {t("email")}
              </p>
              <p className="truncate font-medium text-[var(--color-text-primary)]">
                {user.email}
              </p>
            </div>
          </div>

          <Separator className="bg-[var(--color-border-default)]" />

          {/* Subscription */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-bg-overlay)]">
              <CreditCard className="h-5 w-5 text-[var(--color-accent-primary)]" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-[var(--color-text-secondary)]">
                {t("subscription")}
              </p>
              {subscriptionLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-[var(--color-text-secondary)]" />
              ) : subscription?.subscription ? (
                <div className="flex items-center gap-2">
                  <p className="font-medium text-[var(--color-text-primary)]">
                    {subscription.subscription.plan?.name || t("active")}
                  </p>
                  {subscription.subscription.status === "active" ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-[var(--color-cta-primary)]" />
                  )}
                </div>
              ) : (
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {t("noSubscription")}
                </p>
              )}
            </div>
          </div>

          {/* Balance */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-bg-overlay)]">
              <Clock className="h-5 w-5 text-[var(--color-accent-primary)]" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-[var(--color-text-secondary)]">
                {t("balance")}
              </p>
              {balanceLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-[var(--color-text-secondary)]" />
              ) : balance ? (
                <p className="font-medium text-[var(--color-text-primary)]">
                  {balance.availableHours}h {balance.availableMinutes % 60}m
                </p>
              ) : (
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {t("noBalance")}
                </p>
              )}
            </div>
          </div>

          <Separator className="bg-[var(--color-border-default)]" />

          {/* Actions */}
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start border-[var(--color-glass-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-overlay)] hover:text-[var(--color-accent-primary)]"
              onClick={handleGoToBilling}
            >
              <CreditCard className="h-4 w-4" />
              {t("manageBilling")}
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start border-[var(--color-border-default)] bg-[var(--color-bg-surface)] text-[var(--color-cta-primary)] hover:border-[var(--color-cta-primary)]/40 hover:bg-[var(--color-cta-primary)]/10 hover:text-[var(--color-cta-hover)]"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="h-4 w-4" />
              )}
              {isLoggingOut ? t("loggingOut") : t("logout")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
