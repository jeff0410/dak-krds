import type React from "react";

export type QuantityToggleSize = "s" | "m";

export type QuantityToggleProps = {
	label: string;
	value: number;
	onChange: (value: number) => void;
	min?: number;
	max?: number;
	step?: number;
	size?: QuantityToggleSize;
	hideLabel?: boolean;
	disabled?: boolean;
	unit?: string;
	id?: string;
	className?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onChange">;
