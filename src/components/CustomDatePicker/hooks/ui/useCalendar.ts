import { useEffect, useState } from 'react';
import { getFirstDayAndLastDayOfMonth } from 'src/hooks';
import { getDayClassNames, getRangeInfo } from '../../utils';
import type { CustomDayInfo } from '../../CustomDatePicker.type';
import { DayOfWeek, LocalDate, TemporalAdjusters } from '@js-joda/core';

export const useCustomCalendar = ({
  selectedDate,
  type,
  selectedRange,
  minDate,
  maxDate,
  minYear,
  maxYear,
}: {
  selectedDate?: LocalDate | null;
  type?: 'single' | 'range';
  selectedRange?: [LocalDate | null, LocalDate | null];
  minDate?: LocalDate | null;
  maxDate?: LocalDate | null;
  minYear?: number;
  maxYear?: number;
}) => {
  const today = LocalDate.now();
  const [currentDate, setCurrentDate] = useState(selectedDate || today);

  useEffect(() => {
    if (selectedDate) {
      setCurrentDate(selectedDate);
    }
  }, [selectedDate]);

  const goToPrevMonth = () => {
    setCurrentDate(currentDate.minusMonths(1));
    console.log('goToPrevMonth', currentDate.toString());
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

      const rangeInfo = getRangeInfo(current, selectedRange, type);

      days.push({
        date: current,
        isCurrentMonth: current.monthValue() === currentDate.monthValue(),
        isToday: current.equals(today),
        isSelected: selectedDate ? current.equals(selectedDate) : false,
        isDisabled,
        ...rangeInfo,
      });
      current = current.plusDays(1);
    }
    return days;
  };

  const getDayClassName = (
    dayInfo: CustomDayInfo,
    index: number,
    totalDays: number,
  ) => {
    return getDayClassNames(dayInfo, index, totalDays, type || 'single');
  };

  const getRangeTextColor = (dayInfo: CustomDayInfo) => {
    if (type === 'range') {
      if (
        dayInfo.isRangeStart ||
        dayInfo.isRangeEnd ||
        dayInfo.isRangeStartOnly ||
        dayInfo.isRangeSingle
      ) {
        return 'var(--krds-color-gray-0)';
      }
    }

    if (dayInfo.isSelected) {
      return 'var(--krds-color-gray-0)';
    }

    return dayInfo.isCurrentMonth
      ? 'var(--krds-color-gray-90)'
      : 'var(--krds-color-gray-40)';
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
