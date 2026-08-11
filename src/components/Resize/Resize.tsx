import { useCallback, useEffect, useId, useRef, useState } from "react";
import { VisuallyHidden } from "../VisuallyHidden";
import styles from "./Resize.module.css";
import type { ResizeProps, ResizeScale } from "./Resize.type";

const DEFAULT_SCALES: ResizeScale[] = [
	{ label: "작게", value: 90 },
	{ label: "보통", value: 100 },
	{ label: "조금 크게", value: 110 },
	{ label: "크게", value: 130 },
	{ label: "가장 크게", value: 150 },
];

export function Resize({
	value,
	onChange,
	scales = DEFAULT_SCALES,
	label = "화면 크기 조정",
	icon,
	targetSelector,
	className = "",
	...props
}: ResizeProps) {
	const baseId = useId();
	const listId = `${baseId}-list`;
	const [isOpen, setIsOpen] = useState(false);
	const [internal, setInternal] = useState(100);
	const rootRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

	const scale = value ?? internal;
	const currentIndex = scales.findIndex((item) => item.value === scale);

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

	useEffect(() => {
		if (!targetSelector) return;
		const target = document.querySelector<HTMLElement>(targetSelector);
		if (!target) return;
		target.style.fontSize = `${scale}%`;
		return () => {
			target.style.fontSize = "";
		};
	}, [scale, targetSelector]);

	const select = (next: number) => {
		if (value === undefined) setInternal(next);
		onChange?.(next);
		close(true);
	};

	const moveFocus = (index: number, direction: 1 | -1) => {
		const next = (index + direction + scales.length) % scales.length;
		optionRefs.current[next]?.focus();
	};

	return (
		<div
			ref={rootRef}
			className={`${styles.resize} ${className}`.trim()}
			{...props}
		>
			<button
				type="button"
				ref={triggerRef}
				className={styles.trigger}
				aria-expanded={isOpen}
				aria-controls={listId}
				onClick={() => setIsOpen((open) => !open)}
			>
				{icon && (
					<span className={styles.icon} aria-hidden="true">
						{icon}
					</span>
				)}
				<span className={styles.triggerLabel}>{label}</span>
				<span className={styles.current}>
					<VisuallyHidden as="span">현재 </VisuallyHidden>
					{scales[currentIndex]?.label ?? `${scale}%`}
				</span>
				<span className={styles.chevron} aria-hidden="true" />
			</button>

			<ul
				id={listId}
				className={`${styles.list} ${isOpen ? styles.open : ""}`.trim()}
			>
				{scales.map((item, index) => (
					<li key={item.value}>
						<button
							type="button"
							ref={(node) => {
								optionRefs.current[index] = node;
							}}
							className={styles.option}
							aria-current={item.value === scale ? "true" : undefined}
							onClick={() => select(item.value)}
							onKeyDown={(event) => {
								if (event.key === "ArrowDown") {
									event.preventDefault();
									moveFocus(index, 1);
								}
								if (event.key === "ArrowUp") {
									event.preventDefault();
									moveFocus(index, -1);
								}
							}}
						>
							<span>{item.label}</span>
							<span className={styles.percent}>{item.value}%</span>
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
