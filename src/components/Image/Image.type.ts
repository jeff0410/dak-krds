import type React from "react";

export type ImageRatio = "1:1" | "4:3" | "16:9" | "3:2" | "auto";
export type ImageFit = "cover" | "contain";

export type ImageProps = {
	src: string;
	alt: string;
	ratio?: ImageRatio;
	fit?: ImageFit;
	caption?: React.ReactNode;
	longDescription?: React.ReactNode;
	rounded?: boolean;
	className?: string;
} & Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "alt">;
