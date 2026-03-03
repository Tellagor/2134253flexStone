"use client";
import styles from "./home.module.css";
import {
  Benefits,
  HouseTexture,
  Assortment,
  Calculator,
  Faq,
  WorksScroll,
  Certificates,
  InstallationRequest,
} from "@/widgets";
import { useQuestionModal } from "@/shared/ui/QuestionModalProvider";

export default function HomePage() {
  const { open } = useQuestionModal();
  return (
    <main>
      <section className={styles.hero} aria-label="Hero">
        <div className="fst-container">
          <div className={"fst-grid " + styles.grid}>
            <p className={styles.kicker}>
              Lorem, ipsum dolor sit amet 
              <br />
              consectetur 
            </p>

            <h1 className={styles.title}>
              adipisicing elit. Harum 
              <br />
              eligendi 
            </h1>

            <div className={styles.spacer} />

            <p className={styles.description}>
              repellat est ullam qui placeat optio suscipit vel! Facere 
            </p>

            <button className={styles.cta} type="button" onClick={open}>
              Оставить заявку
            </button>

            <div className={styles.right} aria-label="Media" />
          </div>
        </div>
      </section>

      <Benefits />
      <HouseTexture />
      <Assortment />
      <Calculator />
      <Faq />
      <WorksScroll />
      <Certificates />
      <InstallationRequest />
    </main>
  );
}
