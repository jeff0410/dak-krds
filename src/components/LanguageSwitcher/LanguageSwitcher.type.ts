import type React from "react";

export type LanguageOption = {
	code: string;
	nativeName: string;
	localName?: string;
	href?: string;
	external?: boolean;
};

export type LanguageSwitcherProps = {
	languages: LanguageOption[];
	current: string;
	onSelect?: (code: string) => void;
	label?: string;
	icon?: React.ReactNode;
	className?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onSelect">;
