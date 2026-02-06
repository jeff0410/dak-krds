/** biome-ignore-all lint/a11y/useAriaPropsSupportedByRole: <explanation> */
import type * as React from "react";
import styles from "./Link.module.css";
import type { LinkProps } from "./Link.type";

/**
 * Link 컴포넌트 😸
 * 링크(anchor) 컴포넌트
 *
 * @param props - Link 컴포넌트의 props
 * @param size - 링크 텍스트의 크기 (예: 's', 'm', 'l')
 * @param weight - 링크 텍스트의 두께 (예: 'regular', 'bold')
 * @param children - 렌더링할 텍스트 또는 노드
 * @param className - 추가로 적용할 클래스 이름
 * @param title - 링크의 title 및 aria-label 속성 값
 */

export function Link<E extends React.ElementType = "a">({
	size = "m",
	weight = "regular",
	children,
	className = "",
	title = "",
	...props
}: LinkProps<E>) {
	const sizeClass = styles[`size_${size}`] || "";
	const weightClass = styles[`weight_${weight}`] || "";
	const linkClass = styles.link || "";

	return (
		<a
			className={`${sizeClass} ${weightClass} ${linkClass} ${className}`.trim()}
			title={title}
			aria-label={title}
			{...props}
		>
			{children}
		</a>
	);
}
