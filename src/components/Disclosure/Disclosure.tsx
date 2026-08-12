import { useId, useState } from "react";
import styles from "./Disclosure.module.css";
import type { DisclosureProps } from "./Disclosure.type";

export function Disclosure({
	title,
	children,
	defaultOpen = false,
	open,
	onToggle,
	className = "",
	...props
}: DisclosureProps) {
	const baseId = useId();
	const panelId = `${baseId}-panel`;
	const [internal, setInternal] = useState(defaultOpen);
	const isOpen = open ?? internal;

	const toggle = () => {
		const next = !isOpen;
		if (open === undefined) setInternal(next);
		onToggle?.(next);
	};

	return (
		<div className={`${styles.disclosure} ${className}`.trim()} {...props}>
			<button
				type="button"
				className={styles.trigger}
				aria-expanded={isOpen}
				aria-controls={panelId}
				onClick={toggle}
			>
				<span className={styles.chevron} aria-hidden="true" />
				<span className={styles.title}>{title}</span>
			</button>
			<div id={panelId} className={styles.panel} hidden={!isOpen}>
				{children}
			</div>
		</div>
	);
}
