import type { RefObject } from "react";
import { useState } from "react";

/**
 * @Datepicker 여유 높이별 calendar position 😸
 *  input 하단 여유 높이와 상단 여유 높이를 비교하여 calendar의 위치를 결정
 */
export const useCalendarPosition = (
	inputRef: RefObject<HTMLInputElement | null>,
) => {
	const [position, setPosition] = useState<"top" | "bottom">("bottom");

	const calPosition = () => {
		if (!inputRef.current) return;

		const inputRect = inputRef.current.getBoundingClientRect();
		const viewportHeight = window.innerHeight;
		const calendarHeight = 400;

		const spaceBelow = viewportHeight - inputRect.bottom;
		const spaceAbove = inputRect.top;

		if (spaceBelow >= calendarHeight || spaceBelow > spaceAbove) {
			setPosition("bottom");
			return "bottom";
		} else {
			setPosition("top");
			return "top";
		}
	};

	return { position, calPosition };
};
