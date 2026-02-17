import styles from "./home.module.css";

export default function HomePage() {
  return (
    <main>
      <section className={styles.hero} aria-label="Hero">
        <div className="fst-container">
          <div className={"fst-grid " + styles.grid}>
            <p className={styles.kicker}>
              МЫ ВАЩЕ ДОХУЯ ТАКИЕ
              <br />
              ПИЗДАТЫЕ
            </p>

            <h1 className={styles.title}>
              ПОТОМУ ЧТО МЫ ДЕЛАЕМ
              <br />
              ЗАЕБИСЬ
            </h1>

            <div className={styles.spacer} />

            <p className={styles.description}>
              МЫ ВООБЩЕ МАКСИМАЛЬНО АХУЕННЫЕ КЛАССНЫЕ ПОТОМУ ЧТО СЕКСИ
            </p>

            <button className={styles.cta} type="button">
              Оставить заявку
            </button>

            <div className={styles.right} aria-label="Media" />
          </div>
        </div>
      </section>
    </main>
  );
}
