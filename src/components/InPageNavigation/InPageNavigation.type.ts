import type React from "react";

export type InPageNavigationItem = {
	label: string;
	targetId: string;
	level?: 1 | 2 | 3;
};

export type InPageNavigationProps = {
	items: InPageNavigationItem[];
	title?: string;
	sticky?: boolean;
	offset?: number;
	onActiveChange?: (targetId: string) => void;
	className?: string;
} & Omit<React.HTMLAttributes<HTMLElement>, "children" | "title">;
