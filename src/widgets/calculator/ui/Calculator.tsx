"use client";

import { useState } from "react";

import styles from "./Calculator.module.css";

import type { CalculatorField } from "../model/types";

type Props = {
  fields?: CalculatorField[];
};

const defaultFields: CalculatorField[] = [
  { label: "ВАШЕ ИМЯ", name: "name", type: "text" },
  {
    label: "НОМЕР ТЕЛЕФОНА",
    name: "phone",
    type: "tel",
    mask: "ru-phone",
  },
  {
    label: "ПЛОЩАДЬ ДОМА",
    name: "area",
    type: "text",
    sanitize: "digits",
  },
  { label: "ВАШ ГОРОД", name: "city", type: "text" },
];

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

export function Calculator({ fields = defaultFields }: Props) {
  const [phoneDigits, setPhoneDigits] = useState("");
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [area, setArea] = useState("");

  const PRICE_PER_SQM = 1000; // ₽ per 1 кв.м

  const phoneValue = formatRuPhone(phoneDigits);
  const phoneInvalid = phoneTouched && phoneDigits.length < 10;

  return (
    <section className={styles.section} aria-label="Calculator">
      <div className="fst-container">
        <div className={styles.panel}>
          <div className={`fst-grid ${styles.grid}`}>
            <h2 className={styles.title}>КАЛЬКУЛЯТОР</h2>
            <p className={styles.subtitle}>
              Оставьте телефон и мы дадим точную цену вашего объекта
            </p>

            {fields.map((field) => (
              <label key={field.name} className={styles.field}>
                <span className={styles.label}>{field.label}</span>
                <input
                  className={styles.input}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  inputMode={field.sanitize === "digits" ? "numeric" : undefined}
                  value={
                    field.mask === "ru-phone"
                      ? phoneValue
                      : field.sanitize === "digits"
                      ? area
                      : undefined
                  }
                  maxLength={field.mask === "ru-phone" ? 16 : undefined}
                  aria-invalid={field.mask === "ru-phone" ? phoneInvalid : undefined}
                  onChange={
                    field.mask === "ru-phone"
                      ? (event) => setPhoneDigits(normalizeRuPhoneInput(event.currentTarget.value))
                      : field.sanitize === "digits"
                      ? (event) => setArea(event.currentTarget.value.replace(/\D+/g, ""))
                      : undefined
                  }
                  onBlur={field.mask === "ru-phone" ? () => setPhoneTouched(true) : undefined}
                />
              </label>
            ))}

            <div className={styles.cost}>
              <div className={styles.costTitle}>СТОИМОСТЬ</div>
              <div className={styles.costValue}>
                {new Intl.NumberFormat("ru-RU").format((Number(area || 0) || 0) * PRICE_PER_SQM)} ₽
              </div>
              <div className={styles.costHint}>Предварительная стоимость</div>
            </div>

            <button className={styles.button} type="button">
              ОСТАВИТЬ ЗАЯВКУ
            </button>

            <div className={styles.preview} aria-label="Preview" />
          </div>
        </div>
      </div>
    </section>
  );
}
