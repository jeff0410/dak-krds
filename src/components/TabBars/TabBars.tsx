import a11y from "../../styles/a11y.module.css";
import styles from "./TabBars.module.css";
import type { TabBarItem, TabBarsProps } from "./TabBars.type";

const MAX_ITEMS = 5;

const renderInner = (item: TabBarItem) => (
	<>
		<span className={styles.icon} aria-hidden="true">
			{item.current ? (item.activeIcon ?? item.icon) : item.icon}
			{item.badge !== undefined && (
				<span className={styles.badge}>{item.badge}</span>
			)}
		</span>
		<span className={styles.label}>{item.label}</span>
		{item.badge !== undefined && (
			<span className={a11y.srOnly}>알림 {item.badge}건</span>
		)}
	</>
);

export function TabBars({
	items,
	label = "탭바",
	className = "",
	...props
}: TabBarsProps) {
	return (
		<nav
			aria-label={label}
			className={`${styles.tabBars} ${className}`.trim()}
			{...props}
		>
			<ul className={styles.list}>
				{items.slice(0, MAX_ITEMS).map((item) => (
					<li key={item.label} className={styles.item}>
						{item.href ? (
							<a
								href={item.href}
								className={`${styles.tab} ${item.current ? styles.current : ""}`.trim()}
								aria-current={item.current ? "page" : undefined}
								onClick={item.onClick}
							>
								{renderInner(item)}
							</a>
						) : (
							<button
								type="button"
								className={`${styles.tab} ${item.current ? styles.current : ""}`.trim()}
								aria-current={item.current ? "page" : undefined}
								onClick={item.onClick}
							>
								{renderInner(item)}
							</button>
						)}
					</li>
				))}
			</ul>
		</nav>
	);
}
