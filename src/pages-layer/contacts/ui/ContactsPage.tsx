import { Contacts } from "@/widgets";
import { InstallationRequest } from "@/widgets";

import styles from "./ContactsPage.module.css";

export function ContactsPage() {
  return (
    <main>
      <div className={styles.stack}>
        <Contacts />
        <InstallationRequest />
      </div>
    </main>
  );
}
