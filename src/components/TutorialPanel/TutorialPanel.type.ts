import type React from "react";

export type TutorialStep = {
	title: React.ReactNode;
	content: React.ReactNode;
	media?: React.ReactNode;
};

export type TutorialPanelProps = {
	steps: TutorialStep[];
	title: React.ReactNode;
	open: boolean;
	onClose: () => void;
	step?: number;
	onStepChange?: (step: number) => void;
	closeLabel?: string;
	prevLabel?: string;
	nextLabel?: string;
	finishLabel?: string;
	className?: string;
} & Omit<React.HTMLAttributes<HTMLElement>, "children" | "title">;
