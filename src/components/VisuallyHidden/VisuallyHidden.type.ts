import type React from "react";

export type VisuallyHiddenProps = {
	as?: "span" | "div" | "p";
	focusable?: boolean;
	children: React.ReactNode;
	className?: string;
} & React.HTMLAttributes<HTMLElement>;
