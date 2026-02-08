/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */

import { Tooltip, type TooltipProps, tooltipClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "../Icon";
import type { TooltipPosition } from "./HoverTooltip.type";

export interface ClickTooltipProps {
	children: ReactNode;
	text: ReactNode;
	position?: TooltipPosition;
	maxWidth?: number;
	id?: string;
	backgroundColor?: string;
	valid?: boolean;
	closeOnClickOutside?: boolean;
	zIndex?: number;
}

const activeTooltips = new Map<string, () => void>();

const tooltipInstances = new Map<
	string,
	{ setOpen: (open: boolean) => void }
>();

const CustomTooltip = styled(
	({
		className,
		maxWidth,
		backgroundColor,
		zIndex,
		...props
	}: TooltipProps & {
		maxWidth?: number;
		backgroundColor?: string;
		zIndex?: number;
	}) => <Tooltip {...props} classes={{ popper: className }} />,
)<{ maxWidth?: number; backgroundColor?: string; zIndex?: number }>(
	({ maxWidth = 360, backgroundColor = "#fff", zIndex }) => ({
		...(zIndex && { zIndex }),
		[`& .${tooltipClasses.tooltip}`]: {
			backgroundColor: backgroundColor,
			color: "var(--krds-color-gray-90)",
			border: "1px solid var(--krds-color-gray-20)",
			borderRadius: 8,
			fontSize: 14,
			fontWeight: 400,
			maxWidth: maxWidth,
			whiteSpace: "normal",
			boxShadow: `
      0px 4px 8px rgba(0, 0, 0, 0.08),
      0px 0px 2px rgba(0, 0, 0, 0.05)
    `,
			padding: "16px",
			position: "relative",
		},
		[`& .${tooltipClasses.arrow}`]: {
			color: backgroundColor,
			"&::before": {
				border: "1px solid var(--krds-color-gray-20)",
			},
		},
	}),
);

export const popAllTooltip = () => {
	tooltipInstances.forEach((instance) => {
		instance.setOpen(false);
	});
	activeTooltips.clear();
};

export const closeTooltipById = (id: string) => {
	const instance = tooltipInstances.get(id);
	if (instance) {
		instance.setOpen(false);
		activeTooltips.delete(id);
	}
};

export const openTooltipById = (id: string) => {
	const instance = tooltipInstances.get(id);
	if (instance) {
		instance.setOpen(true);
	}
};

export const ClickTooltip = ({
	children,
	text,
	position = "top-center",
	maxWidth,
	id,
	backgroundColor,
	valid = false,
	closeOnClickOutside = false,
	zIndex,
}: ClickTooltipProps) => {
	const [open, setOpen] = useState(false);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);

	const tooltipId = useMemo(() => {
		return id || `tooltip-${Math.random().toString(36).substr(2, 9)}`;
	}, [id]);

	useEffect(() => {
		if (tooltipId) {
			tooltipInstances.set(tooltipId, { setOpen });
		}

		return () => {
			if (tooltipId) {
				tooltipInstances.delete(tooltipId);
			}
		};
	}, [tooltipId]);

	useEffect(() => {
		if (open) {
			activeTooltips.set(tooltipId, handleClose);
			// 툴팁 열릴 때 닫기 버튼으로 포커스 이동
			setTimeout(() => {
				closeButtonRef.current?.focus();
			}, 100);
		} else {
			activeTooltips.delete(tooltipId);
		}
	}, [open, tooltipId]);

	const positionMap: Record<TooltipPosition, TooltipProps["placement"]> = {
		"top-left": "top-start",
		"top-center": "top",
		"top-right": "top-end",
		"bottom-left": "bottom-start",
		"bottom-center": "bottom",
		"bottom-right": "bottom-end",
		"right-top": "right-start",
		"right-center": "right",
		"right-bottom": "right-end",
		"left-top": "left-start",
		"left-center": "left",
		"left-bottom": "left-end",
	};

	const handleClose = () => {
		setOpen(false);
		// 닫힐 때 원래 버튼으로 포커스 복귀
		setTimeout(() => {
			triggerRef.current?.focus();
		}, 0);
	};

	const handleToggle = () => {
		if (valid) {
			return;
		}

		if (open) {
			handleClose();
		} else {
			setOpen(true);
		}
	};

	useEffect(() => {
		return () => {
			activeTooltips.delete(tooltipId);
		};
	}, [tooltipId]);

	useEffect(() => {
		if (!closeOnClickOutside) {
			return;
		}

		const handleClickOutside = (event: MouseEvent) => {
			if (open) {
				const target = event.target as Element;
				if (
					!target.closest('[role="tooltip"]') &&
					!target.closest("[data-tooltip-trigger]")
				) {
					handleClose();
				}
			}
		};

		if (open) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [open, closeOnClickOutside]);

	// Escape 키로 닫기
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape" && open) {
				handleClose();
			}
		};

		if (open) {
			document.addEventListener("keydown", handleKeyDown);
		}

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [open]);

	const tooltipContent = (
		<div
			data-tooltip-id={tooltipId}
			role="dialog"
			aria-label="오류 설명"
			style={{
				position: "relative",
				minHeight: "20px",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "flex-end",
				}}
			>
				<button
					type="button"
					ref={closeButtonRef}
					onClick={handleClose}
					aria-label="툴팁 닫기"
				>
					<Icon icon="Close" />
				</button>
			</div>
			<div style={{ paddingTop: "4px" }}>{text}</div>
		</div>
	);

	const triggerStyle = {
		cursor: valid ? "default" : "pointer",
		display: "inline-block",
		background: "none",
		border: "none",
		padding: 0,
		font: "inherit",
	};

	return (
		<CustomTooltip
			title={tooltipContent}
			arrow
			placement={positionMap[position]}
			maxWidth={maxWidth}
			backgroundColor={backgroundColor}
			zIndex={zIndex}
			open={open}
			disableHoverListener
			disableFocusListener
			disableTouchListener
		>
			{valid ? (
				<div data-tooltip-trigger style={triggerStyle}>
					{children}
				</div>
			) : (
				<button
					ref={triggerRef}
					type="button"
					onClick={handleToggle}
					data-tooltip-trigger
					style={triggerStyle}
					aria-label="오류 정보 보기"
					aria-expanded={open}
				>
					{children}
				</button>
			)}
		</CustomTooltip>
	);
};
