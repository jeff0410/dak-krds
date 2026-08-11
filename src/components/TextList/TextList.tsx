import { createElement } from "react";
import styles from "./TextList.module.css";
import type { TextListItem, TextListProps, TextListVariant } from "./TextList.type";

const renderItems = (
	items: TextListItem[],
	variant: TextListVariant,
	depth: number,
) =>
	createElement(
		variant === "ordered" ? "ol" : "ul",
		{
			className: `${styles.list} ${styles[variant]} ${depth > 0 ? styles.nested : ""}`.trim(),
		},
		items.map((item, index) => (
			<li key={item.key ?? index} className={styles.item}>
				<span className={styles.content}>{item.content}</span>
				{item.items?.length ? renderItems(item.items, variant, depth + 1) : null}
			</li>
		)),
	);

export function TextList({
	items,
	variant = "bullet",
	size = "m",
	className = "",
	...props
}: TextListProps) {
	return (
		<div className={`${styles.textList} ${styles[size]} ${className}`.trim()} {...props}>
			{renderItems(items, variant, 0)}
		</div>
	);
}
