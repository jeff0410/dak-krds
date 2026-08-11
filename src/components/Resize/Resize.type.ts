import type React from "react";

export type ResizeScale = {
	label: string;
	value: number;
};

export type ResizeProps = {
	value?: number;
	onChange?: (value: number) => void;
	scales?: ResizeScale[];
	label?: string;
	icon?: React.ReactNode;
	targetSelector?: string;
	className?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onChange">;
