/** biome-ignore-all lint/a11y/noStaticElementInteractions: tooltip requires mouse and touch events for proper positioning */
import { useId, useState } from "react";
import style from "./Tooltip.module.css";
import type { TooltipProps } from "./Tooltip.type";

function kebabToPascal(str: string) {
	return str
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join("");
}

export const Tooltip = ({
	content,
	children,
	placement = "bottom-left",
	className,
	showShadow = true,
}: TooltipProps) => {
	const [visible, setVisible] = useState(false);
	const tooltipId = useId();

	const tooltipClass = style[`tooltipBox${kebabToPascal(placement)}`] || "";
	const arrowClass = style[`arrow${kebabToPascal(placement)}`] || "";
	const shadowClass = showShadow ? style.shadow : "";

	return (
		<div
			className={style.tooltipWrap}
			onMouseEnter={() => setVisible(true)}
			onMouseLeave={() => setVisible(false)}
		>
			<div
				className={style.trigger}
				aria-describedby={tooltipId}
				aria-haspopup="true"
			>
				{children}
			</div>
			{visible && (
				<div
					id={tooltipId}
					role="tooltip"
					className={`${style.tooltipBox} ${tooltipClass} ${shadowClass} ${className || ""}`}
				>
					<span className={`${style.arrow} ${arrowClass}`} />
					<div className={style.tooltipContent}>{content}</div>
				</div>
			)}
		</div>
	);
};
