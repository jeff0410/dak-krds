import type React from "react";

export type FloatingAction = {
	label: string;
	icon: React.ReactNode;
	href?: string;
	onClick?: () => void;
};

export type FloatingButtonProps = {
	icon: React.ReactNode;
	label: string;
	onClick?: () => void;
	href?: string;
	actions?: FloatingAction[];
	showLabel?: boolean;
	offsetBottom?: string;
	className?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children">;
