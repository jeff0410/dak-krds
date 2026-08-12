import type React from "react";

export type MastheadProps = {
	maxWidth?: string;
	className?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children">;
