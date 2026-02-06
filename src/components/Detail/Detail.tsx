import type * as React from "react";
import { colors, getColor } from "src/styles/color/color";
import styles from "./Detail.module.css";
import type { DetailProps } from "./Detail.type";

/**
 * Detail 컴포넌트 😸
 * 상세 정보를 렌더링하는 컴포넌트
 *
 * @param props - Detail 컴포넌트의 props
 * @param size - 텍스트 크기 (l, m, s)
 * @param weight - 텍스트 두께 (regular, bold)
 * @param children - 렌더링할 내용
 * @param className - 추가로 적용할 클래스 이름
 */

export function Detail<E extends React.ElementType = "span">({
	size = "m",
	weight = "regular",
	color = "gray-90",
	children,
	className = "",
	...props
}: DetailProps<E>) {
	const colorStyle: React.CSSProperties = {};
	if (color in colors) {
		colorStyle.color = getColor(color as keyof typeof colors);
	} else {
		colorStyle.color = color;
	}
	return (
		<span
			className={`${styles.detail} ${styles[`size_${size}`]} ${styles[`weight_${weight}`]} ${className}`.trim()}
			style={colorStyle}
			{...props}
		>
			{children}
		</span>
	);
}
