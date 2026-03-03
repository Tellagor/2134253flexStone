import styles from "./Contacts.module.css";

export function Contacts() {
  return (
    <section className={styles.section} aria-label="Contacts">
      <div className="fst-container">
        <div className={`fst-grid ${styles.grid}`}>
          <h1 className={styles.title}>КОНТАКТЫ</h1>

          <p className={styles.subtitle}>
            Мы производим инновационный отделочный материал, <br />
            реалистично имитирующий кирпичную кладку
          </p>

          <div className={styles.leftCard} aria-label="Contacts info">
            <div className={styles.leftInner}>
              <div className={styles.block}>
                <p className={styles.blockTitle}>ГРАФИК РАБОТЫ</p>
                <p className={styles.blockText}>
                  С 9:00 до 17:00, <br />
                  воскресенье — выходной
                </p>
              </div>

              <div className={styles.block}>
                <p className={styles.blockTitle}>КОНТАКТЫ</p>
                <p className={styles.blockText}>
                  <a className={styles.linkAccent} href="tel:+78768768787">
                    8(876)876-87-87
                  </a>
                  <br />
                  <a className={styles.linkAccent} href="mailto:test@mail.ru">
                    test@mail.ru
                  </a>
                </p>
              </div>

              <div className={styles.block}>
                <p className={styles.blockTitle}>АДРЕС</p>
                <p className={styles.blockText}>г. Ярославль</p>
              </div>
            </div>
          </div>

          <div className={styles.rightCard} aria-label="Map">
            <iframe
              className={styles.map}
              title="Карта"
              loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=39.799%2C57.570%2C39.969%2C57.682&layer=mapnik&marker=57.626%2C39.884"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

