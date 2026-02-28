"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import styles from "./HouseTexture.module.css";

export function HouseTexture() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const textures = useMemo(
    () => [
      "/texturies/block_textures/texture 1.png",
      "/texturies/block_textures/texture 2.png",
      "/texturies/block_textures/texture 3.png",
      "/texturies/block_textures/texture 4.png",
      "/texturies/block_textures/texture 5.png",
    ],
    [],
  );

  const houses = useMemo(
    () => [
      "/texturies/house texture 1.png",
      "/texturies/house texture 2.png",
      "/texturies/house texture 3.png",
      "/texturies/house texture 4.png",
      "/texturies/house texture 5.png",
    ],
    [],
  );

  const maxIndex = Math.min(textures.length, houses.length) - 1;
  const safeIndex = Math.min(Math.max(selectedIndex, 0), maxIndex);

  return (
    <section className={styles.section} aria-label="House texture">
      <div className="fst-container">
        <div className={`fst-grid ${styles.grid}`}>
          <div className={styles.left}>
            <p className={styles.text}>
              <span>ГИБКИЙ КЛИНКЕР ДЛЯ ОТДЕЛКИ ФАСАДА</span> НАПРЯМУЮ ОТ
              ПРОИЗВОДИТЕЛЯ
            </p>

            <p className={styles.price}>
              Цена:
              <br />
              <span className={styles.priceValue}>от 1080 ₽/м²</span>
            </p>

            <button className={styles.button} type="button">
              ПОЛУЧИТЬ ПРАЙС-ЛИСТ
            </button>
          </div>

          <div className={styles.imageWrap}>
            <Image
              src={houses[safeIndex]}
              alt="House"
              fill
              priority={false}
              sizes="(max-width: 1024px) 100vw, 60vw"
              className={styles.image}
            />
          </div>

          <div className={styles.squares} aria-label="Textures">
            {textures.map((src, index) => (
              <button
                key={src}
                type="button"
                className={styles.square}
                style={{ backgroundImage: `url("${src}")` }}
                aria-label={`Texture ${index + 1}`}
                aria-pressed={safeIndex === index}
                onClick={() => setSelectedIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
