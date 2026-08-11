import * as React from "react";
import { colors, getColor } from "../../styles/color/color";
import styles from "./Heading.module.css";
import type { HeadingProps } from "./Heading.type";

/**
 * Heading 컴포넌트 😸🐖
 * 제목(헤딩) 텍스트
 *
 * @param props - Heading 컴포넌트의 props
 * @param size - 헤딩의 레벨(h1~h6), 기본값 1
 * @param color - 헤딩 텍스트의 색상
 * @param children - 렌더링할 텍스트 또는 React 노드
 * @param className - 추가로 적용할 클래스 이름
 */

export function Heading({
	size = 1,
	color = "gray-90",
	children,
	className = "",
	...props
}: HeadingProps): React.ReactElement {
	const tag = `h${size}` as "h1" | "h2" | "h3" | "h4" | "h5";

	const colorStyle: React.CSSProperties = {};
	if (color in colors) {
		colorStyle.color = getColor(color as keyof typeof colors);
	} else {
		colorStyle.color = color;
	}

	return React.createElement(
		tag,
		{
			className: `${styles.heading} ${styles[`h${size}`]} ${className}`.trim(),
			style: colorStyle,
			...props,
		},
		children,
	);
}
