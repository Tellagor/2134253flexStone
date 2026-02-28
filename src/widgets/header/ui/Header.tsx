import styles from "./Header.module.css";
import Link from "next/link";

export function Header() {
	return (
		<header className={styles.root}>
			<div className="fst-container">
				<div className={"fst-grid " + styles.grid}>
					<div style={{ gridColumn: "1 / span 3" }}>
						<Link className={styles.brand} href="/">
							Flexstone
						</Link>
					</div>
					<nav style={{ gridColumn: "4 / -1" }} aria-label="Primary" />
				</div>
			</div>
		</header>
	);
}
