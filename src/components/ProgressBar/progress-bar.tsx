import type { FC } from "react";
import styles from "./progress-bar.module.css";
import type { ProgressBarProps } from "./progress-bar.type";

export const ProgressBar: FC<ProgressBarProps> = ({
	length,
	currentProgress,
	className,
}) => {
	const progressPercentage = length === 0 ? 0 : (currentProgress / length) * 100;

	return (
		<div className={`${styles.container} ${className ?? ""}`}>
			<div className={styles.progressBarWrapper}>
				<div
					className={styles.progressBar}
					style={{ width: `${progressPercentage}%` }}
					role="progressbar"
					aria-valuenow={currentProgress}
					aria-valuemin={0}
					aria-valuemax={length}
					aria-label={`${currentProgress}개 중 ${length}개 완료`}
				/>
			</div>
			<span className={styles.progressText} aria-live="polite">
				{currentProgress} / {length}
			</span>
		</div>
	);
};
