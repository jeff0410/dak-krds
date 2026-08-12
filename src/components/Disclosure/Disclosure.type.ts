import type React from "react";

export type DisclosureProps = {
	title: React.ReactNode;
	children: React.ReactNode;
	defaultOpen?: boolean;
	open?: boolean;
	onToggle?: (open: boolean) => void;
	className?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title" | "onToggle">;
