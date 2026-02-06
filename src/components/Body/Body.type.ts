import type * as React from "react";

export type BodyProps<E extends React.ElementType = "p"> = {
	size?: 1 | 2;
	weight?: "regular" | "semibold" | "bold";
	color?: string;
	label?: string;
	children?: React.ReactNode;
	className?: string;
} & React.ComponentPropsWithoutRef<E>;
