import type React from "react";

export type FooterLink = {
	label: string;
	href: string;
	external?: boolean;
	emphasis?: boolean;
};

export type FooterContact = {
	label: string;
	value: string;
	href?: string;
};

export type FooterSocial = {
	label: string;
	href: string;
	icon: React.ReactNode;
};

export type FooterProps = {
	logo?: React.ReactNode;
	contacts?: FooterContact[];
	utilityLinks?: FooterLink[];
	socials?: FooterSocial[];
	policyLinks: FooterLink[];
	copyright: string;
	identifier?: React.ReactNode;
	className?: string;
} & Omit<React.HTMLAttributes<HTMLElement>, "children">;
