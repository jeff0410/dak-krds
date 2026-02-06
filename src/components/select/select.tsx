import type { CSSProperties, KeyboardEvent } from "react";
import { useEffect, useId, useRef, useState } from "react";
import { DakCheckBox } from "../Checkbox/DakCheckBox";
import { Icon } from "../Icon";
import { Label } from "../Label";
import { StatusLabel } from "../TextInput/StatusLabel";
import * as style from './Select.module.css';
import type { SelectProps } from "./Select.type";

export const Select = ({
	id,
	label,
	options,
	value,
	onChange,
	placeholder,
	size = "m",
	variant = "box",
	disabled = false,
	width,
	className = "",
	state = "default",
	valueKey = "value",
	labelKey = "label",
	labelFontSize = "m",
	labelFontWeight = "regular",
	direction = "vertical",
	maxVisibleItems = 5,
	multiDisplaySeparator = ", ",
	multiDisplayStrategy = "ellipsis",
	multiCountPattern = "{first} 외 {count}건",
	maxTags = 2,
	type = "single",
	isValid = true,
	error,
	info,
	title,
}: SelectProps) => {
	const isMulti = type === "multi";

	const [isOpen, setIsOpen] = useState(false);
	const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

	const wrapperRef = useRef<HTMLDivElement>(null);
	const listRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const selectId = useId();

	const fixedWidth = width ?? 200;
	const actualScrollThreshold = maxVisibleItems + 1;

	const selectedValues: string[] = isMulti
		? Array.isArray(value)
			? value
			: []
		: value
			? [value as string]
			: [];

	const selectedOptions = options.filter((opt) =>
		selectedValues.includes(opt[valueKey]),
	);

	let displayText: string | undefined = placeholder;
	let shouldShowEllipsis = false;

	if (isMulti) {
		if (selectedOptions.length > 0) {
			if (multiDisplayStrategy === "count" && selectedOptions.length > 1) {
				const first = selectedOptions[0][labelKey];
				const restCount = selectedOptions.length - 1;
				displayText = multiCountPattern
					.replace("{first}", first)
					.replace("{count}", String(restCount));
			} else {
				if (selectedOptions.length > actualScrollThreshold) {
					const visibleOptions = selectedOptions.slice(
						0,
						actualScrollThreshold,
					);
					displayText = visibleOptions
						.map((o) => o[labelKey])
						.join(multiDisplaySeparator);
					shouldShowEllipsis = true;
				} else {
					displayText = selectedOptions
						.map((o) => o[labelKey])
						.join(multiDisplaySeparator);
				}
			}
		}
	} else {
		const selectedOption = options.find((opt) => opt[valueKey] === value);
		displayText = selectedOption?.[labelKey] ?? placeholder;
	}

	const toggleDropdown = () => {
		if (disabled || state === "disabled" || state === "view") return;
		setIsOpen((prev) => !prev);
	};

	const closeDropdown = () => {
		setIsOpen(false);
		setFocusedIndex(null);
	};

	const commitSingleSelection = (selectedValue: string) => {
		if (disabled || state === "disabled" || state === "view") return;
		(onChange as (v: string) => void)(selectedValue);
		closeDropdown();
	};

	const toggleMultiValue = (selectedValue: string) => {
		if (disabled || state === "disabled" || state === "view") return;
		const current = selectedValues;
		let next: string[];
		if (current.includes(selectedValue)) {
			next = current.filter((v) => v !== selectedValue);
		} else {
			next = [...current, selectedValue];
		}
		(onChange as (v: string[]) => void)(next);
		setTimeout(() => {
			buttonRef.current?.focus();
		}, 0);
	};

	const handleOptionClick = (selectedValue: string) => {
		if (isMulti) {
			toggleMultiValue(selectedValue);
		} else {
			commitSingleSelection(selectedValue);
		}
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			wrapperRef.current &&
			!wrapperRef.current.contains(event.target as Node)
		) {
			closeDropdown();
		}
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
		if (disabled || state === "disabled" || state === "view") return;
		switch (event.key) {
			case "Enter":
			case " ": {
				event.preventDefault();
				if (!isOpen) {
					setIsOpen(true);
					setFocusedIndex(0);
				} else if (focusedIndex !== null) {
					const targetOption = options[focusedIndex];
					if (isMulti) toggleMultiValue(targetOption[valueKey]);
					else commitSingleSelection(targetOption[valueKey]);
				} else {
					closeDropdown();
				}
				break;
			}
			case "ArrowDown": {
				event.preventDefault();
				setIsOpen(true);
				setFocusedIndex((prev) =>
					prev === null || prev === options.length - 1 ? 0 : prev + 1,
				);
				break;
			}
			case "ArrowUp": {
				event.preventDefault();
				setIsOpen(true);
				setFocusedIndex((prev) =>
					prev === null ? options.length - 1 : prev === 0 ? null : prev - 1,
				);
				break;
			}
			case "Escape": {
				closeDropdown();
				break;
			}
			case "Tab": {
				if (isOpen) {
					event.preventDefault();
					if (event.shiftKey) {
						setFocusedIndex((prev) =>
							prev === null ? options.length - 1 : prev === 0 ? null : prev - 1,
						);
					} else {
						setFocusedIndex((prev) =>
							prev === null || prev === options.length - 1 ? 0 : prev + 1,
						);
					}
				}
				break;
			}
		}
	};

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

	useEffect(() => {
		if (isOpen && focusedIndex !== null && listRef.current) {
			const focusedOption = listRef.current.querySelector(
				`#${id ?? selectId}-option-${focusedIndex}`,
			);
			if (focusedOption) {
				focusedOption.scrollIntoView({ block: "nearest", behavior: "smooth" });
			}
		}
	}, [focusedIndex, isOpen, id, selectId]);

	const optionBaseHeight = 40;
	const dynamicMaxHeight =
		options.length > actualScrollThreshold
			? optionBaseHeight * actualScrollThreshold
			: undefined;

	const dropdownStyle: CSSProperties = {
		maxHeight: dynamicMaxHeight ? `${dynamicMaxHeight}px` : undefined,
		overflowY: dynamicMaxHeight ? "auto" : undefined,
	};

	const sizeClass =
		size === "s" ? style.sizeS : size === "l" ? style.sizeL : style.sizeM;
	const effectiveState = !isValid && !disabled ? "error" : state;
	const stateClass = style[effectiveState] ?? style.default;
	const variantClass =
		variant === "text" ? style.variantText : style.variantBox;
	const directionClass =
		direction === "horizontal"
			? style.directionHorizontal
			: style.directionVertical;

	const listboxId = `${id ?? selectId}-listbox`;
	const labelId = `${id ?? selectId}-label`;
	const focusedOptionId =
		focusedIndex !== null
			? `${id ?? selectId}-option-${focusedIndex}`
			: undefined;

	return (
		<div
			className={`${style.selectWrapper} ${className}`}
			ref={wrapperRef}
			style={{ width: fixedWidth }}
		>
			<div
				className={`${style.select} ${directionClass}`}
				style={{ width: "100%" }}
			>
				{label && (
					<Label
						id={labelId}
						style={{ whiteSpace: "nowrap" }}
						htmlFor={id ?? selectId}
						size={labelFontSize}
						weight={labelFontWeight}
					>
						{label}
					</Label>
				)}
				<div className={style.selectContent}>
					{isMulti &&
					multiDisplayStrategy === "tags" &&
					selectedOptions.length > 0 ? (
						<div
							className={`${style.selectBox} ${sizeClass} ${stateClass} ${variantClass}`}
							style={{
								width: "",
								display: "flex",
								alignItems: "center",
								gap: "4px",
							}}
						>
							<div
								className="flex flex-1 items-center gap-1 overflow-hidden"
								role="group"
								aria-label={`${label || "선택된 항목"}: ${selectedOptions.length}개 선택됨`}
							>
								{selectedOptions.slice(0, maxTags).map((opt) => (
									<span
										key={opt[valueKey]}
										className="flex items-center gap-1 rounded px-2 py-1 text-sm"
										style={{
											border: "1px solid var(--krds-color-gray-20)",
											borderRadius: "100px",
											flexShrink: 0,
										}}
									>
										<span>{opt[labelKey]}</span>
										<button
											type="button"
											aria-label={`${opt[labelKey]} 삭제`}
											title={`${opt[labelKey]} 삭제`}
											onClick={(e) => {
												e.stopPropagation();
												handleOptionClick(opt[valueKey]);
											}}
											style={{
												background: "none",
												border: "none",
												cursor: "pointer",
												padding: "2px",
												display: "flex",
												alignItems: "center",
												borderRadius: "2px",
											}}
										>
											<Icon
												icon="Delete"
												size={14}
												viewBox="0 0 16 16"
												aria-hidden="true"
											/>
										</button>
									</span>
								))}
								{selectedOptions.length > maxTags && (
									<span className="text-gray-70 text-sm" aria-hidden="true">
										+{selectedOptions.length - maxTags}
									</span>
								)}
							</div>
							<button
								ref={buttonRef}
								id={id ?? selectId}
								type="button"
								className={style.dropdownToggle}
								disabled={disabled || state === "disabled"}
								onKeyDown={handleKeyDown}
								onClick={toggleDropdown}
								aria-haspopup="listbox"
								aria-expanded={isOpen}
								aria-controls={isOpen ? listboxId : undefined}
								aria-activedescendant={isOpen ? focusedOptionId : undefined}
								aria-label={`${label || "선택"} 드롭다운 ${isOpen ? "닫기" : "열기"}`}
								style={{
									background: "transparent",
									border: "none",
									cursor: "pointer",
									padding: "4px",
									display: "flex",
									alignItems: "center",
								}}
							>
								<Icon
									icon={isOpen ? "ArrowUp" : "ArrowDown"}
									name={isOpen ? "chevron-up" : "chevron-down"}
									width={size === "s" ? 16 : 20}
									height={size === "s" ? 16 : 20}
									color="var(--krds-color-gray-80)"
								/>
							</button>
						</div>
					) : (
						<button
							ref={buttonRef}
							id={id ?? selectId}
							type="button"
							className={`${style.selectBox} ${sizeClass} ${stateClass} ${variantClass}`}
							disabled={disabled || state === "disabled"}
							onKeyDown={handleKeyDown}
							onClick={toggleDropdown}
							aria-haspopup="listbox"
							aria-expanded={isOpen}
							aria-controls={isOpen ? listboxId : undefined}
							aria-activedescendant={isOpen ? focusedOptionId : undefined}
							aria-labelledby={label ? labelId : undefined}
							aria-label={
								!label ? displayText || placeholder || "선택" : undefined
							}
							title={
								label
									? `${label}: ${displayText} 선택됨`
									: title || `${displayText} 선택됨`
							}
							style={{ width: "" }}
						>
							<span
								className={`${style.value} ${
									size === "s"
										? style.valueS
										: size === "m"
											? style.valueM
											: style.valueL
								} ${!selectedValues.length ? style.placeholder : ""}`}
								title={displayText}
								style={{
									overflow: "hidden",
									textOverflow: "ellipsis",
									whiteSpace: "nowrap",
									display: "inline-block",
								}}
							>
								{displayText}
								{shouldShowEllipsis && (
									<span style={{ color: "var(--krds-color-gray-60)" }}>
										...
									</span>
								)}
							</span>
							<Icon
								icon={isOpen ? "ArrowUp" : "ArrowDown"}
								name={isOpen ? "chevron-up" : "chevron-down"}
								width={size === "s" ? 16 : 20}
								height={size === "s" ? 16 : 20}
								color="var(--krds-color-gray-80)"
							/>
						</button>
					)}
					<StatusLabel
						value={
							isMulti
								? selectedOptions.map((o) => o[labelKey]).join(", ") || ""
								: selectedOptions[0]?.[labelKey] || ""
						}
						disabled={disabled || state === "disabled"}
						isValid={isValid}
						error={error}
						info={info}
						errorId={`${id ?? selectId}-error`}
						infoId={`${id ?? selectId}-info`}
						hasContent={!!(error || info)}
					/>
				</div>

				{isOpen && (
					<div className={style.dropdownWrapper} style={{ width: "100%" }}>
						<div
							id={listboxId}
							className={style.dropdown}
							ref={listRef}
							role="listbox"
							aria-labelledby={label ? labelId : undefined}
							aria-label={!label ? placeholder || "옵션 목록" : undefined}
							aria-multiselectable={isMulti || undefined}
							style={dropdownStyle}
						>
							{options.map((opt, idx) => {
								const optValue = opt[valueKey];
								const isSelected = selectedValues.includes(optValue);
								const isFocused = focusedIndex === idx;
								const optionId = `${id ?? selectId}-option-${idx}`;

								if (isMulti) {
									return (
										<button
											type={"button"}
											id={optionId}
											key={optValue}
											role="option"
											aria-selected={isSelected}
											tabIndex={-1}
											title={opt[labelKey]}
											style={{
												padding: "4px 8px",
												background: isFocused
													? "var(--krds-color-gray-10)"
													: "transparent",
												cursor: "pointer",
												minHeight: `${optionBaseHeight}px`,
												display: "flex",
												alignItems: "center",
												width: "100%",
											}}
											onMouseEnter={() => setFocusedIndex(idx)}
										>
											<DakCheckBox
												id={`${id ?? selectId}-checkbox-${optValue}`}
												label={opt[labelKey]}
												checked={isSelected}
												disabled={
													disabled || state === "disabled" || state === "view"
												}
												size={size === "l" ? "large" : "default"}
												onChange={() => handleOptionClick(optValue)}
											/>
										</button>
									);
								}

								return (
									<button
										type="button"
										id={optionId}
										key={optValue}
										role="option"
										aria-selected={isSelected}
										tabIndex={-1}
										className={style.option}
										title={opt[labelKey]}
										style={{
											background: isFocused
												? "var(--krds-color-gray-10)"
												: isSelected
													? "var(--krds-color-primary-10)"
													: "transparent",
											cursor: "pointer",
											padding: "8px 12px",
											borderRadius: "4px",
											display: "flex",
											alignItems: "center",
											gap: "4px",
											minHeight: `${optionBaseHeight}px`,
											width: "calc(100% - 16px)",
											margin: "4px 8px",
											border: "none",
											textAlign: "left",
											font: "inherit",
											boxSizing: "border-box",
										}}
										onMouseEnter={() => setFocusedIndex(idx)}
										onClick={() => handleOptionClick(optValue)}
									>
										<span style={{ flex: 1 }}>{opt[labelKey]}</span>
									</button>
								);
							})}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
