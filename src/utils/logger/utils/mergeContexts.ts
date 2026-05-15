import { mergeInto } from "@utils/logger/utils/mergeInto";
import type { LogContext } from "@utils/logger/types";

export const mergeContexts = (
  ...contexts: Array<LogContext | undefined>
): LogContext | undefined => {
  const result: Record<string, unknown> = {};

  for (const context of contexts) {
    if (!context) {
      continue;
    }

    mergeInto(result, context);
  }

  return Object.keys(result).length > 0 ? result : undefined;
};
