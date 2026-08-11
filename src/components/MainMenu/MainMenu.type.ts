import type React from "react";

export type MainMenuLeaf = {
	label: string;
	href: string;
	external?: boolean;
	current?: boolean;
};

export type MainMenuGroup = {
	label: string;
	href?: string;
	description?: string;
	items?: MainMenuLeaf[];
};

export type MainMenuItem = {
	label: string;
	href?: string;
	current?: boolean;
	description?: string;
	groups?: MainMenuGroup[];
	items?: MainMenuLeaf[];
};

export type MainMenuProps = {
	items: MainMenuItem[];
	label?: string;
	isMobileOpen?: boolean;
	menuId?: string;
	className?: string;
} & Omit<React.HTMLAttributes<HTMLElement>, "children">;
