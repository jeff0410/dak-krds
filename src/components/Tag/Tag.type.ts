export interface TagProps {
	label: string;
	size?: "s" | "m" | "l";
	variant?: "text" | "removable";
	disabled?: boolean;
	onDelete?: (label: string) => void;
	className?: string;
}
