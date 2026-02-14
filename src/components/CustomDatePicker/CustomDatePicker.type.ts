import type { LocalDate } from '@js-joda/core';

export interface BaseCustomDatePickerProps {
  id: string;
  type?: 'single' | 'range';
  label?: string;
  minYear?: number;
  maxYear?: number;
  minDate?: LocalDate | string | null;
  maxDate?: LocalDate | string | null;
  width?: string | number;
  height?: string | number;
  placeholder?: string;
  disabled?: boolean;
  isRequired?: boolean;
  className?: string;
  useMessage?: boolean;
  titlePosition?: 'vertical' | 'horizontal';

  gap?: string | number;
  titleClassName?: string;
  usePortal?: boolean;
  portalGap?: number;
  isValid?: boolean;
  pattern?: CustomDatePattern;
  editable?: boolean;
  calendarBackgroundColor?: string;
  eventList?: string[];
  onMonthChange?: (yearMonth: string) => void;
}

export interface SingleCustomDatePickerProps extends BaseCustomDatePickerProps {
  type?: 'single';
  value?: LocalDate | string | null;
  onChange: (date: string) => void;
  useInput?: boolean;
}

export interface RangeCustomDatePickerProps extends BaseCustomDatePickerProps {
  type?: 'range';
  value?: LocalDate[] | string[] | null;
  onChange: (range: string[]) => void;
}

export interface CustomDayInfo {
  date: LocalDate;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  isRangeStart?: boolean;
  isRangeEnd?: boolean;
  isRangeMiddle?: boolean;
  isRangeStartOnly?: boolean;
  isRangeSingle?: boolean;
}

export type CustomDatePickerProps = SingleCustomDatePickerProps;
export type CustomSingleDatePickerProps = Omit<SingleCustomDatePickerProps, 'type'>;
export type CustomRangeDatePickerProps = Omit<RangeCustomDatePickerProps, 'type'>;

export type CustomDatePattern =
  | 'yyyy-MM-dd'
  | 'yyyy.MM.dd'
  | 'yyyy/MM/dd'
  | 'yyyyMMdd'

  // 한국형 (공백 포함 및 요일)
  | 'yyyy년 MM월 dd일'
  | 'yyyy. MM. dd.'

  // 해외 및 기타 (미국/유럽)
  | 'MM-dd-yyyy'
  | 'MM/dd/yyyy'
  | 'MM.dd.yyyy'
  | 'dd-MM-yyyy'
  | 'dd/MM/yyyy'
  | 'dd.MM.yyyy'

  // 연/월
  | 'yyyy-MM'
  | 'yyyy.MM'
  | 'yyyy/MM'
  | 'yyyyMM'
  | 'MM-yyyy'
  | 'MM.yyyy'
  | 'MM/yyyy'
  | 'MMyyyy'

  // 연도/날짜 단독
  | 'yyyy'
  | 'MM-dd'
  | 'MM/dd'
  | 'MM.dd'
  | 'MMdd'

  // 2자리 연도
  | 'yy-MM-dd'
  | 'yy.MM.dd'
  | 'yy/MM/dd'
  | 'yyMMdd';
