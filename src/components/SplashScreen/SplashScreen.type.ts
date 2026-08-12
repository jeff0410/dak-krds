import type React from "react";

export type SplashScreenProps = {
	logo: React.ReactNode;
	message?: React.ReactNode;
	showSpinner?: boolean;
	background?: string;
	label?: string;
	className?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children">;
