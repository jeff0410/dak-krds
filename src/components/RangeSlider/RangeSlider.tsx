import { useId } from "react";
import styles from "./RangeSlider.module.css";
import type { RangeSliderProps } from "./RangeSlider.type";

export function RangeSlider({
	label,
	value,
	onChange,
	min = 0,
	max = 100,
	step = 10,
	unit = "",
	showRange = true,
	formatValue,
	disabled = false,
	id,
	className = "",
	...props
}: RangeSliderProps) {
	const baseId = useId();
	const sliderId = id ?? `${baseId}-slider`;
	const display = formatValue ? formatValue(value) : `${value}${unit}`;
	const percent = max === min ? 0 : ((value - min) / (max - min)) * 100;

	return (
		<div className={`${styles.rangeSlider} ${className}`.trim()} {...props}>
			<div className={styles.head}>
				<label htmlFor={sliderId} className={styles.label}>
					{label}
				</label>
				<output htmlFor={sliderId} className={styles.value}>
					{display}
				</output>
			</div>

			<input
				id={sliderId}
				type="range"
				className={styles.input}
				value={value}
				min={min}
				max={max}
				step={step}
				disabled={disabled}
				aria-valuetext={display}
				style={{ backgroundSize: `${percent}% 100%` }}
				onChange={(event) => onChange(Number(event.target.value))}
			/>

			{showRange && (
				<div className={styles.range}>
					<span>{formatValue ? formatValue(min) : `${min}${unit}`}</span>
					<span>{formatValue ? formatValue(max) : `${max}${unit}`}</span>
				</div>
			)}
		</div>
	);
}
