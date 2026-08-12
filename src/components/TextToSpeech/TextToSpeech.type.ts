import type React from "react";

export type TextToSpeechProps = {
	targetSelector?: string;
	text?: string;
	lang?: string;
	rate?: number;
	label?: string;
	playLabel?: string;
	pauseLabel?: string;
	stopLabel?: string;
	className?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "lang">;
