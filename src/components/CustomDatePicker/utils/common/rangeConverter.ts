import type { CustomDatePattern } from '../../CustomDatePicker.type';
import { parseDate } from '../date';
import type { LocalDate } from '@js-joda/core';

export const convertToDateRange = (
  value?: LocalDate[] | string[] | null,
  pattern: CustomDatePattern = 'yyyy-MM-dd',
): [LocalDate | null, LocalDate | null] => {
  if (!value || value.length === 0) return [null, null];

  if (typeof value[0] === 'string') {
    const stringArray = value as string[];
    const start = stringArray[0] ? parseDate(stringArray[0], pattern) : null;
    const end = stringArray[1] ? parseDate(stringArray[1], pattern) : null;
    return [start, end];
  } else {
    const dateArray = value as LocalDate[];
    return [dateArray[0] || null, dateArray[1] || null];
  }
};
