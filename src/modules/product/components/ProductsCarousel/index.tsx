import { useEffect, useState } from "react";
import vice from "../../../../assets/games/vice.png";
import echoes from "../../../../assets/games/echoes.png";
import eclipse from "../../../../assets/games/eclipse.png";
import elemental from "../../../../assets/games/elemental.png";
import forza from "../../../../assets/games/forza.png";
import ninjas from "../../../../assets/games/ninjas.png";
import shadow from "../../../../assets/games/shadow.png";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@components/ui/carousel";

const games = [
  {
    image: vice,
    title: "Neon Warden",
    meta: "Tactical action",
    queue: "Ready in 24s",
  },
  {
    image: echoes,
    title: "Echo Drift",
    meta: "Atmospheric racer",
    queue: "Ready in 31s",
  },
  {
    image: eclipse,
    title: "Eclipse Run",
    meta: "Sci-fi survival",
    queue: "Ready in 18s",
  },
  {
    image: elemental,
    title: "Elemental Rift",
    meta: "Fantasy arena",
    queue: "Ready in 42s",
  },
  {
    image: forza,
    title: "Frost Circuit",
    meta: "Cloud racing",
    queue: "Ready in 22s",
  },
  {
    image: ninjas,
    title: "Shadow Ninjas",
    meta: "Co-op stealth",
    queue: "Ready in 35s",
  },
  {
    image: shadow,
    title: "Deep Shadow",
    meta: "Cinematic RPG",
    queue: "Ready in 29s",
  },
];

export const ProductsCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    const interval = window.setInterval(() => {
      api.scrollNext();
    }, 3400);

    return () => window.clearInterval(interval);
  }, [api]);

  return (
    <Carousel
      className="w-full"
      opts={{
        align: "start",
        loop: true,
      }}
      setApi={setApi}
    >
      <CarouselContent className="-ml-4">
        {games.map((game) => (
          <CarouselItem
            className="basis-[82%] pl-4 sm:basis-[58%] lg:basis-[42%] xl:basis-[34%]"
            key={game.title}
          >
            <article className="group relative h-[28rem] overflow-hidden rounded-2xl border border-glass-border bg-surface-hero shadow-[var(--shadow-lg)]">
              <img
                src={game.image}
                alt=""
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,15,0.04)_0%,rgba(10,10,15,0.34)_46%,rgba(10,10,15,0.9)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 grid gap-3 p-5">
                <p className="text-xs font-semibold tracking-widest text-brand-soft uppercase">
                  {game.meta}
                </p>
                <div className="flex items-end justify-between gap-4">
                  <h3 className="font-heading text-3xl leading-none font-semibold text-white">
                    {game.title}
                  </h3>
                  <span className="shrink-0 border border-glass-border bg-white/10 px-3 py-1 text-xs text-surface-hero-muted backdrop-blur">
                    {game.queue}
                  </span>
                </div>
              </div>
            </article>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-3 border-glass-border bg-glass text-white hover:bg-white/10" />
      <CarouselNext className="right-3 border-glass-border bg-glass text-white hover:bg-white/10" />
    </Carousel>
  );
};
