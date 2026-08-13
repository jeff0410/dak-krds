import { useCallback, useEffect, useId, useRef, useState } from "react";
import styles from "./Tooltip.module.css";
import type { TooltipProps } from "./Tooltip.type";

function kebabToPascal(str: string) {
	return str
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join("");
}

const FOCUSABLE = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"summary",
	"[tabindex]:not([tabindex='-1'])",
].join(",");

export function Tooltip({
	content,
	children,
	placement = "bottom-left",
	className,
	showShadow = true,
}: TooltipProps) {
	const [visible, setVisible] = useState(false);
	const [needsFocusTarget, setNeedsFocusTarget] = useState(false);
	const triggerRef = useRef<HTMLDivElement>(null);
	const tooltipId = useId();

	// 안에 초점을 받는 요소가 이미 있으면 감싸는 쪽은 탭 순서에서 빠진다.
	// 없을 때만 대신 초점을 받아야 키보드로도 툴팁을 열 수 있다.
	useEffect(() => {
		const trigger = triggerRef.current;
		if (!trigger) return;
		setNeedsFocusTarget(!trigger.querySelector(FOCUSABLE));
	}, []);

	const hide = useCallback(() => setVisible(false), []);

	useEffect(() => {
		if (!visible) return;
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") hide();
		};
		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [visible, hide]);

	const tooltipClass = styles[`tooltipBox${kebabToPascal(placement)}`] || "";
	const arrowClass = styles[`arrow${kebabToPascal(placement)}`] || "";
	const shadowClass = showShadow ? styles.shadow : "";

	return (
		<div
			className={styles.tooltipWrap}
			onMouseEnter={() => setVisible(true)}
			onMouseLeave={hide}
			onFocus={() => setVisible(true)}
			onBlur={(event) => {
				if (!event.currentTarget.contains(event.relatedTarget)) hide();
			}}
		>
			<div
				ref={triggerRef}
				className={styles.trigger}
				aria-describedby={visible ? tooltipId : undefined}
				tabIndex={needsFocusTarget ? 0 : undefined}
			>
				{children}
			</div>
			{visible && (
				<div
					id={tooltipId}
					role="tooltip"
					className={`${styles.tooltipBox} ${tooltipClass} ${shadowClass} ${className || ""}`}
				>
					<span className={`${styles.arrow} ${arrowClass}`} />
					<div className={styles.tooltipContent}>{content}</div>
				</div>
			)}
		</div>
	);
}
