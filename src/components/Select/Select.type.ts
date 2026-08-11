import type { KeyboardEvent, ReactNode } from "react";

export type SelectSize = "l" | "m" | "s";
export type SelectVariant = "box" | "text";
export type SelectDirection = "vertical" | "horizontal";

export interface Option {
	[key: string]: string;
}

export interface CommonSelectProps {
	id?: string;
	label?: string;
	options: Option[];
	placeholder?: string;
	size?: SelectSize;
	variant?: SelectVariant;
	disabled?: boolean;
	width?: string | number; // 이제 항상 고정 폭으로 사용 (미지정 시 기본 200)
	className?: string;
	state?: "default" | "focused" | "completed" | "error" | "disabled" | "view";
	valueKey?: string;
	labelKey?: string;
	labelFontSize?: "xs" | "s" | "m" | "l";
	labelFontWeight?: "regular" | "bold";
	direction?: SelectDirection;
	selectWrapWidth?: string | number;
	maxVisibleItems?: number;
	scrollThreshold?: number;
	multiDisplaySeparator?: string;
	title?: string;
	/**
	 * multi 선택 표시 전략:
	 *  - ellipsis: 전체 라벨 join 후 CSS ellipsis 로 잘림
	 *  - count: 첫 번째 라벨 + " 외 N건" 형식
	 *  - tags: Tag 컴포넌트로 표시 (최대 maxTags개 + 추가 개수)
	 */
	multiDisplayStrategy?: "ellipsis" | "count" | "tags";
	/**
	 * tags 전략일 때 표시할 최대 태그 개수
	 * 기본: 3
	 */
	maxTags?: number;
	/**
	 * count 전략일 때 포맷. {first} / {count} 플레이스홀더 사용
	 * 기본: "{first} 외 {count}건"
	 */
	multiCountPattern?: string;
	type?: "single" | "multi";
	isValid?: boolean;
	error?: string;
	info?: string;
}

export interface SingleValueProps {
	type?: "single";
	value: string;
	onChange: (value: string) => void;
}

export interface MultiValueProps {
	type: "multi";
	value: string[];
	onChange: (value: string[]) => void;
}

export type SelectProps = CommonSelectProps &
	(SingleValueProps | MultiValueProps);

export interface SelectTriggerProps {
	onClick: () => void;
	children: ReactNode;
	isOpen: boolean;
	onKeyDown: (e: KeyboardEvent) => void;
	size?: SelectSize;
}

export interface SelectValueProps {
	placeholder: string;
	selectedValue: string | null;
	size?: SelectSize;
}

export interface SelectContentProps {
	isOpen: boolean;
	children: ReactNode;
}

export interface SelectGroupProps {
	children: ReactNode;
}

export interface SelectLabelProps {
	children: ReactNode;
	size?: SelectSize;
}

export interface SelectItemProps {
	size?: SelectSize;
	value: string;
	onClick: (value: string) => void;
	isSelected: boolean;
	isHovered: boolean;
	isFocused: boolean;
	children: ReactNode;
	onKeyDown: (e: KeyboardEvent) => void;
	onMouseEnter: () => void;
	onMouseLeave: () => void;
}
