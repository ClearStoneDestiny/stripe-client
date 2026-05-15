import { HTTP_ERROR_MESSAGES } from "@api/constants/httpErrorMessages";
import { SILENT_ENDPOINTS } from "@api/constants/silentEndpoints";
import { env } from "@config/env";
import { isRejectedWithValue, type Middleware } from "@reduxjs/toolkit";
import { createLogger } from "@utils/logger";
import { enqueueSnackbar } from "notistack";

interface IApiErrorData {
  errors?: Array<{
    id: string;
    msg: string;
  }>;
}

interface IApiErrorPayload {
  status?: number | string;
  data?: IApiErrorData;
}

const logger = createLogger("src/api/middlewares/apiErrorMiddleware");

const getErrorMessage = (payload: IApiErrorPayload): string => {
  // Trying to take the first message from the errors array
  const backendErrors = payload.data?.errors;
  if (backendErrors?.length) {
    // If there are several errors - combine them together
    if (backendErrors.length > 1) {
      return backendErrors.map((e) => e.msg).join(". ");
    }
    return backendErrors[0].msg;
  }

  // Mapping by HTTP status
  if (
    typeof payload.status === "number" &&
    payload.status in HTTP_ERROR_MESSAGES
  ) {
    return HTTP_ERROR_MESSAGES[payload.status];
  }

  // Network errors
  if (payload.status === "FETCH_ERROR") {
    return "Network error. Please check your connection.";
  }

  if (payload.status === "TIMEOUT_ERROR") {
    return "Request timed out. Please try again.";
  }

  return "An unexpected error occurred.";
};

export const apiErrorMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const endpointName = (action.meta?.arg as { endpointName?: string })
      ?.endpointName;

    // Skip endpoints that handle errors themselves
    if (endpointName && SILENT_ENDPOINTS.has(endpointName)) {
      return next(action);
    }

    const payload = action.payload as IApiErrorPayload;
    const message = getErrorMessage(payload);

    enqueueSnackbar(message, {
      variant: "error",
      preventDuplicate: true,
      autoHideDuration: 2000,
    });

    // For debugging (we'll replace it with logger later)
    if (env.isDev) {
      logger.error("API request failed", {
        context: {
          endpoint: endpointName,
          status: payload.status,
          message,
          errors: payload.data?.errors,
        },
      });
    }
  }

  return next(action);
};
