import type { ISerializedError } from "@utils/logger/types";

export const serializeError = (
  error: unknown,
): ISerializedError | undefined => {
  if (!error) {
    return undefined;
  }

  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
      cause: error.cause,
    };
  }

  if (typeof error === "string") {
    return {
      message: error,
    };
  }

  return {
    message: "Non-Error throwable",
    cause: error,
  };
};
