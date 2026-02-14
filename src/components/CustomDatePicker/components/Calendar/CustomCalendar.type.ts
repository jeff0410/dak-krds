import { CSSProperties } from 'react';
import type { LocalDate } from '@js-joda/core';

export interface CustomCalendarProps {
  type: 'single' | 'range';
  selectedDate?: LocalDate | null;
  onDateSelect?: (date: LocalDate) => void;

  selectedRange?: [LocalDate | null, LocalDate | null];
  currentStep?: 'start' | 'end';
  onRangeSelect?: (range: [LocalDate | null, LocalDate | null]) => void;

  onConfirm?: () => void;
  onCancel?: () => void;
  minYear?: number;
  maxYear?: number;
  minDate?: LocalDate | null;
  maxDate?: LocalDate | null;
  className?: string;
  buttonsDisabled?: boolean;
  border?: string | false;
  width?: string;
  style?: CSSProperties;
}

export interface CustomCalendarDay {
  date: LocalDate;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
  isDisabled: boolean;
}

export interface CustomCalendarWeek {
  year: number;
  month: number;
  days: CustomCalendarDay[];
}
