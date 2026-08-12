import { createElement } from "react";
import type * as React from "react";
import { colors, getColor } from "src/styles/color/color";
import styles from "./Display.module.css";
import type { DisplayProps } from "./Display.type";

export function Display<E extends React.ElementType = "div">({
	as,
	size = "m",
	children,
	color = "gray-90",
	className = "",
	...props
}: DisplayProps<E>) {
	const sizeClass = styles[`size_${size}`];
	const weightClass = styles.weight_bold;
	const displayClass = styles.display;

	const colorStyle: React.CSSProperties = {};
	if (color in colors) {
		colorStyle.color = getColor(color as keyof typeof colors);
	} else {
		colorStyle.color = color;
	}

	return createElement(
		as ?? "div",
		{
			className:
				`${displayClass} ${sizeClass} ${weightClass} ${className}`.trim(),
			style: colorStyle,
			...props,
		},
		children,
	);
}
