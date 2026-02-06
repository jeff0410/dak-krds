import type React from "react";

export type TitleProps<E extends React.ElementType> = {
	size?: 1 | 2 | "xxl" | "xl" | "l" | "m" | "s" | "xs";
	children: React.ReactNode;
	className?: string;
	weight?: "bold" | "semi-bold" | "medium" | "regular";
} & React.ComponentPropsWithoutRef<E>;
