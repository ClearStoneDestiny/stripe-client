import { LoaderCircle } from "lucide-react";

export const FullPageLoader = () => {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <LoaderCircle className="size-10 animate-spin text-primary" />
    </div>
  );
};
