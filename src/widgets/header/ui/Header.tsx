import styles from "./Header.module.css";

export function Header() {
	return (
		<header className={styles.root}>
			<div className="fst-container">
				<div className={"fst-grid " + styles.grid}>
					<div style={{ gridColumn: "1 / span 3" }}>
						<a className={styles.brand} href="/">
							Flexstone
						</a>
					</div>
					<nav style={{ gridColumn: "4 / -1" }} aria-label="Primary" />
				</div>
			</div>
		</header>
	);
}
