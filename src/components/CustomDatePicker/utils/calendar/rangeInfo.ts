import type { LocalDate } from '@js-joda/core';

export interface RangeInfo {
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isRangeMiddle: boolean;
  isRangeStartOnly: boolean;
  isRangeSingle: boolean;
}

const DEFAULT_RANGE_INFO: RangeInfo = {
  isRangeStart: false,
  isRangeEnd: false,
  isRangeMiddle: false,
  isRangeStartOnly: false,
  isRangeSingle: false,
};

export const getRangeInfo = (
  date: LocalDate,
  range?: [LocalDate | null, LocalDate | null],
  calendarType?: 'single' | 'range',
): RangeInfo => {
  const isRangeMode = calendarType === 'range';
  const hasRange = Boolean(range);

  if (!isRangeMode || !hasRange) {
    return DEFAULT_RANGE_INFO;
  }

  const [start, end] = range!;

  const hasStartAndEnd = Boolean(start && end);
  const isStartAndEndSame = hasStartAndEnd && date.equals(start!) && date.equals(end!);
  const isStart = hasStartAndEnd && date.equals(start!);
  const isEnd = hasStartAndEnd && date.equals(end!);
  const isMiddle = hasStartAndEnd && date.isAfter(start!) && date.isBefore(end!);
  const isStartOnly = Boolean(start && !end && date.equals(start));

  if (isStartAndEndSame) {
    return { ...DEFAULT_RANGE_INFO, isRangeSingle: true };
  }

  if (isStart) {
    return { ...DEFAULT_RANGE_INFO, isRangeStart: true };
  }

  if (isEnd) {
    return { ...DEFAULT_RANGE_INFO, isRangeEnd: true };
  }

  if (isMiddle) {
    return { ...DEFAULT_RANGE_INFO, isRangeMiddle: true };
  }

  if (isStartOnly) {
    return { ...DEFAULT_RANGE_INFO, isRangeStartOnly: true };
  }

  return DEFAULT_RANGE_INFO;
};
