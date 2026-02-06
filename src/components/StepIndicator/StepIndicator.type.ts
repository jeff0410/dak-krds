import type { ReactNode } from "react";

export type StepStatus = "completion" | "ongoing" | "before";

export interface Step {
	description: ReactNode;
}

export interface StepIndicatorProps {
	steps: Step[];
	currentStepIndex: number;
	className?: string;
	align?: "left" | "center";
	variant?: "line" | "box";
	onClickStep?: (index: number) => void;
	focusable?: boolean;
}
