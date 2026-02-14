import type { LocalDate } from '@js-joda/core';
import type { CustomDatePattern } from '../../CustomDatePicker.type';
import { formatDateToString, getPlaceholder } from './dateFormatter';

export interface ValidationResult {
  isValid: boolean;
  errorMessage: string;
}

export const createDateValidator = (
  formatMinDate?: LocalDate | null,
  formatMaxDate?: LocalDate | null,
  minYear?: number,
  maxYear?: number,
  pattern: CustomDatePattern = 'yyyy-MM-dd',
) => {
  const dateFormat = getPlaceholder(pattern);
  return (date: LocalDate | null): ValidationResult => {
    if (!date) {
      return { isValid: false, errorMessage: `${dateFormat} 형식으로 입력해주세요.` };
    }

    if (minYear && date.year() < minYear) {
      return { isValid: false, errorMessage: `${minYear}년 이후의 날짜를 입력해주세요.` };
    }

    if (maxYear && date.year() > maxYear) {
      return { isValid: false, errorMessage: `${maxYear}년 이전의 날짜를 입력해주세요.` };
    }

    if (formatMinDate && date.isBefore(formatMinDate)) {
      const minDateStr = formatDateToString(formatMinDate, pattern);
      const maxDateStr = formatMaxDate ? formatDateToString(formatMaxDate, pattern) : '현재';
      return {
        isValid: false,
        errorMessage: `${minDateStr}${formatMaxDate ? `~${maxDateStr}` : ' 이후'} 기간내를 선택하세요.`,
      };
    }

    if (formatMaxDate && date.isAfter(formatMaxDate)) {
      const minDateStr = formatMinDate ? formatDateToString(formatMinDate, pattern) : '과거';
      const maxDateStr = formatDateToString(formatMaxDate, pattern);
      return {
        isValid: false,
        errorMessage: `${formatMinDate ? `${minDateStr}~` : ''}${maxDateStr} 이전 기간내를 선택하세요.`,
      };
    }

    return { isValid: true, errorMessage: '' };
  };
};

export const validateDateFormat = (val: string): boolean => {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  return datePattern.test(val);
};

export { formatDateToString as formatDate } from './dateFormatter';
export { parseDate } from './dateParser';
