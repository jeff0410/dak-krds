import { useCallback, useEffect, useState } from "react";
import styles from "./InPageNavigation.module.css";
import type { InPageNavigationProps } from "./InPageNavigation.type";

export function InPageNavigation({
	items,
	title = "이 페이지의 구성",
	sticky = true,
	offset = 0,
	onActiveChange,
	className = "",
	...props
}: InPageNavigationProps) {
	const [activeId, setActiveId] = useState(items[0]?.targetId ?? "");

	useEffect(() => {
		if (!items.length) return;

		const updateActiveSection = () => {
			const boundary = offset + 1;
			let current = items[0].targetId;

			for (const item of items) {
				const section = document.getElementById(item.targetId);
				if (!section) continue;
				if (section.getBoundingClientRect().top <= boundary)
					current = item.targetId;
			}

			setActiveId((previous) => {
				if (previous === current) return previous;
				onActiveChange?.(current);
				return current;
			});
		};

		updateActiveSection();
		window.addEventListener("scroll", updateActiveSection, { passive: true });
		window.addEventListener("resize", updateActiveSection);
		return () => {
			window.removeEventListener("scroll", updateActiveSection);
			window.removeEventListener("resize", updateActiveSection);
		};
	}, [items, offset, onActiveChange]);

	const handleClick = useCallback(
		(targetId: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
			const section = document.getElementById(targetId);
			if (!section) return;

			event.preventDefault();
			if (!section.hasAttribute("tabindex"))
				section.setAttribute("tabindex", "-1");
			section.focus({ preventScroll: true });
			if (typeof section.scrollIntoView === "function")
				section.scrollIntoView({ block: "start" });
			setActiveId(targetId);
		},
		[],
	);

	return (
		<nav
			aria-label={title}
			className={`${styles.inPageNavigation} ${sticky ? styles.sticky : ""} ${className}`.trim()}
			{...props}
		>
			<h2 className={styles.header}>{title}</h2>
			<ul className={styles.list}>
				{items.map((item) => (
					<li
						key={item.targetId}
						className={`${styles.item} ${styles[`level${item.level ?? 1}`]} ${
							activeId === item.targetId ? styles.active : ""
						}`.trim()}
					>
						<a
							href={`#${item.targetId}`}
							className={styles.link}
							aria-current={activeId === item.targetId ? "true" : undefined}
							onClick={handleClick(item.targetId)}
						>
							{item.label}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
