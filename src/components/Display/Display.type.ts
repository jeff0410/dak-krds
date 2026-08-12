import type * as React from "react";

export type DisplayProps<E extends React.ElementType> = {
	as?: E;
	size?: "l" | "m" | "s";
	color?: string;
	children: React.ReactNode;
	className?: string;
} & Omit<React.ComponentPropsWithoutRef<E>, "as" | "color" | "children">;
