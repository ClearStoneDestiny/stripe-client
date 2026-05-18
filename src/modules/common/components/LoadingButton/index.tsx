import { LoaderCircle } from "lucide-react";
import { cn } from "src/lib/utils";
import { Button } from "@components/ui/button";
import type { ButtonProps } from "@components/ui/button";

interface LoadingButtonProps extends ButtonProps {
  isLoading?: boolean;
  loaderText?: string;
}

export const LoadingButton = ({
  children,
  isLoading,
  disabled,
  loaderText,
  className,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button
      disabled={disabled || isLoading}
      className={cn("gap-2", className)}
      {...props}
    >
      {isLoading && <LoaderCircle className="size-4 animate-spin" />}

      {isLoading && loaderText ? loaderText : children}
    </Button>
  );
};
