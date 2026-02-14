/** biome-ignore-all lint/a11y/noStaticElementInteractions: tooltip requires mouse and touch events for proper positioning */
import { useId, useState } from "react";
import styles from "./Tooltip.module.css";
import type { TooltipProps } from "./Tooltip.type";

function kebabToPascal(str: string) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

export function Tooltip({
  content,
  children,
  placement = "bottom-left",
  className,
  showShadow = true,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const tooltipId = useId();

  const tooltipClass = styles[`tooltipBox${kebabToPascal(placement)}`] || "";
  const arrowClass = styles[`arrow${kebabToPascal(placement)}`] || "";
  const shadowClass = showShadow ? styles.shadow : "";

  return (
    <div
      className={styles.tooltipWrap}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <div
        className={styles.trigger}
        aria-describedby={tooltipId}
        aria-haspopup="true"
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
