import * as style from "../Switch.module.css";
import type { SwitchTrackProps } from "../Switch.type";

export function SwitchTrack({
	id,
	label,
	status,
	disabled,
	onChange,
	size,
	useIcon,
	checkedIcon,
	uncheckedIcon,
	barWidth,
	barHeight,
	thumbSize,
	inputClassName,
}: SwitchTrackProps) {
	const trackWidth = barWidth ?? (size === "l" ? "40px" : "32px");
	const trackHeight = barHeight ?? (size === "l" ? "24px" : "20px");
	const thumbDiameter = thumbSize ?? (size === "l" ? "20px" : "16px");
	const thumbLeft = status
		? `calc(${trackWidth} - ${thumbDiameter} - 2px)`
		: "2px";

	const checkIconColor = disabled
		? "var(--krds-color-gray-20)"
		: "var(--krds-color-primary-50)";

	const closeIconColor = disabled
		? "var(--krds-color-gray-20)"
		: "var(--krds-color-gray-50)";

	return (
		<label style={{ display: "flex", alignItems: "center", margin: 0 }}>
			<input
				type="checkbox"
				id={id}
				title={label}
				checked={status}
				onChange={(e) => !disabled && onChange(e.target.checked)}
				disabled={disabled}
				className={`${inputClassName} ${style.srOnly}`}
				role="switch"
				aria-label={label ?? "토글 버튼"}
				aria-checked={status}
				aria-disabled={disabled}
			/>
			<span
				className={style.switchTrack}
				style={{
					width: trackWidth,
					height: trackHeight,
					outline: "none",
				}}
				tabIndex={-1}
			>
				<span
					className={style.switchThumb}
					style={{
						left: thumbLeft,
						width: thumbDiameter,
						height: thumbDiameter,
					}}
				>
					{useIcon && (
						<span
							className={status ? style.checkIcon : style.closeIcon}
							style={{
								color: status ? checkIconColor : closeIconColor,
							}}
						>
							{status ? checkedIcon : uncheckedIcon}
						</span>
					)}
				</span>
			</span>
		</label>
	);
}
