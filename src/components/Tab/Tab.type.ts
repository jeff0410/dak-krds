import type React from "react";
import type { CSSProperties, ReactNode } from "react";

export interface TabProps {
	id: string;
	label: string;
	content: ReactNode | (() => ReactNode);
	disabled?: boolean;
}

export interface TabsProps {
	tabs: TabProps[];
	variant?: "underline" | "plain" | "box" | "fill";
	selectedIndex?: number;
	onChange?: (index: number) => void;
	width?: string;
	gap?: string | number;
	tabHeight?: string;
	sideButton?: ReactNode; // 사이드 버튼 추가
	overflowX?: CSSProperties["overflowX"];
	overflowY?: CSSProperties["overflowY"];
	tabListPosition?: string;
}

export type InternalTabProps = Omit<TabProps, "content"> & {
	isSelected: boolean;
	onClick: () => void;
	onKeyDown?: (e: React.KeyboardEvent) => void;
	id: string;
	panelId: string;
	variant?: "underline" | "plain" | "box" | "fill";
	tabIndex?: number;
};
