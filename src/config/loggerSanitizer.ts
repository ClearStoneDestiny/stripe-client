export const LOGGER_SANITIZER = {
  values: {
    REDACTED: "[REDACTED]",
    REDACTED_EMAIL: "[REDACTED_EMAIL]",
    CIRCULAR: "[Circular]",
    MAX_DEPTH_EXCEEDED: "[MaxDepthExceeded]",
  },

  limits: {
    MAX_DEPTH: 5,
    MAX_ARRAY_LENGTH: 20,
    MAX_STRING_LENGTH: 2000,
  },

  patterns: {
    FULL_REDACT_KEYS: [
      "password",
      "passwd",
      "pwd",
      "secret",
      "token",
      "accesstoken",
      "refreshtoken",
      "idtoken",
      "authorization",
      "cookie",
      "setcookie",
      "apikey",
      "xapikey",
      "clientsecret",
      "session",
      "sessionid",
    ],

    PARTIAL_REDACT_KEYS: ["email"],
  },
};
