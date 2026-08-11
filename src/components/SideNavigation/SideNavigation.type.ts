import type React from "react";

export type SideNavigationSubItem = {
	label: string;
	href: string;
	current?: boolean;
};

export type SideNavigationItem = {
	label: string;
	href?: string;
	current?: boolean;
	defaultOpen?: boolean;
	dividerAfter?: boolean;
	items?: SideNavigationSubItem[];
};

export type SideNavigationProps = {
	items: SideNavigationItem[];
	title?: string;
	titleHref?: string;
	label?: string;
	className?: string;
} & Omit<React.HTMLAttributes<HTMLElement>, "children" | "title">;
