import type React from "react";

export type SkipLinkVariant = "hidden" | "visible";

export type SkipLinkItem = {
	label: string;
	targetId: string;
};

export type SkipLinkProps = {
	items: SkipLinkItem[];
	variant?: SkipLinkVariant;
	className?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children">;
