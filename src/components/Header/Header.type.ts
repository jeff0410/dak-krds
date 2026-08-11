import type React from "react";
import type { MainMenuItem } from "../MainMenu";
import type { SkipLinkItem } from "../SkipLink";

export type HeaderVariant = "horizontal" | "vertical";

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
	menu?: MainMenuItem[];
	utilityLinks?: HeaderUtilityLink[];
	iconActions?: HeaderIconAction[];
	masthead?: React.ReactNode;
	variant?: HeaderVariant;
	skipLinks?: SkipLinkItem[];
	skipTargetId?: string;
	skipLabel?: string;
	className?: string;
} & Omit<React.HTMLAttributes<HTMLElement>, "children">;
