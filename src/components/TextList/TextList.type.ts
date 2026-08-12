import type React from "react";

export type TextListItem = {
	content: React.ReactNode;
	items?: TextListItem[];
	key?: string;
};

export type TextListVariant = "bullet" | "ordered" | "none" | "dash";

export type TextListProps = {
	items: TextListItem[];
	variant?: TextListVariant;
	size?: "s" | "m";
	className?: string;
} & Omit<React.HTMLAttributes<HTMLElement>, "children">;
