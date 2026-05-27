import { Button } from "@components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

interface IBackButtonProps {
  to?: string;
  className?: string;
  label?: string;
}

export const BackButton = ({
  to = "/",
  className,
  label = "Back",
}: IBackButtonProps) => {
  return (
    <Button
      asChild
      variant="ghost"
      size="sm"
      className={cn(
        "group -ml-2 gap-2 text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      <Link to={to}>
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        <span>{label}</span>
      </Link>
    </Button>
  );
};
