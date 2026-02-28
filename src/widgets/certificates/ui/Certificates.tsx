import styles from "./Certificates.module.css";

type CertificateItem = {
  id: string;
  title: string;
  description: string;
  pdfHref: string;
};

const pdfIcon = "/svg/pdf-document-svgrepo-com%204.svg";

const items: CertificateItem[] = [
  {
    id: "water",
    title: "Гарантия качества — Водопоглощение",
    description:
      "Материал имеет минимальный уровень водопоглощения, что предотвращает разрушение покрытия при длительном контакте с влагой.",
    pdfHref: "/pdf/test.pdf",
  },
  {
    id: "frost",
    title: "Гарантия качества — Морозостойкость",
    description:
      "Продукция выдерживает многократные циклы замораживания и оттаивания без образования трещин и сколов.",
    pdfHref: "/pdf/test.pdf",
  },
  {
    id: "vapor",
    title: "Гарантия качества — Паропроницаемость",
    description:
      "Материал обеспечивает естественный воздухообмен стен, предотвращая накопление влаги внутри конструкции.",
    pdfHref: "/pdf/test.pdf",
  },
  {
    id: "conformity",
    title: "Сертификат соответствия",
    description:
      "Продукция прошла обязательную сертификацию и полностью соответствует требованиям технических регламентов и нормативных стандартов.",
    pdfHref: "/pdf/test.pdf",
  },
];

export function Certificates() {
  return (
    <section className={styles.section} aria-label="Certificates">
      <div className="fst-container">
        <div className={`fst-grid ${styles.grid}`}>
          <h2 className={styles.title}>Сертификаты</h2>
          <p className={styles.subtitle}>
            Обязательная сертификация продукции проводится в соответствии с
            требованиями технических регламентов
          </p>

          <button className={styles.allButton} type="button">
            Скачать все сертификаты
          </button>

          <div className={styles.cards} aria-label="Certificates list">
            {items.map((item) => (
              <article key={item.id} className={styles.card}>
                <div className={styles.cardHead}>
                  <img className={styles.pdfIcon} src={pdfIcon} alt="PDF" />
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                </div>

                <p className={styles.cardDescription}>{item.description}</p>

                <a
                  className={styles.downloadButton}
                  href={item.pdfHref}
                  download
                  aria-label={`Скачать: ${item.title}`}
                >
                  <span className={styles.downloadIconWrap} aria-hidden="true">
                    <svg
                      className={styles.downloadIcon}
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 10C0 5.28595 -1.19209e-07 2.92893 1.46447 1.46447C2.92893 -1.19209e-07 5.28595 0 10 0C14.714 0 17.0711 -1.19209e-07 18.5355 1.46447C20 2.92893 20 5.28595 20 10C20 14.714 20 17.0711 18.5355 18.5355C17.0711 20 14.714 20 10 20C5.28595 20 2.92893 20 1.46447 18.5355C-1.19209e-07 17.0711 0 14.714 0 10ZM10 4.25C10.4142 4.25 10.75 4.58579 10.75 5V10.1893L12.4697 8.4697C12.7626 8.1768 13.2374 8.1768 13.5303 8.4697C13.8232 8.7626 13.8232 9.2374 13.5303 9.5303L10.5303 12.5303C10.3897 12.671 10.1989 12.75 10 12.75C9.8011 12.75 9.6103 12.671 9.4697 12.5303L6.46967 9.5303C6.17678 9.2374 6.17678 8.7626 6.46967 8.4697C6.76256 8.1768 7.23744 8.1768 7.53033 8.4697L9.25 10.1893V5C9.25 4.58579 9.5858 4.25 10 4.25ZM6 14.25C5.58579 14.25 5.25 14.5858 5.25 15C5.25 15.4142 5.58579 15.75 6 15.75H14C14.4142 15.75 14.75 15.4142 14.75 15C14.75 14.5858 14.4142 14.25 14 14.25H6Z"
                        fill="#EDE9E4"
                      />
                    </svg>
                  </span>
                  СКАЧАТЬ
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
