import { uniqueId } from "lodash-es";
import type { KeyboardEvent } from "react";
import { Icon } from "../Icon";
import { Label } from "../Label";
import * as style from "./ChipGroup.module.css";
import type { ChipGroupProps, ChipProps } from "./ChipGroup.type";

export const Chip = ({
	id = `chip-${uniqueId()}`,
	label,
	checked = false,
	disabled = false,
	size = "m",
	onChange,
	type = "single",
	height,
}: ChipProps) => {
	let iconName: "ChipChecked" | "ChipUnchecked" | "ChipDisabled" | null = null;

	if (type === "multi" && disabled) {
		iconName = "ChipDisabled";
	} else if (checked) {
		iconName = "ChipChecked";
	} else if (type === "multi" && !checked) {
		iconName = "ChipUnchecked";
	}

	const handleClick = () => {
		if (!disabled) {
			const newChecked = type === "single" ? true : !checked;
			if (onChange) {
				onChange(newChecked);
			}
		}
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			handleClick();
		}
	};

	const wrapperClass = [style.formChip, style[size]].join(" ");
	const labelClass = [
		style.outline,
		checked && style.checked,
		disabled && style.disabled,
	]
		.filter(Boolean)
		.join(" ");

	const labelStyle = height
		? { height: `${height}px`, padding: "8px 10px" }
		: {};

	return (
		<div className={wrapperClass}>
			<input
				type={type === "multi" ? "checkbox" : "radio"}
				className={style.radio}
				id={id}
				checked={checked}
				disabled={disabled}
				readOnly
			/>
			<Label
				as="label"
				id={id}
				role={type}
				aria-checked={checked}
				aria-disabled={disabled}
				tabIndex={disabled ? -1 : 0}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				className={`${labelClass}`}
				style={labelStyle}
			>
				{iconName && (
					<Icon
						icon={iconName}
						size={16}
						className={style.checkIcon}
						aria-hidden="true"
					/>
				)}
				{label}
			</Label>
		</div>
	);
};

export const ChipGroup = ({
	options,
	selected,
	onChange,
	type = "multi",
	size = "m",
	disabled = false,
	labelKey = "label",
	valueKey = "value",
	className = "",
	height,
}: ChipGroupProps) => {
	const chipGroupClass = [style.chipGroup, className].filter(Boolean).join(" ");

	return (
		<div className={chipGroupClass}>
			{options.map((item) => {
				const label = item[labelKey];
				const value = item[valueKey];
				const isChecked = selected.includes(value);

				return (
					<Chip
						key={value}
						id={`chip-${value}`}
						label={label}
						checked={isChecked}
						onChange={(checked) => onChange(value, checked, label)}
						type={type}
						size={size}
						disabled={disabled}
						height={height}
					/>
				);
			})}
		</div>
	);
};
