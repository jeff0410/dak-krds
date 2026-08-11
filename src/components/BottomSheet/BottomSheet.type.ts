import type React from "react";

export type BottomSheetProps = {
	open: boolean;
	onClose: () => void;
	title?: React.ReactNode;
	description?: React.ReactNode;
	children?: React.ReactNode;
	showHandle?: boolean;
	closeLabel?: string;
	maxHeight?: string;
	className?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title">;
