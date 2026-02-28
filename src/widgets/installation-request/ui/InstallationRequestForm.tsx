"use client";

import styles from "./InstallationRequest.module.css";

export function InstallationRequestForm() {
  return (
    <form className={styles.form} aria-label="Installation request form">
      <div className={styles.formContent}>
        <h3 className={styles.formTitle}>Оставьте заявку на установку</h3>

        <div className={styles.fields}>
          <input className={styles.field} type="text" placeholder="Имя" />
          <input className={styles.field} type="text" placeholder="Отчество" />
          <input className={styles.field} type="tel" placeholder="Номер телефона" />
        </div>
      </div>

      <button className={styles.submit} type="button">
        Отправить
      </button>
    </form>
  );
}
