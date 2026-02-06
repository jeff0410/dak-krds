export type BadgeProps = {
	label: string;
	variant?:
		| "default"
		| "primary"
		| "secondary"
		| "information"
		| "success"
		| "warning"
		| "point"
		| "danger"
		| "error";
	appearance?: "stroke" | "fill-strong" | "fill-soft";
	size?: "s" | "m";
	className?: string;
	width?: string;
	height?: string;
	radius?: string;
};
