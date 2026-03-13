"use client";

import { useEffect, useState } from "react";

import styles from "./Assortment.module.css";
import { defaultAssortmentItems } from "@/shared/api/assortment";
import { useRequestModal } from "@/shared/ui/RequestModalProvider";
import type { AssortmentItem, AssortmentSectionContent } from "@/shared/types";

const DEFAULT_TITLE = "Ассортимент";
const DEFAULT_DESCRIPTION =
  "Фасадные панели, подходящие для облицовки большинства типов оснований стен – у нас Вы можете купить гибкий кирпич для фасада, который оправдает ожидания в вашем проекте.";

export function Assortment() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [items, setItems] = useState<AssortmentItem[]>(defaultAssortmentItems);
  const [section, setSection] = useState<AssortmentSectionContent>({
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  });
  const { open } = useRequestModal();

  useEffect(() => {
    let cancelled = false;

    async function loadItems() {
      try {
        const response = await fetch("/api/assortment/home", { cache: "no-store" });
        if (!response.ok) return;
        const payload = (await response.json()) as {
          items?: AssortmentItem[];
          section?: Partial<AssortmentSectionContent> | null;
        };
        if (!cancelled && Array.isArray(payload.items) && payload.items.length > 0) {
          setItems(payload.items);
        }
        if (
          !cancelled &&
          payload.section &&
          typeof payload.section.title === "string" &&
          typeof payload.section.description === "string"
        ) {
          setSection({
            title: payload.section.title.trim() || DEFAULT_TITLE,
            description: payload.section.description.trim() || DEFAULT_DESCRIPTION,
          });
        }
      } catch {
        // Fallback data is already rendered.
      }
    }

    void loadItems();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className={styles.section} aria-label="Assortment">
      <div className="fst-container">
        <div className={`fst-grid ${styles.grid}`}>
          <h2 className={styles.title}>{section.title}</h2>
          <p className={styles.description}>{section.description}</p>

          <div className={styles.list} aria-label="Products">
            {items.map((item) => (
              <article
                key={item.id}
                className={
                  openId === item.id
                    ? `${styles.card} ${styles.cardOpen}`
                    : styles.card
                }
                style={{ backgroundImage: `url("${item.imageUrl}")` }}
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

                    <h3 className={styles.detailsTitle}>{item.name}</h3>

                    <p className={styles.detailsText}>{item.shortDescription}</p>

                    <div className={styles.detailsPrices}>
                      {item.priceTiers.map((tier) => (
                        <div key={tier.id} className={styles.detailsRow}>
                          <span>
                            {formatTierRange(tier.fromM2, tier.toM2)}
                          </span>
                          <span className={styles.detailsPrice}>
                            {tier.priceRub} ₽
                          </span>
                        </div>
                      ))}
                    </div>

                    <button
                      className={styles.detailsCta}
                      type="button"
                      onClick={() => {
                        setOpenId(null);
                        const productIdRaw = Number(item.id);
                        open({
                          type: "assortment",
                          productId: Number.isFinite(productIdRaw) ? productIdRaw : null,
                          productNameSnapshot: item.name,
                        });
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

function formatTierRange(fromM2: number, toM2: number | null) {
  if (toM2 === null) return `от ${fromM2} м2`;
  if (fromM2 === 0) return `до ${toM2} м2`;
  return `${fromM2} - ${toM2} м2`;
}
