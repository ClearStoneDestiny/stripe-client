import { env } from "@config/env";
import type { FallbackProps } from "react-error-boundary";
import { getErrorDetails } from "../../utils/getErrorDetails";
import { Button } from "@components/ui/button";
import { AlertTriangle, Copy } from "lucide-react";
import { Card, CardContent } from "@components/ui/card";

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const { message, stack } = getErrorDetails(error);

  const handleCopyError = async () => {
    await navigator.clipboard.writeText(`${message}\n\n${stack}`);
  };

  return (
    <div className="container flex min-h-screen items-center justify-center py-10">
      <div className="flex w-full max-w-2xl flex-col items-center gap-6">
        <AlertTriangle className="size-20 text-destructive" />

        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Oops! Something went wrong
          </h1>

          <p className="text-muted-foreground">
            An unexpected error occurred. Please try again.
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={resetErrorBoundary}>
            Try Again
          </Button>

          <Button onClick={() => window.location.reload()}>Reload Page</Button>
        </div>

        {env.isDev && (
          <Card className="w-full border-destructive/30 bg-destructive/5">
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-sm font-medium text-destructive">
                  Error Details (Development Only)
                </h2>

                <Button variant="ghost" size="sm" onClick={handleCopyError}>
                  <Copy className="mr-2 size-4" />
                  Copy
                </Button>
              </div>

              <pre className="overflow-auto whitespace-pre-wrap break-words rounded-md bg-background p-4 font-mono text-sm">
                <strong>Error:</strong> {message}
                {"\n\n"}
                <strong>Stack:</strong>
                {"\n"}
                {stack}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
