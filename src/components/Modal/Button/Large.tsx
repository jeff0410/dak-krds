import type { HTMLAttributes, PropsWithChildren } from "react";
import styles from "./Button.module.css";

export const LargeModalButton = ({
	children,
	className = "",
	...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => {
	return (
		<div
			{...props}
			className={`${className} ${styles.buttonWrap} ${styles.buttonWrapLarge}`}
		>
			{children}
		</div>
	);
};
