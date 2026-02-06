import type { ReactNode } from "react";

export interface DrawerProps {
	position?: "top" | "bottom" | "left" | "right";
	open: boolean;
	setOpen: (open: boolean) => void;
	children?: ReactNode;
	parentId?: string;
	title?: ReactNode;
	className?: string;
}
