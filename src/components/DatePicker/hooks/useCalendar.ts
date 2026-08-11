import { DayOfWeek, LocalDate, TemporalAdjusters } from "@js-joda/core";
import { useState } from "react";
import { getFirstDayAndLastDayOfMonth } from "src/hooks";
import type { DayInfo } from "../DatePicker.type";

/**
 * @Datepicker 캘린더 커스텀 훅 😸
 *  오늘, 현재 날짜, 이전/다음 달로 이동, 년도/월 변경, 날짜 정보 생성 및 클래스 이름 반환
 *  날짜 범위 정보 생성 및 반환
 */

export const useCalendar = ({
	selectedDate,
	type,
	selectedRange,
	minDate,
	maxDate,
	minYear,
	maxYear,
}: {
	selectedDate?: LocalDate | null;
	type?: "single" | "range";
	selectedRange?: [LocalDate | null, LocalDate | null];
	minDate?: LocalDate | null;
	maxDate?: LocalDate | null;
	minYear?: number;
	maxYear?: number;
}) => {
	const today = LocalDate.now();
	const [currentDate, setCurrentDate] = useState(selectedDate || today);

	const [syncedSelectedDate, setSyncedSelectedDate] = useState(selectedDate);

	if (syncedSelectedDate !== selectedDate) {
		setSyncedSelectedDate(selectedDate);
		if (selectedDate) {
			setCurrentDate(selectedDate);
		}
	}

	const goToPrevMonth = () => {
		setCurrentDate(currentDate.minusMonths(1));
	};

	const goToNextMonth = () => {
		setCurrentDate(currentDate.plusMonths(1));
	};

	const goToYear = (year: number) => {
		setCurrentDate(currentDate.withYear(year));
	};

	const goToMonth = (month: number) => {
		setCurrentDate(currentDate.withMonth(month));
	};

	const getRangeInfo = (
		date: LocalDate,
		range?: [LocalDate | null, LocalDate | null],
		calendarType?: "single" | "range",
	) => {
		const defaultInfo = {
			isRangeStart: false,
			isRangeEnd: false,
			isRangeMiddle: false,
			isRangeStartOnly: false,
			isRangeSingle: false,
		};

		if (calendarType !== "range" || !range) {
			return defaultInfo;
		}

		const [start, end] = range;

		if (start && end && date.equals(start) && date.equals(end)) {
			return { ...defaultInfo, isRangeSingle: true };
		}

		if (start && end && date.equals(start)) {
			return { ...defaultInfo, isRangeStart: true };
		}

		if (start && end && date.equals(end)) {
			return { ...defaultInfo, isRangeEnd: true };
		}

		if (start && end && date.isAfter(start) && date.isBefore(end)) {
			return { ...defaultInfo, isRangeMiddle: true };
		}

		if (start && date.equals(start)) {
			return { ...defaultInfo, isRangeStartOnly: true };
		}

		return defaultInfo;
	};

	const generateDays = () => {
		const { firstDay, lastDay } = getFirstDayAndLastDayOfMonth(
			currentDate.toString(),
		);

		const firstOfMonth = LocalDate.of(
			firstDay.year(),
			firstDay.monthValue(),
			1,
		);
		const lastOfMonth = LocalDate.of(
			lastDay.year(),
			lastDay.monthValue(),
			lastDay.dayOfMonth(),
		);

		const startOfCalendar = firstOfMonth.with(
			TemporalAdjusters.previousOrSame(DayOfWeek.SUNDAY),
		);
		const endOfCalendar = lastOfMonth.with(
			TemporalAdjusters.nextOrSame(DayOfWeek.SATURDAY),
		);

		const days = [];
		let current = startOfCalendar;

		while (!current.isAfter(endOfCalendar)) {
			const minDateCheck = minDate && current.isBefore(minDate);
			const maxDateCheck = maxDate && current.isAfter(maxDate);
			const minYearCheck = minYear !== undefined && current.year() < minYear;
			const maxYearCheck = maxYear !== undefined && current.year() > maxYear;
			const isDisabled = Boolean(
				minDateCheck || maxDateCheck || minYearCheck || maxYearCheck,
			);

			days.push({
				date: current,
				isCurrentMonth: current.monthValue() === currentDate.monthValue(),
				isToday: current.equals(today),
				isSelected: selectedDate ? current.equals(selectedDate) : false,
				isDisabled,
				...getRangeInfo(current, selectedRange, type),
			});
			current = current.plusDays(1);
		}
		return days;
	};

	const getDayClassName = (
		dayInfo: DayInfo,
		index: number,
		totalDays: number,
	) => {
		const classNames = ["day"];

		const isFirstWeek = index < 7;
		const isLastWeek = index >= totalDays - 7;
		const isLeftmost = index % 7 === 0;
		const isRightmost = index % 7 === 6;

		if (!dayInfo.isCurrentMonth) {
			classNames.push("dayOutOfMonth");
		}

		if (dayInfo.isToday) {
			classNames.push("dayToday");
		}
		if (dayInfo.isSelected) {
			classNames.push("daySelected");
		}
		if (dayInfo.isDisabled) {
			classNames.push("dayDisabled");
		}

		if (type === "range") {
			const rangeClassMap: { [key: string]: string } = {
				isRangeSingle: "rangeSingle",
				isRangeStart: "rangeStart",
				isRangeEnd: "rangeEnd",
				isRangeMiddle: "rangeMiddle",
				isRangeStartOnly: "rangeStartOnly",
			};
			for (const key of Object.keys(rangeClassMap)) {
				if (dayInfo[key as keyof DayInfo]) {
					classNames.push(rangeClassMap[key]);
					if (key === "isRangeStart") {
						if (isFirstWeek) classNames.push("rangeStartFirstWeek");
						if (isLastWeek) classNames.push("rangeStartLastWeek");
					}
					if (key === "isRangeEnd") {
						if (isFirstWeek) classNames.push("rangeEndFirstWeek");
						if (isLastWeek) classNames.push("rangeEndLastWeek");
					}
					if (key === "isRangeMiddle") {
						if (isFirstWeek) classNames.push("rangeMiddleFirstWeek");
						if (isLastWeek) classNames.push("rangeMiddleLastWeek");
						if (isLeftmost) classNames.push("rangeMiddleLeftmost");
						if (isRightmost) classNames.push("rangeMiddleRightmost");
					}
					break;
				}
			}
		}

		return classNames;
	};

	const getRangeTextColor = (dayInfo: DayInfo) => {
		if (type === "range") {
			if (
				dayInfo.isRangeStart ||
				dayInfo.isRangeEnd ||
				dayInfo.isRangeStartOnly ||
				dayInfo.isRangeSingle
			) {
				return "var(--krds-color-gray-0)";
			}
		}

		if (dayInfo.isSelected) {
			return "var(--krds-color-gray-0)";
		}

		return dayInfo.isCurrentMonth
			? "var(--krds-color-gray-90)"
			: "var(--krds-color-gray-40)";
	};

	return {
		today,
		currentDate,
		goToPrevMonth,
		goToNextMonth,
		goToYear,
		goToMonth,
		generateDays,
		getDayClassName,
		getRangeTextColor,
	};
};
