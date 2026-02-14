import type { CustomDayInfo } from '../../CustomDatePicker.type';

interface DayPosition {
  isFirstWeek: boolean;
  isLastWeek: boolean;
  isLeftmost: boolean;
  isRightmost: boolean;
}

const getDayPosition = (index: number, totalDays: number): DayPosition => {
  const isFirstWeek = index < 7;
  const isLastWeek = index >= totalDays - 7;
  const isLeftmost = index % 7 === 0;
  const isRightmost = index % 7 === 6;

  return { isFirstWeek, isLastWeek, isLeftmost, isRightmost };
};

const getRangeClassNames = (
  dayInfo: CustomDayInfo,
  position: DayPosition,
): string[] => {
  const classNames: string[] = [];
  const { isFirstWeek, isLastWeek, isLeftmost, isRightmost } = position;

  const rangeClassMap: Record<string, string> = {
    isRangeSingle: 'rangeSingle',
    isRangeStart: 'rangeStart',
    isRangeEnd: 'rangeEnd',
    isRangeMiddle: 'rangeMiddle',
    isRangeStartOnly: 'rangeStartOnly',
  };

  for (const [key, className] of Object.entries(rangeClassMap)) {
    if (dayInfo[key as keyof CustomDayInfo]) {
      classNames.push(className);

      if (key === 'isRangeStart') {
        if (isFirstWeek) classNames.push('rangeStartFirstWeek');
        if (isLastWeek) classNames.push('rangeStartLastWeek');
      }

      if (key === 'isRangeEnd') {
        if (isFirstWeek) classNames.push('rangeEndFirstWeek');
        if (isLastWeek) classNames.push('rangeEndLastWeek');
      }

      if (key === 'isRangeMiddle') {
        if (isFirstWeek) classNames.push('rangeMiddleFirstWeek');
        if (isLastWeek) classNames.push('rangeMiddleLastWeek');
        if (isLeftmost) classNames.push('rangeMiddleLeftmost');
        if (isRightmost) classNames.push('rangeMiddleRightmost');
      }

      break;
    }
  }

  return classNames;
};

export const getDayClassNames = (
  dayInfo: CustomDayInfo,
  index: number,
  totalDays: number,
  type: 'single' | 'range',
): string[] => {
  const classNames: string[] = ['day'];
  const position = getDayPosition(index, totalDays);

  const isOutOfMonth = !dayInfo.isCurrentMonth;
  const isToday = dayInfo.isToday;
  const isSelected = dayInfo.isSelected;
  const isDisabled = dayInfo.isDisabled;

  if (isOutOfMonth) {
    classNames.push('dayOutOfMonth');
  }

  if (isToday) {
    classNames.push('dayToday');
  }

  if (isSelected) {
    classNames.push('daySelected');
  }

  if (isDisabled) {
    classNames.push('dayDisabled');
  }

  if (type === 'range') {
    const rangeClassNames = getRangeClassNames(dayInfo, position);
    classNames.push(...rangeClassNames);
  }

  return classNames;
};
