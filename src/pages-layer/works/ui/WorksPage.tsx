import styles from "./WorksPage.module.css";

const workImages = [
  "Rectangle 50.png",
  "Rectangle 51.png",
  "Rectangle 52.png",
  "Rectangle 53.png",
  "Rectangle 54.png",
  "Rectangle 55.png",
  "Rectangle 56.png",
];

function encodePublicPath(path: string) {
  return path.replace(/ /g, "%20");
}

export function WorksPage() {
  return (
    <main className={styles.scope} aria-label="Наши работы">
      <div className="fst-container">
        <div className={`fst-grid ${styles.grid}`}>
          <h1 className={styles.title}>Наши работы</h1>

          <div className={styles.col}>
            <figure className={`${styles.block} ${styles.h624}`}>
              <img
                className={styles.image}
                src={encodePublicPath(`/scroll/${workImages[0]}`)}
                alt="Выполненная работа 1"
                loading="lazy"
              />
            </figure>
            <figure className={`${styles.block} ${styles.h304}`}>
              <img
                className={styles.image}
                src={encodePublicPath(`/scroll/${workImages[1]}`)}
                alt="Выполненная работа 2"
                loading="lazy"
              />
            </figure>
          </div>

          <div className={styles.col}>
            <figure className={`${styles.block} ${styles.h304}`}>
              <img
                className={styles.image}
                src={encodePublicPath(`/scroll/${workImages[2]}`)}
                alt="Выполненная работа 3"
                loading="lazy"
              />
            </figure>
            <figure className={`${styles.block} ${styles.h304}`}>
              <img
                className={styles.image}
                src={encodePublicPath(`/scroll/${workImages[3]}`)}
                alt="Выполненная работа 4"
                loading="lazy"
              />
            </figure>
          </div>

          <div className={styles.col}>
            <figure className={`${styles.block} ${styles.h304}`}>
              <img
                className={styles.image}
                src={encodePublicPath(`/scroll/${workImages[4]}`)}
                alt="Выполненная работа 5"
                loading="lazy"
              />
            </figure>
            <figure className={`${styles.block} ${styles.h624}`}>
              <img
                className={styles.image}
                src={encodePublicPath(`/scroll/${workImages[5]}`)}
                alt="Выполненная работа 6"
                loading="lazy"
              />
            </figure>
            <figure className={`${styles.block} ${styles.h304}`}>
              <img
                className={styles.image}
                src={encodePublicPath(`/scroll/${workImages[6]}`)}
                alt="Выполненная работа 7"
                loading="lazy"
              />
            </figure>
          </div>
        </div>
      </div>
    </main>
  );
}
