import { createElement } from "react";
import styles from "./VisuallyHidden.module.css";
import type { VisuallyHiddenProps } from "./VisuallyHidden.type";

export function VisuallyHidden({
	as = "span",
	focusable = false,
	children,
	className = "",
	...props
}: VisuallyHiddenProps) {
	return createElement(
		as,
		{
			className:
				`${styles.visuallyHidden} ${focusable ? styles.focusable : ""} ${className}`.trim(),
			...props,
		},
		children,
	);
}
