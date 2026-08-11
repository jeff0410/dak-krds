import type { LocalDate } from "@js-joda/core";
import type React from "react";
import { useEffect, useRef, useState } from "react";

export function useYearMonthSelector({
	currentDate,
	minYear = 2000,
	maxYear = 2030,
	onYearChange,
	onMonthChange,
}: {
	currentDate: LocalDate;
	minYear?: number;
	maxYear?: number;
	onYearChange: (year: number) => void;
	onMonthChange: (month: number) => void;
}) {
	const [isYearOpen, setIsYearOpen] = useState(false);
	const [isMonthOpen, setIsMonthOpen] = useState(false);
	const [yearDropdownOpenClass, setYearDropdownOpenClass] = useState(false);
	const [monthDropdownOpenClass, setMonthDropdownOpenClass] = useState(false);

	const yearDropdownRef = useRef<HTMLDivElement>(null);
	const monthDropdownRef = useRef<HTMLDivElement>(null);
	const yearSelectorRef = useRef<HTMLDivElement>(null);
	const monthSelectorRef = useRef<HTMLDivElement>(null);

	// 년도/월 옵션
	const years = Array.from(
		{ length: maxYear - minYear + 1 },
		(_, i) => minYear + i,
	);
	const months = Array.from({ length: 12 }, (_, i) => i + 1);

	const scrollToSelected = (
		dropdownRef: React.RefObject<HTMLDivElement | null>,
		selectedValue: number,
		items: number[],
	) => {
		if (dropdownRef.current) {
			const selectedIndex = items.indexOf(selectedValue);
			const itemHeight = 32;
			const dropdownHeight = dropdownRef.current.clientHeight;
			const scrollTop =
				selectedIndex * itemHeight - dropdownHeight / 2 + itemHeight / 2;

			dropdownRef.current.style.scrollBehavior = "auto";
			dropdownRef.current.scrollTop = Math.max(0, scrollTop);
		}
	};

	const [syncedYearOpen, setSyncedYearOpen] = useState(isYearOpen);
	const [syncedMonthOpen, setSyncedMonthOpen] = useState(isMonthOpen);

	if (syncedYearOpen !== isYearOpen) {
		setSyncedYearOpen(isYearOpen);
		setYearDropdownOpenClass(false);
	}

	if (syncedMonthOpen !== isMonthOpen) {
		setSyncedMonthOpen(isMonthOpen);
		setMonthDropdownOpenClass(false);
	}

	useEffect(() => {
		if (!isYearOpen) return;

		const openTimer = setTimeout(() => setYearDropdownOpenClass(true), 20);
		const scrollTimer = setTimeout(
			() => scrollToSelected(yearDropdownRef, currentDate.year(), years),
			0,
		);

		return () => {
			clearTimeout(openTimer);
			clearTimeout(scrollTimer);
		};
	}, [isYearOpen, currentDate, years, scrollToSelected]);

	useEffect(() => {
		if (!isMonthOpen) return;

		const openTimer = setTimeout(() => setMonthDropdownOpenClass(true), 20);
		const scrollTimer = setTimeout(
			() =>
				scrollToSelected(monthDropdownRef, currentDate.monthValue(), months),
			0,
		);

		return () => {
			clearTimeout(openTimer);
			clearTimeout(scrollTimer);
		};
	}, [isMonthOpen, currentDate, months, scrollToSelected]);

	useEffect(() => {
		if (!isYearOpen && !isMonthOpen) return;
		function handleClickOutside(e: MouseEvent) {
			if (
				isYearOpen &&
				yearSelectorRef.current &&
				!yearSelectorRef.current.contains(e.target as Node)
			) {
				setIsYearOpen(false);
			}
			if (
				isMonthOpen &&
				monthSelectorRef.current &&
				!monthSelectorRef.current.contains(e.target as Node)
			) {
				setIsMonthOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isYearOpen, isMonthOpen]);

	const handleYearSelect = (year: number) => {
		onYearChange(year);
		setIsYearOpen(false);
	};

	const handleMonthSelect = (month: number) => {
		onMonthChange(month);
		setIsMonthOpen(false);
	};

	const handleYearToggle = () => {
		setIsYearOpen(!isYearOpen);
		setIsMonthOpen(false);
	};

	const handleMonthToggle = () => {
		setIsMonthOpen(!isMonthOpen);
		setIsYearOpen(false);
	};

	return {
		isYearOpen,
		isMonthOpen,
		yearDropdownOpenClass,
		monthDropdownOpenClass,

		yearDropdownRef,
		monthDropdownRef,
		yearSelectorRef,
		monthSelectorRef,

		years,
		months,

		handleYearSelect,
		handleMonthSelect,
		handleYearToggle,
		handleMonthToggle,
	};
}
