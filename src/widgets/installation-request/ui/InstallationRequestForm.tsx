"use client";

import { useState, type FormEvent } from "react";
import styles from "./InstallationRequest.module.css";

export function InstallationRequestForm() {
  const [name, setName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    setNotice(null);

    const phoneTrimmed = phone.trim();
    if (!phoneTrimmed) {
      setNotice("Введите номер телефона.");
      return;
    }

    const url = typeof window !== "undefined" ? new URL(window.location.href) : null;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          type: "installation",
          name,
          middle_name: middleName,
          phone: phoneTrimmed,
          source_url: url?.toString() ?? null,
          utm_source: url?.searchParams.get("utm_source") ?? null,
          utm_medium: url?.searchParams.get("utm_medium") ?? null,
          utm_campaign: url?.searchParams.get("utm_campaign") ?? null,
          utm_content: url?.searchParams.get("utm_content") ?? null,
          utm_term: url?.searchParams.get("utm_term") ?? null,
        }),
        cache: "no-store",
      });

      if (!response.ok) {
        const text = await response.text().catch(() => "");
        throw new Error(text || `HTTP ${response.status}`);
      }

      setNotice("Заявка отправлена.");
      setName("");
      setMiddleName("");
      setPhone("");
    } catch {
      setNotice("Не удалось отправить заявку. Попробуйте еще раз.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className={styles.form} aria-label="Installation request form" onSubmit={handleSubmit}>
      <div className={styles.formContent}>
        <h3 className={styles.formTitle}>Оставьте заявку на установку</h3>

        <div className={styles.fields}>
          <input
            className={styles.field}
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
          />
          <input
            className={styles.field}
            type="text"
            placeholder="Отчество"
            value={middleName}
            onChange={(event) => setMiddleName(event.currentTarget.value)}
          />
          <input
            className={styles.field}
            type="tel"
            placeholder="Номер телефона"
            value={phone}
            onChange={(event) => setPhone(event.currentTarget.value)}
          />
        </div>
      </div>

      {notice ? <div className={styles.notice}>{notice}</div> : null}
      <button className={styles.submit} type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Отправка..." : "Отправить"}
      </button>
    </form>
  );
}
