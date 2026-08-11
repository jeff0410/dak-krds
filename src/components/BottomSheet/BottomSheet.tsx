import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Icon } from "../Icon";
import styles from "./BottomSheet.module.css";
import type { BottomSheetProps } from "./BottomSheet.type";

const DRAG_CLOSE_THRESHOLD = 80;

export function BottomSheet({
	open,
	onClose,
	title,
	description,
	children,
	showHandle = true,
	closeLabel = "닫기",
	maxHeight = "80vh",
	className = "",
	...props
}: BottomSheetProps) {
	const baseId = useId();
	const sheetRef = useRef<HTMLDivElement>(null);
	const dragStartY = useRef<number | null>(null);
	const [dragOffset, setDragOffset] = useState(0);

	useEffect(() => {
		if (!open) return;

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") onClose();
		};
		document.addEventListener("keydown", onKeyDown);

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		sheetRef.current?.focus({ preventScroll: true });

		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.body.style.overflow = previousOverflow;
		};
	}, [open, onClose]);

	const endDrag = useCallback(() => {
		if (dragStartY.current === null) return;
		dragStartY.current = null;
		setDragOffset((offset) => {
			if (offset > DRAG_CLOSE_THRESHOLD) onClose();
			return 0;
		});
	}, [onClose]);

	const handlePointerDown = (event: React.PointerEvent) => {
		dragStartY.current = event.clientY;
	};

	const handlePointerMove = (event: React.PointerEvent) => {
		if (dragStartY.current === null) return;
		setDragOffset(Math.max(0, event.clientY - dragStartY.current));
	};

	if (!open) return null;

	const titleId = title ? `${baseId}-title` : undefined;
	const descriptionId = description ? `${baseId}-description` : undefined;

	return (
		<div className={styles.overlay}>
			<button
				type="button"
				className={styles.backdrop}
				aria-label={closeLabel}
				tabIndex={-1}
				onClick={onClose}
			/>
			<div
				ref={sheetRef}
				role="dialog"
				aria-modal="true"
				aria-labelledby={titleId}
				aria-describedby={descriptionId}
				tabIndex={-1}
				className={`${styles.sheet} ${className}`.trim()}
				style={{ maxHeight, transform: `translateY(${dragOffset}px)` }}
				{...props}
			>
				{showHandle && (
					<button
						type="button"
						className={styles.handle}
						aria-label={closeLabel}
						onClick={onClose}
						onPointerDown={handlePointerDown}
						onPointerMove={handlePointerMove}
						onPointerUp={endDrag}
						onPointerCancel={endDrag}
					>
						<span className={styles.handleBar} aria-hidden="true" />
					</button>
				)}

				{(title || description) && (
					<div className={styles.header}>
						{title && (
							<h2 id={titleId} className={styles.title}>
								{title}
							</h2>
						)}
						{description && (
							<p id={descriptionId} className={styles.description}>
								{description}
							</p>
						)}
					</div>
				)}

				<div className={styles.body}>{children}</div>

				<button
					type="button"
					className={styles.closeButton}
					onClick={onClose}
					aria-label={closeLabel}
				>
					<Icon icon="Close" size={24} />
				</button>
			</div>
		</div>
	);
}
