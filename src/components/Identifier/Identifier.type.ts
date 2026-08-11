import type React from "react";

export type IdentifierVariant = "light" | "dark";

export type IdentifierProps = {
	organization: string;
	logoSrc?: string;
	logoAlt?: string;
	variant?: IdentifierVariant;
	className?: string;
} & Omit<React.HTMLAttributes<HTMLElement>, "children">;
