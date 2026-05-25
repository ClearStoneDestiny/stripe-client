import { useEffect, useState } from "react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@components/ui/carousel";
import { useGetProductsListQuery } from "@product/api/productApi";
import config from "@config/index";
import { resolveProductImageUrl } from "@product/utils/resolveProductImageUrl";

export const ProductsCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();

  const { data, isLoading, isError } = useGetProductsListQuery({
    page: 1,
    limit: config.PAGINATION.PRODUCTS_CAROUSEL_PAGE_SIZE,
  });

  useEffect(() => {
    if (!api) {
      return;
    }

    const interval = window.setInterval(() => {
      api.scrollNext();
    }, 3400);

    return () => window.clearInterval(interval);
  }, [api]);

  if (isLoading) {
    return (
      <Carousel className="w-full" opts={{ align: "start", loop: true }}>
        <CarouselContent className="-ml-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="basis-[82%] pl-4 sm:basis-[58%] lg:basis-[42%] xl:basis-[34%]"
            >
              <div className="h-[28rem] animate-pulse rounded-2xl bg-surface-hero" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  }

  if (isError || !data?.items?.length) {
    return null;
  }

  const games = data.items;

  return (
    <Carousel
      className="w-full"
      opts={{ align: "start", loop: true }}
      setApi={setApi}
    >
      <CarouselContent className="-ml-4">
        {games.map((game) => {
          const imageUrl = resolveProductImageUrl(game.coverImageUrl);

          return (
            <CarouselItem
              className="basis-[82%] pl-4 sm:basis-[58%] lg:basis-[42%] xl:basis-[34%]"
              key={game.id}
            >
              <article className="group relative h-[28rem] overflow-hidden rounded-2xl border border-glass-border bg-surface-hero">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={game.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : null}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,15,0.04)_0%,rgba(10,10,15,0.34)_46%,rgba(10,10,15,0.9)_100%)]" />
              </article>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="left-3 border-glass-border bg-glass text-white hover:bg-white/10" />
      <CarouselNext className="right-3 border-glass-border bg-glass text-white hover:bg-white/10" />
    </Carousel>
  );
};
