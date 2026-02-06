import type React from "react";
import type { MouseEvent } from "react";
import { Spinner } from "../Spinner";
import styles from "./Button.module.css";
import type { ButtonProps } from "./Button.type";

export function Button({
	type = "button",
	label = "",
	variant = "primary",
	onClick = () => {},
	disabled = false,
	className = "",
	width = "100%",
	height,
	rounded = "6px",
	padding,
	icon,
	iconPosition = "left",
	iconClassName = "",
	size = "m",
	children,
	loading = false,
	loadingText,
	spinnerSize,
	color,
	borderColor,
	useIcon,
	...props
}: ButtonProps) {
	const shouldUseIcon = useIcon ?? (!!icon && !loading);
	const hasText = !!(children || label || loadingText);
	const isDisabled = disabled || loading;

	const variantClass = (styles as Record<string, string>)[variant] || "";
	const sizeClass = (styles as Record<string, string>)[size] || "";
	const disabledClass = isDisabled
		? (styles as Record<string, string>).disabled
		: "";
	const buttonClass =
		`${(styles as Record<string, string>).button} ${variantClass} ${sizeClass} ${disabledClass} ${className}`.trim();

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		if (loading || disabled) {
			event.preventDefault();
			return;
		}
		onClick?.(event);
	};

	const displayText = loading && loadingText ? loadingText : children || label;

	return (
		<button
			type={type}
			onClick={handleClick}
			disabled={isDisabled}
			aria-disabled={isDisabled}
			aria-busy={loading}
			tabIndex={isDisabled ? -1 : 0}
			style={
				{
					width,
					borderRadius: rounded,
					height,
					padding,
					"--btn-bg": color,
					"--btn-color": "#fff",
					"--btn-border-color": borderColor,
				} as React.CSSProperties
			}
			className={buttonClass}
			{...props}
		>
			{loading && (
				<span className={(styles as Record<string, string>).icon}>
					<Spinner size="s" />
				</span>
			)}

			{shouldUseIcon && iconPosition === "left" && (
				<span
					className={iconClassName || (styles as Record<string, string>).icon}
				>
					{icon}
				</span>
			)}

			{hasText && (
				<span className={(styles as Record<string, string>).content}>
					{displayText}
				</span>
			)}

			{shouldUseIcon && iconPosition === "right" && (
				<span
					className={iconClassName || (styles as Record<string, string>).icon}
				>
					{icon}
				</span>
			)}
		</button>
	);
}
