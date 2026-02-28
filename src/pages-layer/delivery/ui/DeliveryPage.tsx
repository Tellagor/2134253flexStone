import styles from "./DeliveryPage.module.css";
import { DeliveryCharacteristics, DeliveryHero, DeliveryMethods } from "@/widgets";

export function DeliveryPage() {
  return (
    <main className={styles.main}>
      <DeliveryHero />
      <DeliveryMethods />
      <DeliveryCharacteristics />
    </main>
  );
}
