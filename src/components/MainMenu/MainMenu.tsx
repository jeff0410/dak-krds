import { useCallback, useEffect, useId, useRef, useState } from "react";
import a11y from "../../styles/a11y.module.css";
import styles from "./MainMenu.module.css";
import type {
	MainMenuGroup,
	MainMenuLeaf,
	MainMenuProps,
} from "./MainMenu.type";

const linkTargetProps = (item: MainMenuLeaf) =>
	item.external
		? { target: "_blank" as const, rel: "noreferrer noopener" as const }
		: {};

const toGroups = (
	groups?: MainMenuGroup[],
	items?: MainMenuLeaf[],
): MainMenuGroup[] => {
	if (groups?.length) return groups;
	if (items?.length) return [{ label: "", items }];
	return [];
};

export function MainMenu({
	items,
	label = "주메뉴",
	isMobileOpen = false,
	menuId,
	className = "",
	...props
}: MainMenuProps) {
	const baseId = useId();
	const [openIndex, setOpenIndex] = useState<number | null>(null);
	const navRef = useRef<HTMLElement>(null);
	const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

	const close = useCallback((focusIndex?: number) => {
		setOpenIndex(null);
		if (focusIndex !== undefined) triggerRefs.current[focusIndex]?.focus();
	}, []);

	useEffect(() => {
		if (openIndex === null) return;

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") close(openIndex);
		};
		const onPointerDown = (event: MouseEvent) => {
			if (!navRef.current?.contains(event.target as Node)) close();
		};

		document.addEventListener("keydown", onKeyDown);
		document.addEventListener("mousedown", onPointerDown);
		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.removeEventListener("mousedown", onPointerDown);
		};
	}, [openIndex, close]);

	return (
		<nav
			id={menuId}
			ref={navRef}
			aria-label={label}
			className={`${styles.mainMenu} ${isMobileOpen ? styles.mobileOpen : ""} ${className}`.trim()}
			{...props}
		>
			<ul className={styles.list}>
				{items.map((item, index) => {
					const groups = toGroups(item.groups, item.items);
					const panelId = `${baseId}-panel-${index}`;
					const isOpen = openIndex === index;

					if (!groups.length) {
						return (
							<li key={item.label} className={styles.item}>
								<a
									href={item.href}
									className={`${styles.trigger} ${styles.isLink}`}
									aria-current={item.current ? "page" : undefined}
								>
									{item.label}
								</a>
							</li>
						);
					}

					return (
						<li key={item.label} className={styles.item}>
							<button
								type="button"
								ref={(node) => {
									triggerRefs.current[index] = node;
								}}
								className={styles.trigger}
								aria-expanded={isOpen}
								aria-controls={panelId}
								aria-current={item.current ? "true" : undefined}
								onClick={() => setOpenIndex(isOpen ? null : index)}
							>
								{item.label}
								<span className={styles.chevron} aria-hidden="true" />
							</button>

							<div
								id={panelId}
								className={`${styles.panel} ${isOpen ? styles.open : ""}`.trim()}
							>
								{item.description && (
									<p className={styles.panelDescription}>{item.description}</p>
								)}
								<div className={styles.groupList}>
									{groups.map((group) => (
										<div
											key={group.label || item.label}
											className={styles.group}
										>
											{group.label &&
												(group.href ? (
													<a href={group.href} className={styles.groupTitle}>
														{group.label}
													</a>
												) : (
													<h3 className={styles.groupTitle}>{group.label}</h3>
												))}
											{group.description && (
												<p className={styles.groupDescription}>
													{group.description}
												</p>
											)}
											<ul className={styles.subList}>
												{group.items?.map((leaf) => (
													<li key={leaf.href}>
														<a
															href={leaf.href}
															className={styles.subLink}
															aria-current={leaf.current ? "page" : undefined}
															{...linkTargetProps(leaf)}
														>
															{leaf.label}
															{leaf.external && (
																<span className={a11y.srOnly}>새 창 열림</span>
															)}
														</a>
													</li>
												))}
											</ul>
										</div>
									))}
								</div>
							</div>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
