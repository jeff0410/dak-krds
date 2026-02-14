import React from 'react';
import { createPortal } from 'react-dom';
import styles from '../../CustomDatePicker.module.css';
import { CustomEventCalendar } from '../EventCalendar';
import type { LocalDate } from '@js-joda/core';

interface CustomDatePickerCalendarProps {
  type: 'single' | 'range';
  selectedDate?: LocalDate | null;
  selectedRange?: [LocalDate | null, LocalDate | null];
  onDateSelect: (date: LocalDate) => void;
  onConfirm: () => void;
  onCancel: () => void;
  minYear?: number;
  maxYear?: number;
  minDate?: LocalDate | null;
  maxDate?: LocalDate | null;
  calendarRef: React.RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  usePortal: boolean;
  position: 'top' | 'bottom';
  rootElement: HTMLElement | null;
  backgroundColor?: string;
  eventList?: string[];
  onMonthChange?: (yearMonth: string) => void;
}

export function CustomDatePickerCalendar({
  selectedDate,
  onDateSelect,
  onConfirm,
  calendarRef,
  isOpen,
  usePortal,
  position,
  rootElement,
  backgroundColor = '#ffffff',
  eventList = [],
  onMonthChange,
}: CustomDatePickerCalendarProps) {
  const handleDateChange = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const localDate = require('@js-joda/core').LocalDate.of(year, month, day);
    onDateSelect(localDate);
    onConfirm();
  };

  const calendarComponent = (
    <CustomEventCalendar
      value={selectedDate?.toString()}
      eventList={eventList}
      onChange={handleDateChange}
      onChangeMonth={onMonthChange}
      backgroundColor={backgroundColor}
      border={true}
      width='100%'
      onlyChangeMonth={false}
      today={true}
    />
  );

  if (!usePortal) {
    return (
      <div
        ref={calendarRef}
        className={`${styles.calendarDropdown} ${styles[position]} ${isOpen ? styles.open : ''}`}>
        {calendarComponent}
      </div>
    );
  }

  if (!isOpen || !rootElement) {
    return null;
  }

  return createPortal(
    <div
      ref={calendarRef}
      className={`${styles.calendarDropdown} ${styles.open}`}>
      {calendarComponent}
    </div>,
    rootElement,
  );
}
