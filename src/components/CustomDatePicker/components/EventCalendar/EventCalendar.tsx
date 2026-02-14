import { useEffect, useMemo, useState } from 'react';
import { Icon } from '../../../index';
import { CustomYearMonthSelector } from '../Calendar/YearMonthSelector/YearMonthSelector';
import styles from './EventCalendar.module.css';
import type {
  CustomEventCalendarProps,
  CustomEventDayInfo,
} from './EventCalendar.type';
import { DayOfWeek, LocalDate, TemporalAdjusters } from '@js-joda/core';

export function CustomEventCalendar({
  value,
  eventList = [],
  closedList = [],
  today = true,
  disabledBaseDate,
  onChange = () => {},
  onChangeYear = () => {},
  onChangeMonth = () => {},
  onlyChangeMonth = false,
  className = '',
  border = true,
  width = '100%',
  height,
  backgroundColor,
  ...props
}: CustomEventCalendarProps) {
  const [selectedValue, setSelectedValue] = useState(value);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const selectedDate = useMemo(() => {
    if (!selectedValue) {
      return null;
    }
    try {
      return LocalDate.parse(selectedValue);
    } catch {
      return null;
    }
  }, [selectedValue]);

  const todayDate = LocalDate.now();
  const disabledBase = useMemo(() => {
    if (!disabledBaseDate) return null;
    try {
      return LocalDate.parse(disabledBaseDate);
    } catch {
      return null;
    }
  }, [disabledBaseDate]);
  const disabledRangeStart = disabledBase ?? todayDate;
  const disabledRangeEnd = disabledBase ? disabledBase.plusDays(30) : null;
  const [currentDate, setCurrentDate] = useState(
    selectedDate ?? LocalDate.now(),
  );

  const goToPrevMonth = () => {
    const newDate = currentDate.minusMonths(1);
    setCurrentDate(newDate);
    onChangeMonth(
      `${newDate.year()}-${String(newDate.monthValue()).padStart(2, '0')}`,
    );
  };

  const goToNextMonth = () => {
    const newDate = currentDate.plusMonths(1);
    setCurrentDate(newDate);
    onChangeMonth(
      `${newDate.year()}-${String(newDate.monthValue()).padStart(2, '0')}`,
    );
  };

  const goToYear = (year: number) => {
    const newDate = currentDate.withYear(year);
    setCurrentDate(newDate);
    onChangeYear(`${year}`);
  };

  const goToMonth = (month: number) => {
    const newDate = currentDate.withMonth(month);
    setCurrentDate(newDate);
    onChangeMonth(`${newDate.year()}-${String(month).padStart(2, '0')}`);
  };

  const generateDays = (): CustomEventDayInfo[] => {
    const year = currentDate.year();
    const month = currentDate.monthValue();

    const firstOfMonth = LocalDate.of(year, month, 1);
    const lastOfMonth = firstOfMonth.with(TemporalAdjusters.lastDayOfMonth());

    const startOfCalendar = firstOfMonth.with(
      TemporalAdjusters.previousOrSame(DayOfWeek.SUNDAY),
    );
    const endOfCalendar = lastOfMonth.with(
      TemporalAdjusters.nextOrSame(DayOfWeek.SATURDAY),
    );

    const days: CustomEventDayInfo[] = [];
    let current = startOfCalendar;

    while (!current.isAfter(endOfCalendar)) {
      const dateString = current.toString();

      days.push({
        date: dateString,
        isCurrentMonth: current.monthValue() === month,
        isToday: today && current.equals(todayDate),
        isSelected: selectedDate ? current.equals(selectedDate) : false,
        hasEvent: eventList.includes(dateString),
        isClosed: closedList.includes(dateString),
        dayOfMonth: current.dayOfMonth(),
      });

      current = current.plusDays(1);
    }

    return days;
  };

  const days = generateDays();

  const isOutOfRange = (dayInfo: CustomEventDayInfo) => {
    const dayDate = LocalDate.parse(dayInfo.date);
    if (dayDate.isBefore(disabledRangeStart)) {
      return true;
    }
    return disabledRangeEnd ? dayDate.isAfter(disabledRangeEnd) : false;
  };

  const isDateSelectable = (dayInfo: CustomEventDayInfo) => {
    if (eventList.length === 0) {
      return false;
    }
    return eventList.includes(dayInfo.date);
  };

  const getDayClassName = (dayInfo: CustomEventDayInfo) => {
    const classNames = [styles.day];
    const isDisabledRange = isOutOfRange(dayInfo);
    const isSelectable = isDateSelectable(dayInfo);

    if (!dayInfo.isCurrentMonth) {
      classNames.push(styles.dayOutOfMonth);
    }

    if (isDisabledRange || !isSelectable) {
      classNames.push(styles.dayPast);
    }

    if (dayInfo.isClosed) {
      classNames.push(styles.dayClosed);
    } else if (dayInfo.isSelected) {
      classNames.push(styles.daySelected);
    }

    if (dayInfo.hasEvent && dayInfo.isToday) {
      classNames.push(styles.dayEventToday);
    } else if (dayInfo.hasEvent) {
      classNames.push(styles.dayEvent);
    } else if (dayInfo.isToday) {
      classNames.push(styles.dayToday);
    }

    return classNames.join(' ');
  };

  const handleDayClick = (dayInfo: CustomEventDayInfo) => {
    if (
      dayInfo.isCurrentMonth &&
      !dayInfo.isClosed &&
      !isOutOfRange(dayInfo) &&
      isDateSelectable(dayInfo)
    ) {
      onChange(dayInfo.date);
    }
  };

  return (
    <div
      className={`${className} ${styles.calendar}`}
      style={{
        border: border ? '1px solid var(--krds-color-gray-20)' : 'none',
        borderRadius: '12px',
        width: width,
        height: height || undefined,
        backgroundColor: backgroundColor || undefined,
        ...props.style,
      }}
      {...props}>
      {onlyChangeMonth ? (
        <div className={styles.onlyMonthHeaderContainer}>
          <button
            type='button'
            className={styles.header}
            onClick={goToPrevMonth}>
            <Icon size={20} viewBox='0 0 24 24' icon='ArrowLeft' />
          </button>
          <div className={styles.simpleYearMonth}>
            {currentDate.year()}년{' '}
            {String(currentDate.monthValue()).padStart(2, '0')}월
          </div>
          <button
            type='button'
            className={styles.header}
            onClick={goToNextMonth}>
            <Icon size={20} viewBox='0 0 24 24' icon='ArrowRight' />
          </button>
        </div>
      ) : (
        <div className={styles.headerContainer}>
          <button
            type='button'
            className={styles.header}
            onClick={goToPrevMonth}>
            <Icon size={20} viewBox='0 0 24 24' icon='ArrowLeft' />
          </button>
          <div>
            <CustomYearMonthSelector
              currentDate={currentDate}
              minYear={2000}
              maxYear={2030}
              onYearChange={goToYear}
              onMonthChange={goToMonth}
            />
          </div>
          <button
            type='button'
            className={styles.header}
            onClick={goToNextMonth}>
            <Icon size={20} viewBox='0 0 24 24' icon='ArrowRight' />
          </button>
        </div>
      )}

      <div className={styles.calendarBody}>
        <div className={styles.weekdaysContainer}>
          {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className={styles.daysContainer}>
          {days.map((dayInfo) => (
            <button
              type='button'
              key={dayInfo.date}
              onClick={() => handleDayClick(dayInfo)}
              className={getDayClassName(dayInfo)}
              disabled={
                !dayInfo.isCurrentMonth ||
                dayInfo.isClosed ||
                isOutOfRange(dayInfo) ||
                !isDateSelectable(dayInfo)
              }
              style={{
                backgroundColor:
                  dayInfo.isSelected || dayInfo.isClosed
                    ? undefined
                    : backgroundColor || undefined,
              }}>
              {dayInfo.isCurrentMonth ? dayInfo.dayOfMonth : ''}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
