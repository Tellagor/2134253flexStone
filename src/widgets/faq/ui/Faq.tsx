"use client";

import { useState } from "react";
import { useQuestionModal } from "@/shared/ui/QuestionModalProvider";

import styles from "./Faq.module.css";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

const items: FaqItem[] = [
  {
    id: "mounting",
    question: "Как происходит монтаж?",
    answer:
      "Рыба-текст: монтаж выполняется по инструкции. Подготовка основания, нанесение клеевого состава, укладка модулей и затирка швов. Сроки и материалы зависят от типа поверхности.",
  },
  {
    id: "price",
    question: "Какова цена на гибкий кирпич для фасада",
    answer:
      "Рыба-текст: цена зависит от объёма заказа, выбранной фактуры и комплектации. Уточните площадь и желаемый цвет — мы рассчитаем стоимость и сроки поставки.",
  },
];

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(null);
  const questionModal = useQuestionModal();

  return (
    <section className={styles.section} aria-label="FAQ">
      <div className="fst-container">
        <div className={`fst-grid ${styles.grid}`}>
          <h2 className={styles.title}>ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ</h2>

          <div className={styles.list} role="list">
            {items.map((item) => {
              const isOpen = openId === item.id;
              const contentId = `faq-${item.id}`;

              return (
                <div key={item.id} className={styles.item} role="listitem">
                  <button
                    className={styles.trigger}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() =>
                      setOpenId((current) =>
                        current === item.id ? null : item.id
                      )
                    }
                  >
                    <span className={styles.question}>{item.question}</span>
                    <span
                      className={isOpen ? `${styles.plus} ${styles.plusOpen}` : styles.plus}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>

                  <div
                    id={contentId}
                    className={isOpen ? `${styles.answer} ${styles.answerOpen}` : styles.answer}
                    role="region"
                    aria-label={item.question}
                  >
                    <div className={styles.answerInner}>{item.answer}</div>
                  </div>
                </div>
              );
            })}

            <div className={styles.actions}>
              <button
                className={styles.askButton}
                type="button"
                onClick={() => questionModal.open()}
              >
                ЗАДАТЬ ВОПРОС
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
