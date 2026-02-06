import type { LocalDate } from "@js-joda/core";
import { Icon } from "../../../../index";
import { useYearMonthSelector } from "../../../hooks/useSelector";
import styles from "./YearMonthSelector.module.css";

interface YearMonthSelectorProps {
	currentDate: LocalDate;
	minYear?: number;
	maxYear?: number;
	onYearChange: (year: number) => void;
	onMonthChange: (month: number) => void;
}

export function YearMonthSelector({
	currentDate,
	minYear = 2000,
	maxYear = 2030,
	onYearChange,
	onMonthChange,
}: YearMonthSelectorProps) {
	const {
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
	} = useYearMonthSelector({
		currentDate,
		minYear,
		maxYear,
		onYearChange,
		onMonthChange,
	});

	return (
		<div className={styles.container}>
			{/* 년도 */}
			<div className={styles.selector} ref={yearSelectorRef}>
				<button
					type={"button"}
					className={styles.selectorButton}
					onClick={handleYearToggle}
				>
					<span>{currentDate.year()}년</span>
					<Icon
						icon={isYearOpen ? "ArrowDropUp" : "ArrowDropDown"}
						color="var(--krds-color-gray-90)"
						size={20}
					/>
				</button>
				{isYearOpen && (
					<div
						ref={yearDropdownRef}
						className={`${styles.dropdown} ${yearDropdownOpenClass ? styles.open : ""}`}
					>
						{years.map((year) => (
							<button
								type={"button"}
								key={year}
								className={`${styles.option} ${year === currentDate.year() ? styles.selected : ""}`}
								onClick={() => handleYearSelect(year)}
							>
								{year}년
							</button>
						))}
					</div>
				)}
			</div>

			{/* 월 */}
			<div className={styles.selector} ref={monthSelectorRef}>
				<button
					type={"button"}
					className={styles.selectorButton}
					onClick={handleMonthToggle}
				>
					<span>{currentDate.monthValue()}월</span>
					<Icon
						icon={isMonthOpen ? "ArrowDropUp" : "ArrowDropDown"}
						color="var(--krds-color-gray-90)"
						size={20}
					/>
				</button>
				{isMonthOpen && (
					<div
						ref={monthDropdownRef}
						className={`${styles.dropdown} ${monthDropdownOpenClass ? styles.open : ""}`}
					>
						{months.map((month) => (
							<button
								type={"button"}
								key={month}
								className={`${styles.option} ${month === currentDate.monthValue() ? styles.selected : ""}`}
								onClick={() => handleMonthSelect(month)}
							>
								{month}월
							</button>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
