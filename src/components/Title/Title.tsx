import type React from "react";
import { colors, getColor } from "src/styles/color/color";
import styles from "./Title.module.css";
import type { TitleProps } from "./Title.type";

/**
 * Title 컴포넌트 😸
 *  (기본값: 'h3')
 * @param props - Title 컴포넌트의 props
 * @param size - 제목의 크기 ('1' | '2' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl')
 * @param color - 제목의 색상
 * @param children - 제목 내부에 렌더링할 내용
 * @param className - 추가로 적용할 클래스 이름
 * @param weight - 폰트 굵기 ('bold' | 'semi-bold' | 'medium' | 'regular')
 */

export function Title<E extends React.ElementType = "h3">({
	size = 1,
	color = "gray-90",
	children,
	className = "",
	weight = "bold",
	...props
}: TitleProps<E>) {
	const titleClass = styles.title;
	const sizeClass = styles[`size_${size}`];
	const fontWeifht = `font-dak-${weight}`;

	const colorStyle: React.CSSProperties = {};
	if (color in colors) {
		colorStyle.color = getColor(color as keyof typeof colors);
	} else {
		colorStyle.color = color;
	}

	return (
		<h3
			className={`${titleClass} ${sizeClass} ${fontWeifht} ${className}`.trim()}
			style={colorStyle}
			{...props}
		>
			{children}
		</h3>
	);
}
