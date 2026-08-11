import type React from "react";

export type ContextualHelpVariant = "info" | "help";
export type ContextualHelpPlacement =
	| "top-start" | "top" | "top-end"
	| "bottom-start" | "bottom" | "bottom-end";

export type ContextualHelpProps = {
	title?: React.ReactNode;
	children: React.ReactNode;
	variant?: ContextualHelpVariant;
	placement?: ContextualHelpPlacement;
	label?: string;
	closeLabel?: string;
	className?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title">;
