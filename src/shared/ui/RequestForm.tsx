"use client";

import React, { useMemo, useState } from "react";
import styles from "./RequestForm.module.css";

function formatRuPhone(tenDigits: string) {
  const digits = tenDigits.replace(/\D+/g, "").slice(0, 10);
  const p1 = digits.slice(0, 3);
  const p2 = digits.slice(3, 6);
  const p3 = digits.slice(6, 8);
  const p4 = digits.slice(8, 10);

  const parts = [p1, p2, p3, p4].filter(Boolean);
  return `+7-${parts.join("-")}`;
}

function normalizeRuPhoneInput(raw: string) {
  const onlyDigits = raw.replace(/\D+/g, "");
  const trimmed = onlyDigits.startsWith("7") ? onlyDigits.slice(1) : onlyDigits;
  return trimmed.slice(0, 10);
}

export const RequestForm: React.FC = () => {
  const [name, setName] = useState("");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [agree, setAgree] = useState(false);

  const phoneValue = useMemo(() => formatRuPhone(phoneDigits), [phoneDigits]);

  return (
    <form className={styles.form}>
      <h2 className={styles.title}>Оставить заявку</h2>
      <div className={styles.subtitle}>
        Фасадные панели из гибкого кирпича под ваш бюджет<br />
        со сроком службы от 30 лет
      </div>
      <label className={styles.label}>
        ИМЯ И ФАМИЛИЯ
        <input
          className={styles.input}
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <label className={styles.label}>
        НОМЕР ТЕЛЕФОНА
        <input
          className={styles.input}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder={"+7-999-999-99-99"}
          value={phoneValue}
          maxLength={16}
          onChange={(e) => setPhoneDigits(normalizeRuPhoneInput(e.currentTarget.value))}
        />
      </label>
      <label className={styles.checkboxLabel}>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={agree}
          onChange={e => setAgree(e.target.checked)}
        />
        <span>
          Соглашаюсь на обработку <a href="#" tabIndex={-1}>персональных данных</a>
        </span>
      </label>
      <button className={styles.submit} type="submit" disabled={!agree}>
        ОТПРАВИТЬ
      </button>
    </form>
  );
};
