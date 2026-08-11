import type React from "react";
import styles from "./SkipLink.module.css";
import type { SkipLinkProps } from "./SkipLink.type";

const moveFocusTo = (targetId: string) => {
	const target = document.getElementById(targetId);
	if (!target) return false;

	if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
	target.focus({ preventScroll: true });
	if (typeof target.scrollIntoView === "function")
		target.scrollIntoView({ block: "start" });
	return true;
};

export function SkipLink({
	items,
	variant = "hidden",
	className = "",
	...props
}: SkipLinkProps) {
	const handleClick =
		(targetId: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
			if (moveFocusTo(targetId)) event.preventDefault();
		};

	return (
		<div
			className={`${styles.skipLink} ${styles[variant]} ${className}`.trim()}
			{...props}
		>
			<ul className={styles.list}>
				{items.slice(0, 3).map((item) => (
					<li key={item.targetId}>
						<a
							href={`#${item.targetId}`}
							className={styles.link}
							onClick={handleClick(item.targetId)}
						>
							{item.label}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}
