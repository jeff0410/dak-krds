import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Icon } from "../Icon";
import { VisuallyHidden } from "../VisuallyHidden";
import styles from "./ContextualHelp.module.css";
import type { ContextualHelpProps } from "./ContextualHelp.type";

export function ContextualHelp({
	title,
	children,
	variant = "info",
	placement = "bottom-start",
	label,
	closeLabel = "도움말 닫기",
	className = "",
	...props
}: ContextualHelpProps) {
	const baseId = useId();
	const panelId = `${baseId}-panel`;
	const titleId = title ? `${baseId}-title` : undefined;
	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);

	const close = useCallback((focusTrigger = false) => {
		setIsOpen(false);
		if (focusTrigger) triggerRef.current?.focus();
	}, []);

	useEffect(() => {
		if (!isOpen) return;
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") close(true);
		};
		const onPointerDown = (event: MouseEvent) => {
			if (!rootRef.current?.contains(event.target as Node)) close();
		};
		document.addEventListener("keydown", onKeyDown);
		document.addEventListener("mousedown", onPointerDown);
		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.removeEventListener("mousedown", onPointerDown);
		};
	}, [isOpen, close]);

	const triggerLabel = label ?? (variant === "info" ? "추가 정보" : "도움말");

	return (
		<div
			ref={rootRef}
			className={`${styles.contextualHelp} ${className}`.trim()}
			{...props}
		>
			<button
				type="button"
				ref={triggerRef}
				className={`${styles.trigger} ${styles[variant]}`}
				aria-expanded={isOpen}
				aria-controls={panelId}
				onClick={() => setIsOpen((open) => !open)}
			>
				<span className={styles.triggerMark} aria-hidden="true">
					{variant === "info" ? "i" : "?"}
				</span>
				<VisuallyHidden as="span">{triggerLabel}</VisuallyHidden>
			</button>

			<div
				id={panelId}
				role="dialog"
				aria-labelledby={titleId}
				className={`${styles.panel} ${styles[`placement_${placement.replace("-", "_")}`]} ${isOpen ? styles.open : ""}`.trim()}
			>
				{title && (
					<h3 id={titleId} className={styles.title}>
						{title}
					</h3>
				)}
				<div className={styles.body}>{children}</div>
				<button
					type="button"
					className={styles.close}
					onClick={() => close(true)}
				>
					<Icon icon="Close" size={20} />
					<VisuallyHidden as="span">{closeLabel}</VisuallyHidden>
				</button>
			</div>
		</div>
	);
}
