import type React from "react";

export type RangeSliderProps = {
	label: string;
	value: number;
	onChange: (value: number) => void;
	min?: number;
	max?: number;
	step?: number;
	unit?: string;
	showRange?: boolean;
	formatValue?: (value: number) => string;
	disabled?: boolean;
	id?: string;
	className?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onChange">;
