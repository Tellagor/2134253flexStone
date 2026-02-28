import Image from "next/image";

import styles from "./DeliveryMethods.module.css";

type DeliveryMethod = {
  id: string;
  title: string;
  description: string;
  iconSrc: string;
  iconAlt: string;
};

const methods: DeliveryMethod[] = [
  {
    id: "transport",
    title: "Транспортные компании",
    description: "Оптимально для крупных партий",
    iconSrc: "/icons_delivery/bus.png",
    iconAlt: "Транспортные компании",
  },
  {
    id: "express",
    title: "Экспресс доставка",
    description: "Срочная доставка по РФ",
    iconSrc: "/icons_delivery/express.png",
    iconAlt: "Экспресс доставка",
  },
  {
    id: "avia",
    title: "Авиаперевозки",
    description: "Минимальные сроки доставки",
    iconSrc: "/icons_delivery/avia.png",
    iconAlt: "Авиаперевозки",
  },
  {
    id: "sea",
    title: "Морские перевозки",
    description: "Эффективно для крупногабаритных партий",
    iconSrc: "/icons_delivery/korablik.png",
    iconAlt: "Морские перевозки",
  },
];

export function DeliveryMethods() {
  return (
    <section className={styles.section} aria-label="Delivery methods">
      <div className="fst-container">
        <div className={`fst-grid ${styles.grid}`}>
          <h2 className={styles.title}>СПОСОБЫ ДОСТАВКИ</h2>

          {methods.map((method) => (
            <article key={method.id} className={styles.card}>
              <div className={styles.iconWrap} aria-hidden="true">
                <Image
                  className={styles.icon}
                  src={method.iconSrc}
                  alt={method.iconAlt}
                  width={220}
                  height={220}
                />
              </div>

              <div className={styles.content}>
                <p className={styles.cardTitle}>{method.title}</p>
                <p className={styles.cardText}>{method.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

