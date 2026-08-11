import type React from "react";

export type TabBarItem = {
	label: string;
	icon: React.ReactNode;
	activeIcon?: React.ReactNode;
	href?: string;
	onClick?: () => void;
	current?: boolean;
	badge?: number | string;
};

export type TabBarsProps = {
	items: TabBarItem[];
	label?: string;
	className?: string;
} & Omit<React.HTMLAttributes<HTMLElement>, "children">;
