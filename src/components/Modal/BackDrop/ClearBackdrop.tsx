import type { PropsWithChildren } from "react";
import styles from "./Backdrop.module.css";

export const ClearBackdrop = ({
	children,
	staticBackdrop,
}: PropsWithChildren<{ staticBackdrop?: boolean }>) => {
	return (
		<div
			id="backdrop"
			className={styles.clearBackdrop}
			style={{
				opacity: staticBackdrop ? "1" : "0",
			}}
		>
			<div id="modal-content" className={styles.contentWrapper}>
				{children}
			</div>
		</div>
	);
};
