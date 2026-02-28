import styles from "./Benefits.module.css";

import type { BenefitItem } from "../model/types";

type Props = BenefitItem;

const variantClassName: Record<Props["variant"], string> = {
  left: styles.left,
  center: styles.center,
  right: styles.right,
};

export function BenefitCard({ title, text, variant }: Props) {
  return (
    <article className={`${styles.card} ${variantClassName[variant]}`}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.text}>{text}</p>
    </article>
  );
}
