import { useEffect } from "react";
import { Icon } from "../Icon";
import a11y from "../../styles/a11y.module.css";
import styles from "./Snackbar.module.css";
import type { SnackbarProps } from "./Snackbar.type";

export function Snackbar({
	open,
	title,
	description,
	icon,
	actionLabel,
	onAction,
	onClose,
	duration = 0,
	closeLabel = "닫기",
	className = "",
	...props
}: SnackbarProps) {
	useEffect(() => {
		if (!open || duration <= 0) return;
		const timer = window.setTimeout(onClose, duration);
		return () => window.clearTimeout(timer);
	}, [open, duration, onClose]);

	if (!open) return null;

	return (
		<div
			role="status"
			aria-live="polite"
			className={`${styles.snackbar} ${className}`.trim()}
			{...props}
		>
			{icon && (
				<span className={styles.icon} aria-hidden="true">
					{icon}
				</span>
			)}

			<div className={styles.content}>
				<p className={styles.title}>{title}</p>
				{description && <p className={styles.description}>{description}</p>}
			</div>

			{actionLabel && (
				<button type="button" className={styles.action} onClick={onAction}>
					{actionLabel}
				</button>
			)}

			<button type="button" className={styles.close} onClick={onClose}>
				<Icon icon="Close" size={20} />
				<span className={a11y.srOnly}>{closeLabel}</span>
			</button>
		</div>
	);
}
