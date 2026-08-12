import type React from "react";

export type CriticalAlertLevel = "high" | "medium" | "low";

export type CriticalAlertsProps = {
	level?: CriticalAlertLevel;
	levelLabel?: string;
	message: React.ReactNode;
	icon?: React.ReactNode;
	linkLabel?: string;
	linkHref?: string;
	linkExternal?: boolean;
	className?: string;
} & Omit<React.HTMLAttributes<HTMLElement>, "children">;
