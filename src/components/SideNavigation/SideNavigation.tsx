import { useId, useState } from "react";
import styles from "./SideNavigation.module.css";
import type { SideNavigationItem, SideNavigationProps } from "./SideNavigation.type";

const initialOpenKeys = (items: SideNavigationItem[]) =>
	items.reduce<string[]>((keys, item) => {
		const hasCurrentChild = item.items?.some((sub) => sub.current);
		if (item.defaultOpen || hasCurrentChild) keys.push(item.label);
		return keys;
	}, []);

export function SideNavigation({
	items,
	title,
	titleHref,
	label = "사이드 메뉴",
	className = "",
	...props
}: SideNavigationProps) {
	const baseId = useId();
	const [openKeys, setOpenKeys] = useState<string[]>(() =>
		initialOpenKeys(items),
	);

	const toggle = (key: string) =>
		setOpenKeys((keys) =>
			keys.includes(key) ? keys.filter((k) => k !== key) : [...keys, key],
		);

	return (
		<nav
			aria-label={label}
			className={`${styles.sideNavigation} ${className}`.trim()}
			{...props}
		>
			{title &&
				(titleHref ? (
					<a href={titleHref} className={styles.title}>
						{title}
					</a>
				) : (
					<h2 className={styles.title}>{title}</h2>
				))}

			<ul className={styles.list}>
				{items.map((item, index) => {
					const hasItems = Boolean(item.items?.length);
					const isOpen = openKeys.includes(item.label);
					const submenuId = `${baseId}-submenu-${index}`;

					return (
						<li
							key={item.label}
							className={`${styles.item} ${item.dividerAfter ? styles.divided : ""}`.trim()}
						>
							{hasItems ? (
								<button
									type="button"
									className={`${styles.button} ${styles.toggle} ${item.current ? styles.selected : ""}`.trim()}
									aria-expanded={isOpen}
									aria-controls={submenuId}
									onClick={() => toggle(item.label)}
								>
									{item.label}
									<span className={styles.chevron} aria-hidden="true" />
								</button>
							) : (
								<a
									href={item.href}
									className={`${styles.button} ${styles.link} ${item.current ? styles.selected : ""}`.trim()}
									aria-current={item.current ? "page" : undefined}
								>
									{item.label}
								</a>
							)}

							{hasItems && (
								<ul id={submenuId} className={styles.submenu} hidden={!isOpen}>
									{item.items?.map((sub) => (
										<li key={sub.href} className={styles.subitem}>
											<a
												href={sub.href}
												className={`${styles.subLink} ${sub.current ? styles.selected : ""}`.trim()}
												aria-current={sub.current ? "page" : undefined}
											>
												{sub.label}
											</a>
										</li>
									))}
								</ul>
							)}
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
