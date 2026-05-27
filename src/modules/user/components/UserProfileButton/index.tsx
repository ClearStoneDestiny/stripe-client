import { Button } from "@components/ui/button";
import { useGetMeQuery } from "@auth/api/authApi";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { getEmailInitials } from "@user/utils/getEmailInitials";
import { Avatar, AvatarFallback } from "@components/ui/avatar";
import { UserProfileModal } from "../UserProfileModal";
import { useTranslation } from "react-i18next";

export const UserProfileButton = () => {
  const { t } = useTranslation("user", { keyPrefix: "UserProfileButton" });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: user, isLoading } = useGetMeQuery();

  if (isLoading) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full text-white/70 hover:text-white"
        disabled
      >
        <Loader2 className="h-5 w-5 animate-spin" />
      </Button>
    );
  }

  if (!user) {
    return null;
  }

  const initials = getEmailInitials(user.email);

  return (
    <>
      <Button
        variant="ghost"
        className="h-10 w-10 rounded-full p-0 transition-transform hover:scale-105"
        onClick={() => setIsModalOpen(true)}
        aria-label={t("openProfile")}
      >
        <Avatar className="h-10 w-10 border-2 border-[var(--color-glass-border)]">
          <AvatarFallback className="bg-gradient-to-br from-[var(--color-accent-primary)] to-[var(--color-frost-600)] text-sm font-semibold text-white">
            {initials}
          </AvatarFallback>
        </Avatar>
      </Button>

      <UserProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
      />
    </>
  );
};
