import config from "@config/index";
import { useGetProductsListQuery } from "@product/api/productApi";
import { resolveProductImageUrl } from "@product/utils/resolveProductImageUrl";

import "./index.css";

const BENTO_CLASSES = [
  "bento-gallery__item--wide",
  "bento-gallery__item--tall",
  "bento-gallery__item--medium",
  "bento-gallery__item--small",
  "bento-gallery__item--tall",
  "bento-gallery__item--large",
  "bento-gallery__item--medium",
  "bento-gallery__item--small",
  "bento-gallery__item--wide",
  "bento-gallery__item--tall",
  "bento-gallery__item--small",
  "bento-gallery__item--medium",
  "bento-gallery__item--wide",
  "bento-gallery__item--tall",
  "bento-gallery__item--medium",
  "bento-gallery__item--small",
  "bento-gallery__item--large",
  "bento-gallery__item--medium",
] as const;

export const BentoGallery = () => {
  const { data, isLoading, isError } = useGetProductsListQuery({
    page: 1,
    limit: config.PAGINATION.BENTO_GALLERY_PRODUCTS_PAGE_SIZE,
  });

  if (isLoading) {
    return (
      <div className="bento-gallery" aria-label="Featured cloud games">
        <div className="bento-gallery__grid">
          {BENTO_CLASSES.map((className, index) => (
            <article
              key={index}
              className={`bento-gallery__item ${className} animate-pulse bg-surface-hero`}
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !data?.items?.length) {
    return null;
  }

  const items = data.items;

  return (
    <div className="bento-gallery" aria-label="Featured cloud games">
      <div className="bento-gallery__grid">
        {items.map((item, index) => {
          const imageUrl = resolveProductImageUrl(item.coverImageUrl);

          return (
            <article
              className={`bento-gallery__item ${BENTO_CLASSES[index % BENTO_CLASSES.length]}`}
              key={item.id}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt=""
                  className="bento-gallery__image"
                  loading={index > 5 ? "lazy" : "eager"}
                />
              ) : null}
              <div className="bento-gallery__shade" />
              <div className="bento-gallery__caption">
                <strong>{item.title}</strong>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
