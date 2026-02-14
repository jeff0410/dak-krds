import type { CSSProperties } from 'react';

export interface CustomEventCalendarProps {
  value?: string; // 'YYYY-MM-DD' format
  eventList?: string[]; // ['YYYY-MM-DD', ...] format
  closedList?: string[]; // ['YYYY-MM-DD', ...] format - 휴관일
  today?: boolean; // default true
  disabledBaseDate?: string; // 'YYYY-MM-DD' - 기준일 이전/30일 이후 비활성
  onChange?: (date: string) => void; // returns 'YYYY-MM-DD'
  onChangeYear?: (year: string) => void; // returns 'YYYY'
  onChangeMonth?: (yearMonth: string) => void; // returns 'YYYY-MM'
  onlyChangeMonth?: boolean; // default false - true일 때 연/월 선택 없이 yyyy-MM 표시, 화살표로만 월 이동
  className?: string;
  border?: boolean; // default true
  width?: string;
  height?: string; // 높이 커스터마이징 (예: '100%', '500px')
  backgroundColor?: string; // 배경색 커스터마이징
  style?: CSSProperties;
}

export interface CustomEventDayInfo {
  date: string; // YYYY-MM-DD
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  hasEvent: boolean;
  isClosed: boolean; // 휴관일
  dayOfMonth: number;
}
