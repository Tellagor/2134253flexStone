"use client";

import Image from "next/image";

import styles from "./DeliveryCharacteristics.module.css";
import { useQuestionModal } from "@/shared/ui/QuestionModalProvider";

const palletImage = "/icons_delivery/boxes.png";

export function DeliveryCharacteristics() {
  const questionModal = useQuestionModal();

  return (
    <section className={styles.section} aria-label="Delivery characteristics">
      <div className="fst-container">
        <div className={`fst-grid ${styles.grid}`}>
          <h2 className={styles.title}>ХАРАКТЕРИСТИКИ ДОСТАВКИ</h2>

          <div className={styles.metrics} aria-label="Package metrics">
            <div className={styles.metric}>
              <p className={styles.value}>
                0.47<span className={styles.unit}>м2</span>
              </p>
              <p className={styles.caption}>
                Площадь одного
                <br />
                модуля
              </p>
            </div>

            <div className={styles.metric}>
              <p className={styles.value}>
                11 <span className={styles.unit}>шт</span>
              </p>
              <p className={styles.caption}>В одной коробке</p>
            </div>

            <div className={styles.metric}>
              <p className={styles.value}>
                28 <span className={styles.unit}>кг</span>
              </p>
              <p className={styles.caption}>Вес коробки</p>
            </div>

            <div className={styles.metric}>
              <p className={styles.value}>
                120×25×11<span className={styles.unit}>см</span>
              </p>
              <p className={styles.caption}>Размер упаковки</p>
            </div>
          </div>

          <div className={styles.card} aria-label="Pallet details">
            <p className={styles.cardTitle}>На одном европоддоне</p>

            <ul className={styles.list}>
              <li className={styles.listItem}>
                <span className={styles.dot} aria-hidden="true" />
                <span className={styles.listText}>
                  до 130<span className={styles.smallUnit}>м2</span>
                </span>
              </li>
              <li className={styles.listItem}>
                <span className={styles.dot} aria-hidden="true" />
                <span className={styles.listText}>до 24 коробок</span>
              </li>
            </ul>

            <button
              className={styles.cta}
              type="button"
              onClick={() => questionModal.open()}
            >
              ЗАДАТЬ ВОПРОС
            </button>

            <div className={styles.imageWrap} aria-hidden="true">
              <Image
                className={styles.image}
                src={palletImage}
                alt=""
                width={349}
                height={278}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
