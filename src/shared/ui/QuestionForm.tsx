"use client";

import React, { useMemo, useState } from "react";

import styles from "./QuestionForm.module.css";
import type { LeadType } from "@/shared/types";

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

type Props = {
  onSuccess?: () => void;
};

export const QuestionForm: React.FC<Props> = (props) => {
  const [name, setName] = useState("");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [message, setMessage] = useState("");
  const [agree, setAgree] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const phoneValue = useMemo(() => formatRuPhone(phoneDigits), [phoneDigits]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    setNotice(null);

    const phoneTrimmed = phoneValue.trim();
    if (phoneDigits.length < 10) {
      setNotice("Введите корректный номер телефона.");
      return;
    }
    if (!agree) {
      setNotice("Подтвердите согласие на обработку персональных данных.");
      return;
    }

    const url = typeof window !== "undefined" ? new URL(window.location.href) : null;
    const type: LeadType = "question";

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          type,
          name,
          phone: phoneTrimmed,
          message,
          agree,
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
      setMessage("");
      setAgree(false);
      setPhoneDigits("");
      setName("");
      if (props.onSuccess) {
        window.setTimeout(() => props.onSuccess?.(), 600);
      }
    } catch {
      setNotice("Не удалось отправить заявку. Попробуйте еще раз.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.brand}>FlexStone</div>

      <h2 className={styles.title}>Оставить заявку</h2>
      <div className={styles.subtitle}>Задайте ваш вопрос, мы оперативно вам ответим</div>

      <label className={styles.label}>
        ИМЯ И ФАМИЛИЯ
        <input
          className={styles.input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
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

      <label className={styles.label}>
        СООБЩЕНИЕ
        <textarea
          className={styles.textarea}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>

      <label className={styles.checkboxLabel}>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />
        <span>
          Соглашаюсь на обработку{" "}
          <a href="#" tabIndex={-1}>
            персональных данных
          </a>
        </span>
      </label>

      {notice ? <div className={styles.notice}>{notice}</div> : null}
      <button className={styles.submit} type="submit" disabled={!agree || isSubmitting}>
        {isSubmitting ? "ОТПРАВКА..." : "ОТПРАВИТЬ"}
      </button>
    </form>
  );
};
