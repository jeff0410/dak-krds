import type { CustomDatePattern } from '../../CustomDatePicker.type';
import { DATE_FORMATTER } from './dateFormatter';
import { LocalDate } from '@js-joda/core';

/**
 * 날짜 문자열을 LocalDate로 파싱하는 유틸리티 함수
 * @param val - 파싱할 날짜 문자열 (null 또는 undefined 가능)
 * @returns 파싱된 LocalDate 또는 null
 */
export const parseDate = (
  val: string | null | undefined,
  pattern: CustomDatePattern,
): LocalDate | null => {
  if (!val || !val.trim()) {
    return null;
  }
  try {
    return LocalDate.parse(val, DATE_FORMATTER(pattern));
  } catch {
    return null;
  }
};
