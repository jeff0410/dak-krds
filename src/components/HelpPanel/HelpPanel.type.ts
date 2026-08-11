import type React from "react";

export type HelpPanelLink = {
	label: string;
	href: string;
	external?: boolean;
};

export type HelpPanelProps = {
	open: boolean;
	onClose: () => void;
	title: React.ReactNode;
	children: React.ReactNode;
	links?: HelpPanelLink[];
	closeLabel?: string;
	width?: string;
	className?: string;
} & Omit<React.HTMLAttributes<HTMLElement>, "children" | "title">;
