import { VisuallyHidden } from "../VisuallyHidden";
import styles from "./CriticalAlerts.module.css";
import type { CriticalAlertLevel, CriticalAlertsProps } from "./CriticalAlerts.type";

const DEFAULT_LEVEL_LABEL: Record<CriticalAlertLevel, string> = {
	high: "긴급",
	medium: "주의",
	low: "안내",
};

export function CriticalAlerts({
	level = "high",
	levelLabel,
	message,
	icon,
	linkLabel,
	linkHref,
	linkExternal = false,
	className = "",
	...props
}: CriticalAlertsProps) {
	return (
		<section
			role="banner"
			className={`${styles.criticalAlerts} ${styles[level]} ${className}`.trim()}
			{...props}
		>
			<div className={styles.inner}>
				{icon && (
					<span className={styles.icon} aria-hidden="true">
						{icon}
					</span>
				)}
				<span className={styles.level}>
					{levelLabel ?? DEFAULT_LEVEL_LABEL[level]}
				</span>
				<p className={styles.message}>{message}</p>
				{linkLabel && linkHref && (
					<a
						href={linkHref}
						className={styles.link}
						{...(linkExternal
							? { target: "_blank", rel: "noreferrer noopener" }
							: {})}
					>
						{linkLabel}
						{linkExternal && <VisuallyHidden>새 창 열림</VisuallyHidden>}
					</a>
				)}
			</div>
		</section>
	);
}
