import type React from "react";

export type BackButtonProps = {
	title?: React.ReactNode;
	label?: string;
	confirmMessage?: string;
	onBack?: () => void;
	className?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title">;
