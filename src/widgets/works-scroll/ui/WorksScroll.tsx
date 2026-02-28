"use client";

import { useMemo, useRef, useState } from "react";

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

type Phase = "idle" | "animating" | "snapping";

function mod(value: number, modulo: number) {
  return ((value % modulo) + modulo) % modulo;
}

function getDirection(from: number, to: number, count: number): 1 | -1 {
  const forward = (to - from + count) % count;
  const backward = (from - to + count) % count;

  return forward <= backward ? 1 : -1;
}

function makeWindow(centerIndex: number, count: number) {
  return [
    mod(centerIndex - 2, count),
    mod(centerIndex - 1, count),
    mod(centerIndex, count),
    mod(centerIndex + 1, count),
    mod(centerIndex + 2, count),
  ];
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

  const [windowIndices, setWindowIndices] = useState<number[]>(() =>
    makeWindow(0, rawImages.length)
  );
  const [direction, setDirection] = useState<1 | -1>(1);
  const [phase, setPhase] = useState<Phase>("idle");
  const [targetIndex, setTargetIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const pointerIdRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const lastOffsetRef = useRef(0);
  const returnTimeoutRef = useRef<number | null>(null);
  const count = images.length;

  const activeIndex = windowIndices[2];

  const phaseClass =
    phase === "animating"
      ? direction === 1
        ? styles.animNext
        : styles.animPrev
      : phase === "snapping"
        ? styles.snap
        : "";

  const canInteract = phase === "idle";

  const goPrev = () => {
    if (!canInteract) return;
    setTargetIndex(null);
    setDirection(-1);
    setPhase("animating");
  };

  const goNext = () => {
    if (!canInteract) return;
    setTargetIndex(null);
    setDirection(1);
    setPhase("animating");
  };

  const goTo = (index: number) => {
    if (!canInteract) return;
    if (index === activeIndex) return;
    setTargetIndex(index);
    setDirection(getDirection(activeIndex, index, count));
    setPhase("animating");
  };

  const onStripTransitionEnd: React.TransitionEventHandler<HTMLDivElement> = (
    event
  ) => {
    if (event.target !== event.currentTarget) return;
    if (event.propertyName !== "transform") return;
    if (phase !== "animating") return;

    const newIndex = direction === 1 ? windowIndices[3] : windowIndices[1];
    setPhase("snapping");

    setWindowIndices((current) => {
      if (direction === 1) {
        const next3 = mod(current[4] + 1, count);
        return [current[1], current[2], current[3], current[4], next3];
      }

      const prev3 = mod(current[0] - 1, count);
      return [prev3, current[0], current[1], current[2], current[3]];
    });

    requestAnimationFrame(() => {
      if (targetIndex !== null && newIndex !== targetIndex) {
        setDirection(getDirection(newIndex, targetIndex, count));
        setPhase("animating");
        return;
      }

      setTargetIndex(null);
      setPhase("idle");
    });
  };

  const clearReturnTimeout = () => {
    if (returnTimeoutRef.current === null) return;
    window.clearTimeout(returnTimeoutRef.current);
    returnTimeoutRef.current = null;
  };

  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if (!canInteract) return;
    if (event.button !== 0) return;

    clearReturnTimeout();
    setIsReturning(false);
    setIsDragging(true);
    setDragOffset(0);
    lastOffsetRef.current = 0;
    startXRef.current = event.clientX;
    pointerIdRef.current = event.pointerId;

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if (!isDragging) return;
    if (pointerIdRef.current !== event.pointerId) return;

    const delta = event.clientX - startXRef.current;
    const clamped = Math.max(-560, Math.min(560, delta));
    lastOffsetRef.current = clamped;
    setDragOffset(clamped);
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    if (pointerIdRef.current !== event.pointerId) return;

    const delta = lastOffsetRef.current;
    const threshold = 120;

    setIsDragging(false);
    pointerIdRef.current = null;

    if (Math.abs(delta) >= threshold) {
      setDragOffset(0);
      if (delta < 0) {
        goNext();
      } else {
        goPrev();
      }

      return;
    }

    setIsReturning(true);
    setDragOffset(0);
    returnTimeoutRef.current = window.setTimeout(() => {
      setIsReturning(false);
      returnTimeoutRef.current = null;
    }, 260);
  };

  return (
    <section className={styles.section} aria-label="Completed works">
      <div className={`fst-fullbleed ${styles.fullbleed}`}>
        <div
          className={
            isDragging
              ? `${styles.viewport} ${styles.viewportDragging}`
              : styles.viewport
          }
          aria-label="Works carousel"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <div
            className={
              isDragging
                ? `${styles.strip} ${phaseClass} ${styles.stripDragging}`
                : isReturning
                  ? `${styles.strip} ${phaseClass} ${styles.stripReturning}`
                  : `${styles.strip} ${phaseClass}`
            }
            onTransitionEnd={onStripTransitionEnd}
            style={
              isDragging || isReturning
                ? {
                    transform: `translateX(calc(-1 * var(--step) + ${dragOffset}px))`,
                  }
                : undefined
            }
          >
            {windowIndices.map((index, position) => (
              <div
                key={index}
                className={styles.slide}
                aria-hidden={position !== 2}
              >
                <img
                  className={styles.image}
                  src={images[index].src}
                  alt={position === 2 ? images[index].alt : ""}
                  draggable={false}
                />
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
            disabled={!canInteract}
          >
            ←
          </button>

          <div className={styles.pagination} aria-label="Pagination">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                className={
                  index === activeIndex
                    ? `${styles.dot} ${styles.dotActive}`
                    : styles.dot
                }
                aria-label={`Показать работу ${index + 1}`}
                aria-current={index === activeIndex}
                onClick={() => goTo(index)}
              />
            ))}
          </div>

          <button
            className={styles.arrow}
            type="button"
            aria-label="Следующая работа"
            onClick={goNext}
            disabled={!canInteract}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
