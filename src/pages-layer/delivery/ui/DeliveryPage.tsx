import styles from "./DeliveryPage.module.css";
import { DeliveryCharacteristics, DeliveryHero, DeliveryMethods } from "@/widgets";

export function DeliveryPage() {
  return (
    <main className={styles.main}>
      <div className={styles.stack}>
        <DeliveryHero />
        <DeliveryMethods />
        <DeliveryCharacteristics />
      </div>
    </main>
  );
}
