import { useEffect, useRef } from "react";

export const usePopup = (setVisible: (visible: boolean) => void) => {
	const popupRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
				setVisible(false);
			}
		};
		window.addEventListener("click", handleClickOutside);
		return () => window.removeEventListener("click", handleClickOutside);
	}, [setVisible]);

	return popupRef;
};
