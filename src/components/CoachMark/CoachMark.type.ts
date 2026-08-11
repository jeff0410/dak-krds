import type React from "react";

export type CoachMarkStep = {
	targetId: string;
	title: React.ReactNode;
	instruction: React.ReactNode;
};

export type CoachMarkProps = {
	steps: CoachMarkStep[];
	open: boolean;
	onClose: () => void;
	onFinish?: () => void;
	step?: number;
	onStepChange?: (step: number) => void;
	skipLabel?: string;
	prevLabel?: string;
	nextLabel?: string;
	finishLabel?: string;
	confirmLabel?: string;
	className?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children">;
