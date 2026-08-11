import type React from "react";

export type HeaderVariant = "horizontal" | "vertical";

export type HeaderSubMenuItem = {
	label: string;
	href: string;
	external?: boolean;
};

export type HeaderMenuItem = {
	label: string;
	href?: string;
	items?: HeaderSubMenuItem[];
};

export type HeaderUtilityLink = {
	label: string;
	href: string;
	external?: boolean;
};

export type HeaderIconAction = {
	label: string;
	icon: React.ReactNode;
	href?: string;
	onClick?: () => void;
};

export type HeaderProps = {
	logo: React.ReactNode;
	logoHref?: string;
	menu?: HeaderMenuItem[];
	utilityLinks?: HeaderUtilityLink[];
	iconActions?: HeaderIconAction[];
	masthead?: React.ReactNode;
	variant?: HeaderVariant;
	skipTargetId?: string;
	skipLabel?: string;
	className?: string;
} & Omit<React.HTMLAttributes<HTMLElement>, "children">;
