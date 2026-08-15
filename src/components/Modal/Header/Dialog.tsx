import { useId } from "react";
import styles from "./Header.module.css";
import type { ModalHeaderProps } from "./Header.type";

export const DialogModalHeader = ({ title, children }: ModalHeaderProps) => {
	const titleId = useId();

	return (
		<div
			className={styles.dialogTitle}
			role="dialog"
			aria-modal="true"
			aria-labelledby={titleId}
		>
			<span id={titleId}>{title ?? children}</span>
		</div>
	);
};
