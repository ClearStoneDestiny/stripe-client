export const HTTP_ERROR_MESSAGES: Record<number, string> = {
  400: "Invalid request. Please check your input.",
  403: "You don't have permission to perform this action.",
  404: "Requested resource was not found.",
  409: "Conflict. This resource already exists.",
  422: "Validation error. Please check your input.",
  429: "Too many requests. Please try again later.",
  500: "Internal server error. Please try again later.",
  502: "Server is temporarily unavailable.",
  503: "Service unavailable. Please try again later.",
};
