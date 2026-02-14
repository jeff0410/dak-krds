import { useCallback, useEffect, useState } from 'react';
import {
  autoFormatDate,
  convertToDateRange,
  formatDateToString,
  normalizeDate,
  parseDate,
} from '../../utils';
import type { CustomDatePattern } from '../../CustomDatePicker.type';
import { useCustomRangeValidation } from '../validation';
import type { LocalDate } from '@js-joda/core';

export const useCustomRangeDatePickerState = (
  value?: LocalDate[] | string[] | null,
  minDate?: LocalDate | string | null,
  maxDate?: LocalDate | string | null,
  minYear?: number,
  maxYear?: number,
  pattern: CustomDatePattern = 'yyyy-MM-dd',
  onChange?: (range: string[]) => void,
) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<'start' | 'end'>('start');

  const [tempRange, setTempRange] = useState<
    [LocalDate | null, LocalDate | null]
  >(() => convertToDateRange(value, pattern));

  const [startInput, setStartInput] = useState('');
  const [endInput, setEndInput] = useState('');

  const syncState = useCallback(
    (value?: LocalDate[] | string[] | null) => {
      const range = convertToDateRange(value, pattern);
      setTempRange(range);
      setStartInput(range[0] ? formatDateToString(range[0], pattern) : '');
      setEndInput(range[1] ? formatDateToString(range[1], pattern) : '');
    },
    [pattern],
  );

  useEffect(() => {
    syncState(value);
  }, [value, syncState]);

  const formatMinDate = normalizeDate(minDate, pattern);
  const formatMaxDate = normalizeDate(maxDate, pattern);

  const handleValidate = useCallback(
    (validRange: string[]) => {
      const [s, e] = validRange;
      setTempRange([
        s ? parseDate(s, pattern) : null,
        e ? parseDate(e, pattern) : null,
      ]);
    },
    [pattern],
  );

  const {
    isStartValidInput,
    isEndValidInput,
    startErrorMessage,
    endErrorMessage,
    validateStartInput,
    validateEndInput,
    resetAll,
  } = useCustomRangeValidation(
    formatMinDate,
    formatMaxDate,
    minYear,
    maxYear,
    tempRange,
    pattern,
    handleValidate,
  );

  const handleStartInputChange = (value: string) => {
    const formatted = autoFormatDate(value, pattern);
    setStartInput(formatted);
    validateStartInput(formatted);
  };

  const handleEndInputChange = (value: string) => {
    const formatted = autoFormatDate(value, pattern);
    setEndInput(formatted);
    validateEndInput(formatted);
  };

  const handleBlur = useCallback(() => {
    const isInvalid = !isStartValidInput || !isEndValidInput;
    const isEmpty = !startInput || !endInput;

    if (isInvalid || isEmpty) return;

    const [originStart, originEnd] = convertToDateRange(value, pattern);
    const originStartStr = originStart
      ? formatDateToString(originStart, pattern)
      : '';
    const originEndStr = originEnd
      ? formatDateToString(originEnd, pattern)
      : '';

    if (startInput === originStartStr && endInput === originEndStr) return;

    onChange?.([startInput, endInput]);
  }, [
    value,
    pattern,
    isStartValidInput,
    isEndValidInput,
    startInput,
    endInput,
    onChange,
  ]);

  const handleDateClick = (date: LocalDate) => {
    const [start, end] = tempRange;
    const formattedDate = formatDateToString(date, pattern);

    if ((start && end) || currentStep === 'start') {
      setTempRange([date, null]);
      setStartInput(formattedDate);
      setEndInput('');
      setCurrentStep('end');
      return;
    }

    if (start && date.isBefore(start)) {
      setTempRange([date, null]);
      setStartInput(formattedDate);
      return;
    }

    if (start) {
      setTempRange([start, date]);
      setEndInput(formattedDate);
      setCurrentStep('start');
      return;
    }
  };

  const handleConfirm = () => {
    if (isStartValidInput && isEndValidInput && startInput && endInput) {
      onChange?.([startInput, endInput]);
      setIsOpen(false);
    }
  };

  const handleCancel = useCallback(() => {
    syncState(value);
    setIsOpen(false);
    setCurrentStep('start');
    resetAll();
  }, [value, syncState, resetAll]);

  return {
    selectedRange: tempRange,
    startInputValue: startInput,
    endInputValue: endInput,
    formatMinDate,
    formatMaxDate,
    isOpen,
    currentStep,
    setIsOpen,
    handleDateClick,
    handleConfirm,
    handleCancel,
    handleStartInputChange,
    handleEndInputChange,
    handleBlur,
    isStartValidInput,
    isEndValidInput,
    startErrorMessage,
    endErrorMessage,
  };
};
