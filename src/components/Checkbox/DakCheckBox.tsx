import type { ChangeEvent, KeyboardEvent } from "react";
import styles from "./DakCheckBox.module.css";
import type { DakCheckBoxProps } from "./DakCheckBox.type";

export const DakCheckBox = ({
	id,
	label,
	checked = false,
	disabled = false,
	size = "default",
	width = "100%",
	onChange,
}: DakCheckBoxProps) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.checked);
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !disabled) {
			e.preventDefault();
			onChange?.(!checked);
		}
	};

	// label이 없으면 span만 렌더
	const box = (
		<span
			className={`
        ${styles.checkboxBox} 
        ${checked ? styles.checked : ""} 
        ${disabled ? styles.disabled : ""} 
        ${size === "large" ? styles.large : ""}
      `}
		/>
	);

	if (!label) {
		return (
			<div className={styles.checkboxWrapper}>
				<input
					type="checkbox"
					id={id}
					className={styles.checkboxInput}
					checked={checked}
					disabled={disabled}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					aria-checked={checked}
					tabIndex={0}
				/>
				<span
					className={`
            ${styles.checkboxBox} 
            ${checked ? styles.checked : ""} 
            ${disabled ? styles.disabled : ""} 
            ${size === "large" ? styles.large : ""}
            ${!disabled ? styles.clickable : ""}
            `}
				/>
			</div>
		);
	}

	return (
		<div className={styles.checkboxWrapper} style={{ width }}>
			<input
				type="checkbox"
				id={id}
				className={styles.checkboxInput}
				checked={checked}
				disabled={disabled}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				aria-checked={checked}
				tabIndex={0}
			/>
			<label htmlFor={id} className={styles.checkboxLabel}>
				{box}
				<span className={disabled ? styles.disabledLabel : ""}>{label}</span>
			</label>
		</div>
	);
};
