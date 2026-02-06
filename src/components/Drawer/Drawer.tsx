import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "src/components";
import type { DrawerProps } from "src/components/Drawer/Drawer.type";
import styles from "./Drawer.module.css";

export function Drawer({
	open,
	setOpen,
	position = "bottom",
	parentId = "app",
	children,
	title,
	className,
}: DrawerProps) {
	const [closing, setClosing] = useState(true);
	const appContainer = document.getElementById(parentId);
	useEffect(() => {
		if (appContainer) {
			appContainer.style.maxWidth = open ? "100dvw" : "initial";
			appContainer.style.maxHeight = open ? "100dvh" : "initial";
			appContainer.style.overflow = open ? "hidden" : "initial";
		}
		setTimeout(() => setClosing(!open), 230);
	}, [open, appContainer]);

	if (!appContainer) return null;
	return (
		<>
			{(open || !closing) &&
				createPortal(
					<div className={styles.overlay}>
						<div
							className={[styles.contentBox, className].join(" ")}
							style={{
								transition: "all 0.3s ease-in-out",
								...(position === "bottom" && {
									transform:
										open && !closing ? "translateY(0)" : "translateY(100%)",
								}),
								...(position === "top" && {
									transform:
										open && !closing ? "translateY(0)" : "translateY(-100%)",
								}),
								...(position === "left" && {
									transform:
										open && !closing ? "translateX(0)" : "translateX(-100%)",
								}),
								...(position === "right" && {
									transform:
										open && !closing ? "translateX(0)" : "translateX(100%)",
								}),
								[position]: "-12px",
								[`padding-${position}`]: "12px",
								width: ["top", "bottom"].includes(position) ? "100%" : "auto",
								height: ["left", "right"].includes(position) ? "100%" : "auto",
							}}
						>
							<div className={styles.titleWrapper}>
								{title && <h2 className={styles.title}>{title}</h2>}
								<button
									type={"button"}
									onClick={() => {
										setOpen(false);
										if (appContainer) {
											appContainer.style.maxWidth = "initial";
											appContainer.style.maxHeight = "initial";
											appContainer.style.overflow = "initial";
										}
									}}
								>
									<Icon icon="Close" size={20} />
								</button>
							</div>
							<div>{children}</div>
						</div>
					</div>,
					appContainer,
				)}
		</>
	);
}
