import type { ReactNode } from "react";
import styles from "./Tab.module.css";

interface TabPanelProps {
	children: ReactNode;
	id: string;
	tabId: string;
	isSelected: boolean;
}

export function TabPanel({ children, id, tabId, isSelected }: TabPanelProps) {
	return (
		<div
			role="tabpanel"
			id={id}
			aria-labelledby={tabId}
			className={`${isSelected ? "" : styles.hidden} ${styles.tabpannelLayout}`}
		>
			{children}
		</div>
	);
}
