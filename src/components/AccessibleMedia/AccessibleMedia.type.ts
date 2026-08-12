import type React from "react";

export type MediaTrack = {
	kind: "captions" | "subtitles" | "descriptions" | "chapters";
	src: string;
	srcLang: string;
	label: string;
	default?: boolean;
};

export type AccessibleMediaProps = {
	src: string;
	type?: "video" | "audio";
	title: string;
	poster?: string;
	tracks?: MediaTrack[];
	transcript?: React.ReactNode;
	transcriptLabel?: string;
	description?: React.ReactNode;
	className?: string;
} & Omit<React.HTMLAttributes<HTMLElement>, "children" | "title">;
