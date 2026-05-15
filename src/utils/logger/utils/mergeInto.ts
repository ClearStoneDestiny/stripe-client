import { isPlainObject } from "@utils/logger/utils/isPlainObject";

export const mergeInto = (
  target: Record<string, unknown>,
  source: Record<string, unknown>,
) => {
  for (const [key, value] of Object.entries(source)) {
    if (value === undefined) {
      continue;
    }

    const existing = target[key];

    if (isPlainObject(existing) && isPlainObject(value)) {
      mergeInto(existing, value);
      continue;
    }

    target[key] = value;
  }
};
