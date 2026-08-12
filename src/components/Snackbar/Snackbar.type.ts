import type React from "react";

export type SnackbarProps = {
	open: boolean;
	title: React.ReactNode;
	description?: React.ReactNode;
	icon?: React.ReactNode;
	actionLabel?: string;
	onAction?: () => void;
	onClose: () => void;
	duration?: number;
	closeLabel?: string;
	className?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title">;
