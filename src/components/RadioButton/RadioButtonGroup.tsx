import { uniqueId } from "lodash-es";
import { type KeyboardEvent, type ReactNode, useRef } from "react";
import { RadioButton } from "./RadioButton";
import styles from "./RadioButton.module.css";
import type { RadioButtonGroupProps } from "./RadioButton.type";

export const RadioButtonGroup = ({
	name,
	options,
	selectedValue,
	onChange,
	disabled = false,
	size = "m",
	direction = "horizontal",
	labelKey = "label",
	valueKey = "value",
}: RadioButtonGroupProps) => {
	const groupRef = useRef<HTMLDivElement>(null);
	const uid = uniqueId();

	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (disabled) return;

		const currentIndex = options.findIndex(
			(opt) => opt[valueKey] === selectedValue,
		);
		let nextIndex = currentIndex;

		switch (event.key) {
			case "ArrowUp":
			case "ArrowLeft":
				event.preventDefault();
				nextIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
				break;
			case "ArrowDown":
			case "ArrowRight":
				event.preventDefault();
				nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
				break;
			default:
				return;
		}

		const nextOption = options[nextIndex];
		onChange(nextOption[valueKey] as string | boolean);

		// 다음 라디오 버튼에 포커스
		setTimeout(() => {
			const radioContainers =
				groupRef.current?.querySelectorAll('[role="radio"]');
			if (radioContainers) {
				(radioContainers[nextIndex] as HTMLElement)?.focus();
			}
		}, 0);
	};

	const safeName = `${name}-${uid}`;

	return (
		<div
			className={`${styles.group} ${direction === "horizontal" ? styles.groupHorizontal : styles.groupVertical}`}
			ref={groupRef}
			role="radiogroup"
			onKeyDown={handleKeyDown}
		>
			{options.map((option) => {
				const rawVal = option[valueKey] as string | boolean;
				const id = `${safeName}-${String(rawVal)}`;
				const isSelected = selectedValue === rawVal;

				return (
					<RadioButton
						key={id}
						id={id}
						name={safeName}
						value={rawVal}
						checked={isSelected}
						onChange={onChange}
						label={option[labelKey] as ReactNode}
						disabled={disabled}
						size={size}
						tabIndex={0}
						onKeyDown={handleKeyDown}
					/>
				);
			})}
		</div>
	);
};
