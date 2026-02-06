import { useEffect, useRef, useState } from "react";
import { ToastBar } from "./ToastBar";
import styles from "./ToastBar.module.css";
import type { ToastBarProps } from "./ToastBar.type";
import { useToastBarCustomEventListener } from "./utils";

export const ToastBarManager = () => {
	const [toastbars, setToastbars] = useState<ToastBarProps[]>([]);
	const previousLengthRef = useRef(toastbars.length);

	/* toastBar Event 들을 감지하는 훅스 **/
	useToastBarCustomEventListener({ toastbars, setToastbars });

	// 새 토스트가 추가되었을 때 최신 토스트에 포커스
	useEffect(() => {
		if (toastbars.length > previousLengthRef.current) {
			const latestToast = toastbars[toastbars.length - 1];
			// DOM 업데이트 후 포커스 이동
			setTimeout(() => {
				const toastElement = document.getElementById(latestToast.id);
				if (toastElement) {
					toastElement.focus();
				}
			}, 100);
		}
		previousLengthRef.current = toastbars.length;
	}, [toastbars]);

	return (
		<div className={styles.toastBarWrapper}>
			{toastbars.map((toastBarProps) => (
				<ToastBar
					key={toastBarProps.id}
					style={{
						transition: "all 300ms ease",
					}}
					{...toastBarProps}
				/>
			))}
		</div>
	);
};
