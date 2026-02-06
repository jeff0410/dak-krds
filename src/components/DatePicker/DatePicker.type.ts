import type { LocalDate } from "@js-joda/core";

export interface BaseDatePickerProps {
	id: string;
	type?: "single" | "range";
	label?: string;
	/**
	 * input 요소의 title 속성 (스크린리더 접근성용)
	 * 예: "배송일자", "시작일", "종료일"
	 */
	inputTitle?: string;
	minYear?: number;
	maxYear?: number;
	minDate?: LocalDate | string | null;
	maxDate?: LocalDate | string | null;
	width?: string | number;
	height?: string | number;
	placeholder?: string;
	disabled?: boolean;
	isRequired?: boolean;
	className?: string;
	useMessage?: boolean;
	titlePosition?: "vertical" | "horizontal";

	gap?: string | number;
	titleClassName?: string;
	isValid?: boolean;

	usePortal?: boolean;
	portalGap?: number;
	scrollableElementId?: string;
}

export interface SingleModeProps extends BaseDatePickerProps {
	type?: "single";
	value?: LocalDate | string | null;
	onChange: (date: string) => void;
}

export interface RangeModeProps extends BaseDatePickerProps {
	type: "range";
	value?: LocalDate[] | string[] | null;
	onChange: (dates: string[]) => void;
}
export interface DayInfo {
	date: LocalDate;
	isCurrentMonth: boolean;
	isToday: boolean;
	isSelected: boolean;
	isDisabled: boolean;
	isRangeStart?: boolean;
	isRangeEnd?: boolean;
	isRangeMiddle?: boolean;
	isRangeStartOnly?: boolean;
	isRangeSingle?: boolean;
	isValid?: boolean;
}

export type DatePickerProps = SingleModeProps | RangeModeProps;
export type SingleDatePickerProps = Omit<SingleModeProps, "type">;
export type RangeDatePickerProps = Omit<RangeModeProps, "type">;
