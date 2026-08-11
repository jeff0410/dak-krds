import styles from "./StructuredList.module.css";
import type { StructuredListProps } from "./StructuredList.type";

export function StructuredList({
	rows,
	title,
	layout = "horizontal",
	bordered = true,
	termWidth = "160px",
	className = "",
	...props
}: StructuredListProps) {
	return (
		<div
			className={`${styles.structuredList} ${styles[layout]} ${bordered ? styles.bordered : ""} ${className}`.trim()}
			{...props}
		>
			{title && <h3 className={styles.title}>{title}</h3>}
			<dl className={styles.list}>
				{rows.map((row, index) => (
					<div key={row.key ?? index} className={styles.row}>
						<dt
							className={styles.term}
							style={layout === "horizontal" ? { width: termWidth } : undefined}
						>
							{row.term}
						</dt>
						<dd className={styles.description}>{row.description}</dd>
					</div>
				))}
			</dl>
		</div>
	);
}
