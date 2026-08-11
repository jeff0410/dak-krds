import { useCallback, useEffect, useId, useRef, useState } from "react";
import styles from "./CoachMark.module.css";
import type { CoachMarkProps } from "./CoachMark.type";

type SpotRect = { top: number; left: number; width: number; height: number };

export function CoachMark({
	steps,
	open,
	onClose,
	onFinish,
	step,
	onStepChange,
	skipLabel = "그만보기",
	prevLabel = "이전",
	nextLabel = "다음",
	finishLabel = "마치기",
	confirmLabel = "확인",
	className = "",
	...props
}: CoachMarkProps) {
	const baseId = useId();
	const titleId = `${baseId}-title`;
	const [internal, setInternal] = useState(0);
	const [spot, setSpot] = useState<SpotRect | null>(null);
	const popoverRef = useRef<HTMLDivElement>(null);

	const index = step ?? internal;
	const total = steps.length;
	const isFirst = index === 0;
	const isLast = index === total - 1;
	const isSingle = total === 1;
	const current = steps[index];

	const goTo = useCallback(
		(next: number) => {
			if (step === undefined) setInternal(next);
			onStepChange?.(next);
		},
		[step, onStepChange],
	);

	useEffect(() => {
		if (!open || !current) return;

		const measure = () => {
			const target = document.getElementById(current.targetId);
			if (!target) {
				setSpot(null);
				return;
			}
			const rect = target.getBoundingClientRect();
			setSpot({
				top: rect.top,
				left: rect.left,
				width: rect.width,
				height: rect.height,
			});
		};

		measure();
		window.addEventListener("resize", measure);
		window.addEventListener("scroll", measure, { passive: true });
		return () => {
			window.removeEventListener("resize", measure);
			window.removeEventListener("scroll", measure);
		};
	}, [open, current]);

	useEffect(() => {
		if (!open) return;
		popoverRef.current?.focus({ preventScroll: true });
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") onClose();
		};
		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [open, index, onClose]);

	if (!open || !current) return null;

	const handleNext = () => {
		if (isLast || isSingle) {
			onFinish?.();
			onClose();
			return;
		}
		goTo(index + 1);
	};

	return (
		<div className={`${styles.coachMark} ${className}`.trim()} {...props}>
			<div className={styles.overlay} />
			{spot && (
				<div
					className={styles.spotlight}
					style={{
						top: spot.top - 4,
						left: spot.left - 4,
						width: spot.width + 8,
						height: spot.height + 8,
					}}
				/>
			)}

			<div
				ref={popoverRef}
				role="dialog"
				aria-modal="true"
				aria-labelledby={titleId}
				tabIndex={-1}
				className={styles.popover}
				style={
					spot
						? { top: spot.top + spot.height + 16, left: spot.left }
						: undefined
				}
			>
				<p className={styles.counter}>
					{index + 1} / {total}
				</p>
				<h2 id={titleId} className={styles.title}>
					{current.title}
				</h2>
				<p className={styles.instruction}>{current.instruction}</p>

				<div className={styles.actions}>
					<button type="button" className={styles.skip} onClick={onClose}>
						{skipLabel}
					</button>
					<div className={styles.navigation}>
						{!isFirst && (
							<button
								type="button"
								className={styles.prev}
								onClick={() => goTo(index - 1)}
							>
								{prevLabel}
							</button>
						)}
						<button type="button" className={styles.next} onClick={handleNext}>
							{isSingle ? confirmLabel : isLast ? finishLabel : nextLabel}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
