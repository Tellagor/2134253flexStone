"use client";

import { useEffect, useMemo, useState } from "react";

import styles from "./Contacts.module.css";
import { defaultContactsPageContent } from "@/shared/api/contacts";
import type { ContactsPageContent } from "@/shared/types";

function phoneToTelHref(value: string) {
  const digits = value.replace(/\D+/g, "");
  if (!digits) return "tel:";
  const normalized = digits.startsWith("8") ? `7${digits.slice(1)}` : digits;
  return `tel:+${normalized}`;
}

export function Contacts() {
  const [content, setContent] = useState<ContactsPageContent>(defaultContactsPageContent);

  useEffect(() => {
    let cancelled = false;

    async function loadContent() {
      try {
        const response = await fetch("/api/contacts", { cache: "no-store" });
        if (!response.ok) return;
        const payload = (await response.json()) as {
          content?: Partial<ContactsPageContent> | null;
        };

        if (
          !cancelled &&
          payload.content &&
          typeof payload.content.title === "string" &&
          typeof payload.content.subtitle === "string" &&
          typeof payload.content.workHours === "string" &&
          typeof payload.content.phone === "string" &&
          typeof payload.content.email === "string" &&
          typeof payload.content.address === "string"
        ) {
          setContent({
            title: payload.content.title.trim() || defaultContactsPageContent.title,
            subtitle: payload.content.subtitle.trim() || defaultContactsPageContent.subtitle,
            workHours: payload.content.workHours.trim() || defaultContactsPageContent.workHours,
            phone: payload.content.phone.trim() || defaultContactsPageContent.phone,
            email: payload.content.email.trim() || defaultContactsPageContent.email,
            address: payload.content.address.trim() || defaultContactsPageContent.address,
          });
        }
      } catch {
        // Fallback data is already rendered.
      }
    }

    void loadContent();
    return () => {
      cancelled = true;
    };
  }, []);

  const workHoursLines = useMemo(() => content.workHours.split(/\r?\n/), [content.workHours]);

  return (
    <section className={styles.section} aria-label="Contacts">
      <div className="fst-container">
        <div className={`fst-grid ${styles.grid}`}>
          <h1 className={styles.title}>{content.title}</h1>

          <p className={styles.subtitle}>
            {content.subtitle}
          </p>

          <div className={styles.leftCard} aria-label="Contacts info">
            <div className={styles.leftInner}>
              <div className={styles.block}>
                <p className={styles.blockTitle}>ГРАФИК РАБОТЫ</p>
                <p className={styles.blockText}>
                  {workHoursLines.map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < workHoursLines.length - 1 ? <br /> : null}
                    </span>
                  ))}
                </p>
              </div>

              <div className={styles.block}>
                <p className={styles.blockTitle}>КОНТАКТЫ</p>
                <p className={styles.blockText}>
                  <a className={styles.linkAccent} href={phoneToTelHref(content.phone)}>
                    {content.phone}
                  </a>
                  <br />
                  <a className={styles.linkAccent} href={`mailto:${content.email}`}>
                    {content.email}
                  </a>
                </p>
              </div>

              <div className={styles.block}>
                <p className={styles.blockTitle}>АДРЕС</p>
                <p className={styles.blockText}>{content.address}</p>
              </div>
            </div>
          </div>

          <div className={styles.rightCard} aria-label="Map">
            <div className={styles.mapWrap}>
              <a
                href="https://yandex.com/maps/16/yaroslavl/?utm_medium=mapframe&utm_source=maps"
                className={styles.mapLink}
              >
                Yaroslavl
              </a>
              <a
                href="https://yandex.com/maps/geo/yaroslavl/53057241/?ll=39.853385%2C57.650724&utm_medium=mapframe&utm_source=maps&z=11.36"
                className={styles.mapLinkSecond}
              >
                Yaroslavl — Yandex Maps
              </a>
              <iframe
                className={styles.map}
                title="Yandex Map"
                loading="lazy"
                src="https://yandex.com/map-widget/v1/?ll=39.853385%2C57.650724&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1MzA1NzI0MRIg0KDQvtGB0YHQuNGPLCDQr9GA0L7RgdC70LDQstC70YwiCg1Ekx9CFZmBZkI%2C&z=11.36"
                frameBorder={1}
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

