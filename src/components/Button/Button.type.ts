import type * as React from "react";

export type ButtonColor =
	| "primary"
	| "secondary"
	| "teriary"
	| "text"
	| "gray"
	| "danger"
	| "danger-secondary"
	| "black"
	| "success"
	| "success-secondary"
	| "warning"
	| "outline"
	| "transparent"
	| "custom";

export type ButtonProps = {
	type?: "button" | "submit" | "reset";
	label?: string;
	variant?: ButtonColor;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
	className?: string;
	width?: string | number;
	height?: string | number;
	rounded?: string | number;
	padding?: string | number;
	borderColor?: string;
	useIcon?: boolean;
	icon?: React.ReactNode;
	children?: React.ReactNode;
	iconPosition?: "left" | "right";
	iconClassName?: string;
	size?: "xs" | "s" | "m" | "l" | "xl";
	color?: string;
	loading?: boolean;
	loadingText?: string;
	spinnerSize?: number;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;
