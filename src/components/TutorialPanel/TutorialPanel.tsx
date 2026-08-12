import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "../Icon";
import { VisuallyHidden } from "../VisuallyHidden";
import styles from "./TutorialPanel.module.css";
import type { TutorialPanelProps } from "./TutorialPanel.type";

export function TutorialPanel({
	steps,
	title,
	open,
	onClose,
	step,
	onStepChange,
	closeLabel = "따라하기 닫기",
	prevLabel = "이전",
	nextLabel = "다음",
	finishLabel = "마치기",
	className = "",
	...props
}: TutorialPanelProps) {
	const baseId = useId();
	const titleId = `${baseId}-title`;
	const [internal, setInternal] = useState(0);
	const panelRef = useRef<HTMLElement>(null);

	const index = step ?? internal;
	const total = steps.length;
	const current = steps[index];
	const isFirst = index === 0;
	const isLast = index === total - 1;

	const goTo = (next: number) => {
		if (step === undefined) setInternal(next);
		onStepChange?.(next);
	};

	useEffect(() => {
		if (!open) return;
		panelRef.current?.focus({ preventScroll: true });
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") onClose();
		};
		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [open, onClose]);

	if (!open || !current) return null;

	return (
		<aside
			ref={panelRef}
			role="complementary"
			aria-labelledby={titleId}
			tabIndex={-1}
			className={`${styles.tutorialPanel} ${className}`.trim()}
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

			<ol className={styles.progress}>
				{steps.map((_, itemIndex) => (
					<li
						key={itemIndex}
						className={`${styles.progressItem} ${itemIndex === index ? styles.currentStep : ""} ${itemIndex < index ? styles.doneStep : ""}`.trim()}
						aria-current={itemIndex === index ? "step" : undefined}
					>
						<VisuallyHidden as="span">
							{itemIndex + 1}단계
							{itemIndex === index ? " 진행 중" : ""}
						</VisuallyHidden>
					</li>
				))}
			</ol>

			<div className={styles.body} aria-live="polite">
				<p className={styles.counter}>
					{index + 1} / {total}
				</p>
				<h3 className={styles.stepTitle}>{current.title}</h3>
				{current.media && <div className={styles.media}>{current.media}</div>}
				<div className={styles.content}>{current.content}</div>
			</div>

			<div className={styles.actions}>
				<button
					type="button"
					className={styles.prev}
					disabled={isFirst}
					onClick={() => goTo(index - 1)}
				>
					{prevLabel}
				</button>
				<button
					type="button"
					className={styles.next}
					onClick={() => (isLast ? onClose() : goTo(index + 1))}
				>
					{isLast ? finishLabel : nextLabel}
				</button>
			</div>
		</aside>
	);
}
