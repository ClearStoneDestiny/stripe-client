import { AppConfig } from "@config/AppConfig";

export default {
  URL: {
    BASE_URL: AppConfig.BACKEND_DOMAIN,
  },

  UI: {
    TRANSITION_DELAY: 500,
    DEBOUNCE_DELAY: 300,
  },

  PAGINATION: {
    PRODUCTS_PAGE_SIZE: 100,
    BENTO_GALLERY_PRODUCTS_PAGE_SIZE: 18,
    PRODUCTS_CAROUSEL_PAGE_SIZE: 7,
  },

  VALIDATION: {
    NAME_REGEX: /^[\p{L}]+$/u,
    PASSWORD_REGEX:
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()[\]{}\-_=+\\|;:'",<.>/?`~]).+$/,
  },
};
