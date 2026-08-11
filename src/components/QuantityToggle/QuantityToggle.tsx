import { useId } from "react";
import { Icon } from "../Icon";
import a11y from "../../styles/a11y.module.css";
import styles from "./QuantityToggle.module.css";
import type { QuantityToggleProps } from "./QuantityToggle.type";

const clamp = (value: number, min: number, max: number) =>
	Math.min(max, Math.max(min, value));

export function QuantityToggle({
	label,
	value,
	onChange,
	min = 0,
	max = 10,
	step = 1,
	size = "m",
	hideLabel = false,
	disabled = false,
	unit,
	id,
	className = "",
	...props
}: QuantityToggleProps) {
	const baseId = useId();
	const fieldId = id ?? `${baseId}-field`;
	const atMin = value <= min;
	const atMax = value >= max;

	const update = (next: number) => onChange(clamp(next, min, max));

	return (
		<div className={`${styles.quantityToggle} ${className}`.trim()} {...props}>
			<label
				htmlFor={fieldId}
				className={hideLabel ? a11y.srOnly : styles.label}
			>
				{label}
			</label>

			<div className={`${styles.control} ${styles[size]}`}>
				<button
					type="button"
					className={styles.button}
					onClick={() => update(value - step)}
					disabled={disabled || atMin}
					aria-label={`${label} 줄이기`}
				>
					<Icon icon="BtnMinus" size={20} />
				</button>

				<input
					id={fieldId}
					type="number"
					className={styles.field}
					value={value}
					min={min}
					max={max}
					step={step}
					disabled={disabled}
					aria-label={unit ? `${label} (${unit})` : undefined}
					onChange={(event) => {
						const next = Number(event.target.value);
						if (!Number.isNaN(next)) update(next);
					}}
				/>

				<button
					type="button"
					className={styles.button}
					onClick={() => update(value + step)}
					disabled={disabled || atMax}
					aria-label={`${label} 늘리기`}
				>
					<Icon icon="Plus" size={20} />
				</button>
			</div>

			{unit && <span className={styles.unit}>{unit}</span>}
		</div>
	);
}
