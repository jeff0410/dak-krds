// utils/dateValidation.ts
import { DateTimeFormatter, LocalDate } from '@js-joda/core';

export interface ValidationResult {
  isValid: boolean;
  errorMessage: string;
}

export const createDateValidator = (
  formatMinDate?: LocalDate | null,
  formatMaxDate?: LocalDate | null,
  minYear?: number,
  maxYear?: number,
) => {
  return (date: LocalDate | null): ValidationResult => {
    if (!date) {
      return { isValid: false, errorMessage: 'yyyy-MM-dd 형식으로 입력해주세요.' };
    }

    if (minYear && date.year() < minYear) {
      return { isValid: false, errorMessage: `${minYear}년 이후의 날짜를 입력해주세요.` };
    }

    if (maxYear && date.year() > maxYear) {
      return { isValid: false, errorMessage: `${maxYear}년 이전의 날짜를 입력해주세요.` };
    }

    if (formatMinDate && date.isBefore(formatMinDate)) {
      const minDateStr = formatMinDate.format(DateTimeFormatter.ofPattern('yyyy-MM-dd'));
      const maxDateStr = formatMaxDate
        ? formatMaxDate.format(DateTimeFormatter.ofPattern('yyyy-MM-dd'))
        : '현재';
      return {
        isValid: false,
        errorMessage: `${minDateStr}${formatMaxDate ? `~${maxDateStr}` : ' 이후'} 기간내를 선택하세요.`,
      };
    }

    if (formatMaxDate && date.isAfter(formatMaxDate)) {
      const minDateStr = formatMinDate
        ? formatMinDate.format(DateTimeFormatter.ofPattern('yyyy-MM-dd'))
        : '과거';
      const maxDateStr = formatMaxDate.format(DateTimeFormatter.ofPattern('yyyy-MM-dd'));
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

export const parseDate = (val: string): LocalDate | null => {
  if (!val.trim()) {
    return null;
  }
  try {
    return LocalDate.parse(val);
  } catch {
    return null;
  }
};

export const formatDate = (date: LocalDate): string => {
  return date.format(DateTimeFormatter.ofPattern('yyyy-MM-dd'));
};
