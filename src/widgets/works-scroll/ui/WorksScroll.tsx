"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import styles from "./WorksScroll.module.css";

type WorkImage = {
  src: string;
  alt: string;
};

const rawImages = [
  "Rectangle 50.png",
  "Rectangle 51.png",
  "Rectangle 52.png",
  "Rectangle 53.png",
  "Rectangle 54.png",
  "Rectangle 55.png",
  "Rectangle 56.png",
];

function encodePublicPath(path: string) {
  return path.replace(/ /g, "%20");
}

export function WorksScroll() {
  const images: WorkImage[] = useMemo(
    () =>
      rawImages.map((fileName, index) => ({
        src: encodePublicPath(`/scroll/${fileName}`),
        alt: `Выполненная работа ${index + 1}`,
      })),
    []
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: true,
    containScroll: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    requestAnimationFrame(onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const goPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const goNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const goTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  return (
    <section className={styles.section} aria-label="Completed works">
      <div className={`fst-fullbleed ${styles.fullbleed}`}>
        <div className={styles.viewport} ref={emblaRef} aria-label="Works carousel">
          <div className={styles.strip}>
            {images.map((image, index) => (
              <div
                key={image.src}
                className={styles.slide}
                aria-hidden={index !== selectedIndex}
              >
                <div
                  className={styles.slideInner}
                >
                  <div
                    className={
                      index === selectedIndex
                        ? `${styles.slideContent} ${styles.slideContentActive}`
                        : styles.slideContent
                    }
                  >
                  <Image
                    className={styles.image}
                    src={image.src}
                    alt={index === selectedIndex ? image.alt : ""}
                    width={700}
                    height={546}
                    draggable={false}
                    sizes="(max-width: 768px) 320px, 700px"
                    priority={index < 3}
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.controls} aria-label="Carousel controls">
          <button
            className={styles.arrow}
            type="button"
            aria-label="Предыдущая работа"
            onClick={goPrev}
            disabled={!emblaApi}
          >
            ←
          </button>

          <div className={styles.pagination} aria-label="Pagination">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                className={
                  index === selectedIndex
                    ? `${styles.dot} ${styles.dotActive}`
                    : styles.dot
                }
                aria-label={`Показать работу ${index + 1}`}
                aria-current={index === selectedIndex}
                onClick={() => goTo(index)}
              />
            ))}
          </div>

          <button
            className={styles.arrow}
            type="button"
            aria-label="Следующая работа"
            onClick={goNext}
            disabled={!emblaApi}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
