import Image from "next/image";
import Link from "next/link";

import styles from "./DeliveryHero.module.css";

const deliveryImage = "/delivery.png";

export function DeliveryHero() {
  return (
    <section className={styles.section} aria-label="Delivery across Russia">
      <div className="fst-container">
        <div className={`fst-grid ${styles.grid}`}>
          <h1 className={styles.title}>ДОСТАВКА ПО ВСЕЙ РОССИИ</h1>

          <p className={styles.text}>
            Хорошо организованная доставка может увеличить удовлетворенность
            клиентов и повысить продажи
          </p>

          <Link className={styles.cta} href="/#constructor">
            РАССЧИТАТЬ СТОИМОСТЬ
          </Link>

          <div className={styles.imageWrap} aria-label="Delivery image">
            <Image
              className={styles.image}
              src={deliveryImage}
              alt="Доставка"
              width={760}
              height={382}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
