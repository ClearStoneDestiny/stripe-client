import vice from "../../../../assets/games/vice.png";
import echoes from "../../../../assets/games/echoes.png";
import eclipse from "../../../../assets/games/eclipse.png";
import elemental from "../../../../assets/games/elemental.png";
import forza from "../../../../assets/games/forza.png";
import ninjas from "../../../../assets/games/ninjas.png";
import shadow from "../../../../assets/games/shadow.png";
import "./index.css";
import { useTranslation } from "react-i18next";

const galleryItems = [
  { image: vice, title: "Neon Warden", className: "bento-gallery__item--wide" },
  { image: echoes, title: "Echoes", className: "bento-gallery__item--tall" },
  {
    image: eclipse,
    title: "Eclipse Run",
    className: "bento-gallery__item--medium",
  },
  {
    image: elemental,
    title: "Elemental Rift",
    className: "bento-gallery__item--small",
  },
  {
    image: forza,
    title: "Frost Circuit",
    className: "bento-gallery__item--tall",
  },
  {
    image: ninjas,
    title: "Shadow Ninjas",
    className: "bento-gallery__item--large",
  },
  {
    image: shadow,
    title: "Shadow Protocol",
    className: "bento-gallery__item--medium",
  },
  {
    image: vice,
    title: "Vice Sector",
    className: "bento-gallery__item--small",
  },
  {
    image: eclipse,
    title: "Eclipse Arena",
    className: "bento-gallery__item--wide",
  },
  {
    image: elemental,
    title: "Elemental Core",
    className: "bento-gallery__item--tall",
  },
  {
    image: echoes,
    title: "Echo Drift",
    className: "bento-gallery__item--small",
  },
  {
    image: forza,
    title: "Forza Cloud",
    className: "bento-gallery__item--medium",
  },
  {
    image: ninjas,
    title: "Night Blade",
    className: "bento-gallery__item--wide",
  },
  {
    image: shadow,
    title: "Deep Shadow",
    className: "bento-gallery__item--tall",
  },
  {
    image: vice,
    title: "Arcade Vice",
    className: "bento-gallery__item--medium",
  },
  {
    image: elemental,
    title: "Frozen Ember",
    className: "bento-gallery__item--small",
  },
  {
    image: eclipse,
    title: "Moonbreak",
    className: "bento-gallery__item--large",
  },
  {
    image: echoes,
    title: "Signal Echo",
    className: "bento-gallery__item--medium",
  },
];

export const BentoGallery = () => {
  const { t } = useTranslation("common", { keyPrefix: "BentoGallery" });

  return (
    <div className="bento-gallery" aria-label="Featured cloud games">
      <div className="bento-gallery__grid">
        {galleryItems.map((item, index) => (
          <article
            className={`bento-gallery__item ${item.className}`}
            key={`${item.title}-${index}`}
          >
            <img
              src={item.image}
              alt=""
              className="bento-gallery__image"
              loading={index > 5 ? "lazy" : "eager"}
            />
            <div className="bento-gallery__shade" />
            <div className="bento-gallery__caption">
              <span>{t("availableInGallery")}</span>
              <strong>{item.title}</strong>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
