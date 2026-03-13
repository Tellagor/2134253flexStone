"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

import styles from "./WorksScroll.module.css";
import { createDefaultWorksItems } from "@/shared/lib/works";
import type { WorkItem } from "@/shared/types";

export function WorksScroll() {
  const [images, setImages] = useState<WorkItem[]>(createDefaultWorksItems);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: true,
    containScroll: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadItems() {
      try {
        const response = await fetch("/api/works?scope=carousel", { cache: "no-store" });
        if (!response.ok) return;
        const payload = (await response.json()) as { items?: WorkItem[] };
        if (!cancelled && Array.isArray(payload.items) && payload.items.length > 0) {
          setImages(payload.items);
        }
      } catch {
        // Keep fallback images.
      }
    }

    void loadItems();
    return () => {
      cancelled = true;
    };
  }, []);

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
                key={image.id}
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
                    <img
                      className={styles.image}
                      src={image.imageUrl}
                      alt={image.alt}
                      draggable={false}
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
