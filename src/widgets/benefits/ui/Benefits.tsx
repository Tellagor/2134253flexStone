import styles from "./Benefits.module.css";
import { BenefitCard } from "./BenefitCard";

import type { BenefitItem } from "../model/types";

type Props = {
  items?: BenefitItem[];
};

const defaultItems: BenefitItem[] = [
  {
    variant: "left",
    title: "Выглядит как кирпич",
    text: "Натуральный состав: шамот и каолиновая глина. Не блестит, выглядит как настоящий клинкер",
  },
  {
    variant: "center",
    title: "Не выгорает на солнце",
    text: "Уровень УФ защиты — 8 баллов, гарантированно не выцветает и не выгорает на солнце",
  },
  {
    variant: "right",
    title: "Огнестойкий",
    text: "Гибкий клинкер FST имеет сертификат пожарной системы К0.",
  },
];

export function Benefits({ items = defaultItems }: Props) {
  return (
    <section className={styles.section} aria-label="Benefits">
      <div className="fst-container">
        <div className={styles.grid}>
          {items.map((item) => (
            <BenefitCard
              key={`${item.variant}:${item.title}`}
              title={item.title}
              text={item.text}
              variant={item.variant}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
