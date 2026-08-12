import { useEffect, useId, useRef } from "react";
import { Icon } from "../Icon";
import { VisuallyHidden } from "../VisuallyHidden";
import styles from "./HelpPanel.module.css";
import type { HelpPanelProps } from "./HelpPanel.type";

export function HelpPanel({
	open,
	onClose,
	title,
	children,
	links = [],
	closeLabel = "도움 패널 닫기",
	width = "380px",
	className = "",
	...props
}: HelpPanelProps) {
	const baseId = useId();
	const titleId = `${baseId}-title`;
	const panelRef = useRef<HTMLElement>(null);

	useEffect(() => {
		if (!open) return;
		panelRef.current?.focus({ preventScroll: true });
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") onClose();
		};
		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [open, onClose]);

	if (!open) return null;

	return (
		<aside
			ref={panelRef}
			role="complementary"
			aria-labelledby={titleId}
			tabIndex={-1}
			className={`${styles.helpPanel} ${className}`.trim()}
			style={{ width }}
			{...props}
		>
			<div className={styles.header}>
				<h2 id={titleId} className={styles.title}>
					{title}
				</h2>
				<button type="button" className={styles.close} onClick={onClose}>
					<Icon icon="Close" size={24} />
					<VisuallyHidden as="span">{closeLabel}</VisuallyHidden>
				</button>
			</div>

			<div className={styles.body}>{children}</div>

			{links.length > 0 && (
				<nav aria-label="관련 도움말" className={styles.links}>
					<ul className={styles.linkList}>
						{links.map((link) => (
							<li key={link.href}>
								<a
									href={link.href}
									className={styles.link}
									{...(link.external
										? { target: "_blank", rel: "noreferrer noopener" }
										: {})}
								>
									{link.label}
									{link.external && <VisuallyHidden>새 창 열림</VisuallyHidden>}
								</a>
							</li>
						))}
					</ul>
				</nav>
			)}
		</aside>
	);
}
