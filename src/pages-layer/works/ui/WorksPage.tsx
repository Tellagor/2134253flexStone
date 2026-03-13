import { fetchWorksPageItems } from "@/shared/api/works";
import styles from "./WorksPage.module.css";

const columnPatterns = [
  ["h624", "h304"],
  ["h304", "h304"],
  ["h304", "h624", "h304"],
] as const;

export async function WorksPage() {
  const items = await fetchWorksPageItems();
  const columns = columnPatterns.map(() => [] as typeof items);

  items.forEach((item, index) => {
    columns[index % columns.length].push(item);
  });

  return (
    <main className={styles.scope} aria-label="Наши работы">
      <div className="fst-container">
        <div className={`fst-grid ${styles.grid}`}>
          <h1 className={styles.title}>Наши работы</h1>

          {columns.map((columnItems, columnIndex) => {
            const pattern = columnPatterns[columnIndex];

            return (
              <div key={columnIndex} className={styles.col}>
                {columnItems.map((item, itemIndex) => {
                  const heightClass = styles[pattern[itemIndex % pattern.length]];

                  return (
                    <figure key={item.id} className={`${styles.block} ${heightClass}`}>
                      <img className={styles.image} src={item.imageUrl} alt={item.alt} loading="lazy" />
                    </figure>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
