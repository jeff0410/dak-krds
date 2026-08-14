import type { PropsWithChildren } from "react";
import { useId } from "react";
import styles from "./Header.module.css";

export const DialogModalHeader = ({ children }: PropsWithChildren) => {
	const titleId = useId();

	return (
		<div
			className={styles.dialogTitle}
			role="dialog"
			aria-modal="true"
			aria-labelledby={titleId}
		>
			<span id={titleId}>{children}</span>
		</div>
	);
};
