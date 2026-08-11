export interface DakCheckBoxProps {
	id: string;
	label?: string;
	width?: string;
	checked?: boolean;
	disabled?: boolean;
	size?: "default" | "large";
	onChange?: (checked: boolean) => void;
}
