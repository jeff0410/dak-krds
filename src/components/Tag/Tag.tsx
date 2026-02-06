/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
/** biome-ignore-all lint/a11y/useAriaPropsSupportedByRole: <explanation> */
import type React from "react";
import type { KeyboardEvent, MouseEvent } from "react";
import { Icon } from "../Icon";
import { Label } from "../Label/Label";
import * as style from "./Tag.module.css";
import type { TagProps } from "./Tag.type";

export const Tag: React.FC<TagProps> = ({
	label,
	size = "m",
	variant = "removable",
	disabled = false,
	onDelete,
	className = "",
}) => {
	const isTextTag = variant === "text";
	const showDelete = variant === "removable" && !!onDelete;

	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if ((event.key === "Enter" || event.key === " ") && !disabled) {
			event.preventDefault();
			event.stopPropagation();
		}
	};

	const handleDelete = (event: MouseEvent) => {
		if (!disabled && onDelete) onDelete(label);
		event.stopPropagation();
	};

	const handleDeleteKeyDown = (event: KeyboardEvent) => {
		if ((event.key === "Enter" || event.key === " ") && !disabled && onDelete) {
			event.preventDefault();
			event.stopPropagation();
			onDelete(label);
		}
	};
	const fontSizeClass =
		size === "s"
			? style.textSmall
			: size === "m"
				? style.textMedium
				: style.textLarge;

	const sizeClass = style[size];
	const variantClass = isTextTag ? style.text : style.removable;
	const labelCursorClass =
		disabled || isTextTag ? style.cursorDefault : style.cursorPointer;
	const buttonCursorClass = disabled ? style.cursorNotAllowed : "";

	return (
		<div
			className={`${style.tag} ${sizeClass} ${variantClass} ${className}`}
			tabIndex={disabled ? -1 : 0}
			onKeyDown={handleKeyDown}
		>
			<Label
				id={`tag-label-${label}`}
				weight="regular"
				className={`${fontSizeClass} ${style.normalWeight} ${labelCursorClass}`}
				color={disabled ? "gray-50" : "gray-90"}
				style={{ paddingBottom: 0 }}
			>
				{label}
			</Label>

			{showDelete && (
				<span
					className={`${style.deleteButton} ${buttonCursorClass}`}
					onClick={handleDelete}
					onKeyDown={handleDeleteKeyDown}
				>
					<Icon
						icon="Delete"
						size={16}
						viewBox="0 0 16 16"
						aria-label="태그 삭제"
					/>
				</span>
			)}
		</div>
	);
};
