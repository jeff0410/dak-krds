import { useCallback, useEffect, useId, useRef, useState } from "react";
import { VisuallyHidden } from "../VisuallyHidden";
import styles from "./FloatingButton.module.css";
import type { FloatingButtonProps } from "./FloatingButton.type";

export function FloatingButton({
	icon,
	label,
	onClick,
	href,
	actions = [],
	showLabel = false,
	offsetBottom,
	className = "",
	...props
}: FloatingButtonProps) {
	const baseId = useId();
	const listId = `${baseId}-actions`;
	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const isExpandable = actions.length > 0;

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

	const main = (
		<>
			<span className={styles.icon} aria-hidden="true">
				{icon}
			</span>
			{showLabel ? (
				<span className={styles.label}>{label}</span>
			) : (
				<VisuallyHidden as="span">{label}</VisuallyHidden>
			)}
		</>
	);

	return (
		<div
			ref={rootRef}
			className={`${styles.floatingButton} ${className}`.trim()}
			style={offsetBottom ? { bottom: offsetBottom } : undefined}
			{...props}
		>
			{isExpandable && (
				<ul
					id={listId}
					className={`${styles.actions} ${isOpen ? styles.open : ""}`.trim()}
				>
					{actions.slice(0, 3).map((action) => (
						<li key={action.label}>
							{action.href ? (
								<a href={action.href} className={styles.action}>
									<span className={styles.actionLabel}>{action.label}</span>
									<span className={styles.actionIcon} aria-hidden="true">
										{action.icon}
									</span>
								</a>
							) : (
								<button
									type="button"
									className={styles.action}
									onClick={() => {
										action.onClick?.();
										close(true);
									}}
								>
									<span className={styles.actionLabel}>{action.label}</span>
									<span className={styles.actionIcon} aria-hidden="true">
										{action.icon}
									</span>
								</button>
							)}
						</li>
					))}
				</ul>
			)}

			{isExpandable ? (
				<button
					type="button"
					ref={triggerRef}
					className={`${styles.trigger} ${showLabel ? styles.extended : ""}`.trim()}
					aria-expanded={isOpen}
					aria-controls={listId}
					onClick={() => setIsOpen((open) => !open)}
				>
					{main}
				</button>
			) : href ? (
				<a
					href={href}
					className={`${styles.trigger} ${showLabel ? styles.extended : ""}`.trim()}
					onClick={onClick}
				>
					{main}
				</a>
			) : (
				<button
					type="button"
					className={`${styles.trigger} ${showLabel ? styles.extended : ""}`.trim()}
					onClick={onClick}
				>
					{main}
				</button>
			)}
		</div>
	);
}
