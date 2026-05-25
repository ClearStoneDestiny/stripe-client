import config from "@config/index";

export const resolveProductImageUrl = (imageUrl?: string) => {
  if (!imageUrl) {
    return undefined;
  }

  try {
    return new URL(imageUrl, `${config.URL.BASE_URL}/`).toString();
  } catch {
    return imageUrl;
  }
};
