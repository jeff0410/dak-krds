export interface TimeSelectorProps {
	value?: string;
	onChange: (value: string) => void;
	height?: "40px" | "48px" | "56px" | string | number;
	placeholder?: string;
	width?: string;
	useAP?: boolean;
}

export interface TimeSelectorPopupProps {
	visible: boolean;
	setVisible: (visible: boolean) => void;
	time?: string;
	onUpdateTime: (h: string, m: string) => void;
}
