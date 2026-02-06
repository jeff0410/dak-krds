import { useCallback, useEffect, useRef } from "react";

interface UseFocusInDialogProps {
	id?: string;
}

const focusableElements =
	'button:not(:disabled), [href], input:not(:disabled), select, textarea, [tabindex]:not([tabindex="-1"])';

export const useFocusInDialog = ({ id }: UseFocusInDialogProps) => {
	const lastFocusedElement = useRef<HTMLElement | null>(null);

	const addEventForFocus = useCallback(() => {
		if (!id) return;

		const portals = document.getElementsByClassName("portal-wrap");
		const contentEl = Array.from(portals ?? []).find(
			(portal) => portal.getAttribute("data-id") === id,
		);

		if (!contentEl) return;

		const focusableList = contentEl?.querySelectorAll("button:not(:disabled)");
		const firstFocusEl = focusableList[focusableList.length - 1];

		if (firstFocusEl instanceof HTMLElement) firstFocusEl.focus();

		document.addEventListener("keydown", (e) => {
			const focusableList = contentEl.querySelectorAll(focusableElements);
			const firstElement = focusableList[0];
			const lastElement = focusableList[focusableList.length - 1];
			const isTabPressed = e.key === "Tab";

			if (!isTabPressed) return;

			if (e.shiftKey) {
				if (document.activeElement === firstElement) {
					if (lastElement instanceof HTMLElement) lastElement.focus();
					e.preventDefault();
					return;
				}
			}

			if (document.activeElement === lastElement) {
				if (firstElement instanceof HTMLElement) firstElement.focus();

				e.preventDefault();
			}
		});
	}, [id]);

	useEffect(() => {
		if (!id) return;

		if (!lastFocusedElement.current) {
			if (document.activeElement instanceof HTMLElement) {
				lastFocusedElement.current = document.activeElement;
			}
		}

		addEventForFocus();

		return () => {
			if (lastFocusedElement.current instanceof HTMLElement) {
				lastFocusedElement.current.focus();
			}
		};
	}, [id, addEventForFocus]);
};
