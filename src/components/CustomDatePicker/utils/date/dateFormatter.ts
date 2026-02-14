import type { CustomDatePattern } from '../../CustomDatePicker.type';
import { parseDate } from './dateParser';
import { DateTimeFormatter, type LocalDate } from '@js-joda/core';

export const DATE_FORMATTER = (pattern: CustomDatePattern) =>
  DateTimeFormatter.ofPattern(pattern);

const formatterCache: Map<string, DateTimeFormatter> = new Map();

const getFormatter = (pattern: string): DateTimeFormatter => {
  if (!formatterCache.has(pattern)) {
    formatterCache.set(pattern, DateTimeFormatter.ofPattern(pattern));
  }
  return formatterCache.get(pattern)!;
};

export const getSeparatorFromPattern = (pattern: CustomDatePattern): string => {
  const match = pattern.match(/[^yMd\s]+/);
  return match ? match[0] : '';
};

export const formatDateToString = (
  date: LocalDate | null,
  pattern: CustomDatePattern = 'yyyy-MM-dd',
): string => {
  if (!date) return '';
  return date.format(getFormatter(pattern));
};

export const getPlaceholder = (pattern: CustomDatePattern): string => {
  return pattern.toUpperCase();
};

export const autoFormatDate = (
  value: string,
  pattern: CustomDatePattern = 'yyyy-MM-dd',
): string => {
  const digits = value.replace(/\D/g, '');
  const separator = getSeparatorFromPattern(pattern);

  if (!separator || pattern === 'yyyyMMdd') {
    const maxLength = pattern.replace(/[^a-zA-Z]/g, '').length;
    return digits.slice(0, maxLength);
  }

  if (pattern.startsWith('yyyy'))
    return formatYearFirst(digits, separator, pattern);
  if (pattern.startsWith('yy'))
    return formatYearShortFirst(digits, separator, pattern);
  if (pattern.startsWith('MM'))
    return formatMonthFirst(digits, separator, pattern);
  if (pattern.startsWith('dd'))
    return formatDayFirst(digits, separator, pattern);

  return digits;
};

const formatYearFirst = (digits: string, sep: string, pattern: string) => {
  if (digits.length <= 4) return digits;
  if (pattern === 'yyyy') return digits.slice(0, 4);
  if (digits.length <= 6)
    return `${digits.slice(0, 4)}${sep}${digits.slice(4)}`;

  return `${digits.slice(0, 4)}${sep}${digits.slice(4, 6)}${sep}${digits.slice(6, 8)}`;
};

const formatMonthFirst = (digits: string, sep: string, pattern: string) => {
  if (digits.length <= 2) return digits;

  if (pattern.includes('yyyy') && !pattern.includes('dd')) {
    return `${digits.slice(0, 2)}${sep}${digits.slice(2, 6)}`;
  }

  return `${digits.slice(0, 2)}${sep}${digits.slice(2, 4)}${sep}${digits.slice(4, 8)}`;
};

//yy-MM-dd
const formatYearShortFirst = (digits: string, sep: string, pattern: string) => {
  const maxDigits = pattern.replace(/[^a-zA-Z]/g, '').length;
  const target = digits.slice(0, maxDigits);

  if (target.length <= 2) return target;
  if (target.length <= 4)
    return `${target.slice(0, 2)}${sep}${target.slice(2)}`;

  return `${target.slice(0, 2)}${sep}${target.slice(2, 4)}${sep}${target.slice(4, 6)}`;
};

//dd-MM-yyyy
const formatDayFirst = (digits: string, sep: string, pattern: string) => {
  const maxDigits = pattern.replace(/[^a-zA-Z]/g, '').length;
  const target = digits.slice(0, maxDigits);

  if (target.length <= 2) return target;
  if (target.length <= 4)
    return `${target.slice(0, 2)}${sep}${target.slice(2)}`;

  return `${target.slice(0, 2)}${sep}${target.slice(2, 4)}${sep}${target.slice(4, 8)}`;
};

export const normalizeDate = (
  date?: LocalDate | string | null,
  pattern: CustomDatePattern = 'yyyy-MM-dd',
): LocalDate | null => {
  if (!date) return null;
  if (typeof date !== 'string') return date;

  try {
    return parseDate(date, pattern);
  } catch {
    return null;
  }
};
