export type CheckboxStatus = "on" | "off" | "indeterminate";

export type CheckboxProps = {
	id: string;
	status: CheckboxStatus;
	onChange: (newStatus: CheckboxStatus) => void;
	label?: string;
	disabled?: boolean;
	size?: "m" | "l";
	accentColor?: string;
	labelClassName?: string;
	/** 스크린리더용 접근성 레이블 (시각적으로 숨겨진 레이블이 필요한 경우) */
	title?: string;
};

export type CheckboxOption = Record<string, string>;

export type CheckboxGroupProps = {
	id?: string;
	options: CheckboxOption[];
	values: string[];
	onChange: (newValues: string[]) => void;
	disabled?: boolean;
	size?: "m" | "l";
	labelKey?: string;
	valueKey?: string;
	direction?: "horizontal" | "vertical";
	className?: string;
};
