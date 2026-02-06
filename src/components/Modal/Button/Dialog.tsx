import type { PropsWithChildren } from "react";
import styles from "./Button.module.css";

export const DialogModalButton = ({ children }: PropsWithChildren) => {
	return <div className={styles.buttonWrapDialog}>{children}</div>;
};
