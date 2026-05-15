import { AppConfig } from "@config/AppConfig";

export default {
  URL: {
    BASE_URL: AppConfig.BACKEND_DOMAIN,
  },

  UI: {
    TRANSITION_DELAY: 500,
    DEBOUNCE_DELAY: 300,
  },

  VALIDATION: {
    NAME_REGEX: /^[\p{L}]+$/u,
    PASSWORD_REGEX:
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()[\]{}\-_=+\\|;:'",<.>/?`~]).+$/,
  },
};
