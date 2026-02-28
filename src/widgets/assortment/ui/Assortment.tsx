"use client";

import { useState } from "react";

import styles from "./Assortment.module.css";
import { useRequestModal } from "@/shared/ui/RequestModalProvider";

type AssortmentItem = {
  id: string;
};

const items: AssortmentItem[] = [
  { id: "product-1" },
  { id: "product-2" },
  { id: "product-3" },
  { id: "product-4" },
];

const productImage = "/Calculate%20background.png";

export function Assortment() {
  const [openId, setOpenId] = useState<string | null>(null);
  const { open } = useRequestModal();

  return (
    <section className={styles.section} aria-label="Assortment">
      <div className="fst-container">
        <div className={`fst-grid ${styles.grid}`}>
          <h2 className={styles.title}>Ассортимент</h2>
          <p className={styles.description}>
            Фасадные панели, подходящие для облицовки большинства типов оснований
            стен – у нас Вы можете купить гибкий кирпич для фасада, который
            оправдает ожидания в вашем проекте.
          </p>

          <div className={styles.list} aria-label="Products">
            {items.map((item) => (
              <article
                key={item.id}
                className={
                  openId === item.id
                    ? `${styles.card} ${styles.cardOpen}`
                    : styles.card
                }
                style={{ backgroundImage: `url(\"${productImage}\")` }}
              >
                <div
                  className={
                    openId === item.id
                      ? `${styles.details} ${styles.detailsOpen}`
                      : styles.details
                  }
                  aria-hidden={openId !== item.id}
                >
                  <div className={styles.detailsInner}>
                    <button
                      className={styles.detailsClose}
                      type="button"
                      aria-label="Закрыть"
                      onClick={() => setOpenId(null)}
                    >
                      ×
                    </button>

                    <h3 className={styles.detailsTitle}>
                      Гибкий кирпич для фасада на сетке с защитной пленкой
                    </h3>

                    <p className={styles.detailsText}>
                      Модуль полезной площадью 0,47 м2, на модуле 24 плитки
                      размером 240×70 мм, с учетом шва 8–9 мм, толщина 4 мм
                    </p>

                    <div className={styles.detailsPrices}>
                      <div className={styles.detailsRow}>
                        <span>до 100 м2</span>
                        <span className={styles.detailsPrice}>1170 ₽</span>
                      </div>
                      <div className={styles.detailsRow}>
                        <span>101 - 299 м2</span>
                        <span className={styles.detailsPrice}>1170 ₽</span>
                      </div>
                      <div className={styles.detailsRow}>
                        <span>от 300 м2</span>
                        <span className={styles.detailsPrice}>1170 ₽</span>
                      </div>
                    </div>

                    <button
                      className={styles.detailsCta}
                      type="button"
                      onClick={() => {
                        setOpenId(null);
                        open();
                      }}
                    >
                      ОСТАВИТЬ ЗАЯВКУ
                    </button>
                  </div>
                </div>

                <button
                  className={styles.more}
                  type="button"
                  aria-expanded={openId === item.id}
                  onClick={() =>
                    setOpenId((current) => (current === item.id ? null : item.id))
                  }
                >
                  ПОДРОБНЕЕ
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
