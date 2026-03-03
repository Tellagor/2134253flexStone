import styles from "./WorksPage.module.css";

export function WorksPage() {
  return (
    <main className={styles.scope} aria-label="Наши работы">
      <div className="fst-container">
        <div className={`fst-grid ${styles.grid}`}>
          <h1 className={styles.title}>Наши работы</h1>

          <div className={styles.col}>
            <div className={`${styles.block} ${styles.h624}`} />
            <div className={`${styles.block} ${styles.h304}`} />
          </div>

          <div className={styles.col}>
            <div className={`${styles.block} ${styles.h304}`} />
            <div className={`${styles.block} ${styles.h304}`} />
          </div>

          <div className={styles.col}>
            <div className={`${styles.block} ${styles.h304}`} />
            <div className={`${styles.block} ${styles.h624}`} />
          </div>
        </div>
      </div>
    </main>
  );
}
