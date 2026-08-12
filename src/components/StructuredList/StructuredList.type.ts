import type React from "react";

export type StructuredListRow = {
	term: React.ReactNode;
	description: React.ReactNode;
	key?: string;
};

export type StructuredListLayout = "horizontal" | "vertical";

export type StructuredListProps = {
	rows: StructuredListRow[];
	title?: React.ReactNode;
	layout?: StructuredListLayout;
	bordered?: boolean;
	termWidth?: string;
	className?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title">;
