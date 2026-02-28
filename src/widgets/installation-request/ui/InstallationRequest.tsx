import styles from "./InstallationRequest.module.css";
import { InstallationRequestForm } from "./InstallationRequestForm";

const imageUrl = "/form_back.png";

export function InstallationRequest() {
  return (
    <section className={styles.section} aria-label="Installation Request">
      <div className="fst-container">
        <div className={`fst-grid ${styles.grid}`}>
          <div
            className={styles.image}
            style={{ backgroundImage: `url(${imageUrl})` }}
            aria-label="Installation preview"
          />
          <div className={styles.formBlock} aria-label="Form">
            <InstallationRequestForm />
          </div>
        </div>
      </div>
    </section>
  );
}
