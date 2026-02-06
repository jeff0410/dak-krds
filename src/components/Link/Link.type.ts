import type * as React from "react";

export type LinkProps<E extends React.ElementType> = {
	size?: "l" | "m" | "s";
	weight?: "regular" | "bold";
	children: React.ReactNode;
	className?: string;
	title: string;
	useIcon?: boolean;
} & React.ComponentPropsWithoutRef<E>;
