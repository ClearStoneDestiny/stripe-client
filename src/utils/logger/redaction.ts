import { LOGGER_SANITIZER } from "@config/loggerSanitizer";
import type { ILogEntry } from "@utils/logger";

const normalizeKey = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]/g, "");

const matchesKeyPattern = (key: string, patterns: string[]) => {
  const normalizedKey = normalizeKey(key);
  return patterns.some((pattern) => normalizedKey.includes(pattern));
};

const truncateString = (value: string) => {
  if (value.length <= LOGGER_SANITIZER.limits.MAX_STRING_LENGTH) {
    return value;
  }

  return `${value.slice(0, LOGGER_SANITIZER.limits.MAX_STRING_LENGTH)}… [TRUNCATED ${value.length - LOGGER_SANITIZER.limits.MAX_STRING_LENGTH} chars]`;
};

const maskEmail = (value: string) => {
  const [localPart, domain] = value.trim().split("@");

  if (!localPart || !domain) {
    return LOGGER_SANITIZER.values.REDACTED_EMAIL;
  }

  return `${localPart.slice(0, 1)}***@${domain}`;
};

const sanitizeString = (value: string) => {
  let result = truncateString(value);

  // Bearer token
  result = result.replace(/(Bearer\s+)[A-Za-z0-9\-._~+/]+=*/gi, "$1[REDACTED]");

  // JWT
  result = result.replace(
    /\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b/g,
    "[REDACTED_JWT]",
  );

  // query params like ?token=...&api_key=...
  result = result.replace(
    /([?&](?:token|access_token|refresh_token|api_key|apikey|authorization)=)[^&\s]+/gi,
    "$1[REDACTED]",
  );

  return result;
};

const sanitizeUnknown = (
  value: unknown,
  options: {
    key?: string;
    depth: number;
    seen: WeakSet<object>;
  },
): unknown => {
  const { key, depth, seen } = options;

  if (
    key &&
    matchesKeyPattern(key, LOGGER_SANITIZER.patterns.FULL_REDACT_KEYS)
  ) {
    return LOGGER_SANITIZER.values.REDACTED;
  }

  if (value === null || value === undefined) {
    return value;
  }

  if (typeof value === "string") {
    if (
      key &&
      matchesKeyPattern(key, LOGGER_SANITIZER.patterns.PARTIAL_REDACT_KEYS)
    ) {
      return maskEmail(value);
    }

    return sanitizeString(value);
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return value;
  }

  if (typeof value === "bigint") {
    return value.toString();
  }

  if (typeof value === "function") {
    return `[Function ${value.name || "anonymous"}]`;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (depth >= LOGGER_SANITIZER.limits.MAX_DEPTH) {
    return LOGGER_SANITIZER.values.MAX_DEPTH_EXCEEDED;
  }

  if (Array.isArray(value)) {
    if (seen.has(value)) {
      return LOGGER_SANITIZER.values.CIRCULAR;
    }

    seen.add(value);

    const sanitizedItems = value
      .slice(0, LOGGER_SANITIZER.limits.MAX_ARRAY_LENGTH)
      .map((item) =>
        sanitizeUnknown(item, {
          depth: depth + 1,
          seen,
        }),
      );

    if (value.length > LOGGER_SANITIZER.limits.MAX_ARRAY_LENGTH) {
      sanitizedItems.push(
        `[+${value.length - LOGGER_SANITIZER.limits.MAX_ARRAY_LENGTH} more items]`,
      );
    }

    seen.delete(value);
    return sanitizedItems;
  }

  if (typeof value === "object") {
    if (seen.has(value)) {
      return LOGGER_SANITIZER.values.CIRCULAR;
    }

    seen.add(value);

    const result: Record<string, unknown> = {};

    for (const [childKey, childValue] of Object.entries(
      value as Record<string, unknown>,
    )) {
      result[childKey] = sanitizeUnknown(childValue, {
        key: childKey,
        depth: depth + 1,
        seen,
      });
    }

    seen.delete(value);
    return result;
  }

  return String(value);
};

export const sanitizeLogEntry = (entry: ILogEntry): ILogEntry => {
  const seen = new WeakSet<object>();

  return sanitizeUnknown(entry, {
    depth: 0,
    seen,
  }) as ILogEntry;
};
