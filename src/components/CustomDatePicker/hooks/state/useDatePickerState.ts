import { useCallback, useEffect, useState } from 'react';
import {
  autoFormatDate,
  formatDateToString,
  normalizeDate,
  parseDate,
} from '../../utils';
import type { CustomDatePattern } from '../../CustomDatePicker.type';
import { useCustomDateValidation } from '../validation';
import type { LocalDate } from '@js-joda/core';

export const useCustomDatePickerState = (
  initialValue?: LocalDate | string | null,
  minDate?: LocalDate | string | null,
  maxDate?: LocalDate | string | null,
  minYear?: number,
  maxYear?: number,
  pattern: CustomDatePattern = 'yyyy-MM-dd',
  onChange?: (date: string) => void,
) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tempSelectedDate, setTempSelectedDate] = useState<LocalDate | null>(
    () => normalizeDate(initialValue, pattern),
  );
  const [tempInputValue, setTempInputValue] = useState(
    tempSelectedDate ? formatDateToString(tempSelectedDate, pattern) : '',
  );

  useEffect(() => {
    const nextDate = normalizeDate(initialValue, pattern);
    setTempSelectedDate(nextDate);
    setTempInputValue(nextDate ? formatDateToString(nextDate, pattern) : '');
  }, [initialValue, pattern]);

  const formatMinDate = normalizeDate(minDate, pattern);
  const formatMaxDate = normalizeDate(maxDate, pattern);

  const handleValidate = useCallback(
    (validDate: string) => {
      const parsedDate = parseDate(validDate, pattern);
      setTempSelectedDate(parsedDate);
    },
    [pattern],
  );

  const { isValidInput, errorMessage, validateInput, reset } =
    useCustomDateValidation(
      formatMinDate,
      formatMaxDate,
      minYear,
      maxYear,
      pattern,
      handleValidate,
    );

  const handleInputChange = (value: string) => {
    const formatted = autoFormatDate(value, pattern);
    setTempInputValue(formatted);
    validateInput(formatted);
  };

  const handleBlur = useCallback(() => {
    if (!isValidInput || !tempInputValue) return;

    const origin = normalizeDate(initialValue, pattern);
    const originValue = origin ? formatDateToString(origin, pattern) : '';
    if (originValue === tempInputValue) return;

    onChange?.(tempInputValue);

    const parsed = parseDate(tempInputValue, pattern);
    if (parsed) setTempSelectedDate(parsed);
  }, [initialValue, pattern, isValidInput, tempInputValue, onChange]);

  const handleDateClick = (date: LocalDate) => {
    const formattedDate = formatDateToString(date, pattern);
    setTempInputValue(formattedDate);
    setTempSelectedDate(date);
    reset();
    onChange?.(formattedDate);
  };
  const handleConfirm = () => {
    setIsOpen(false);
  };

  const handleCancel = useCallback(() => {
    const originalDate = normalizeDate(initialValue, pattern);
    setTempSelectedDate(originalDate);
    setTempInputValue(
      originalDate ? formatDateToString(originalDate, pattern) : '',
    );
    setIsOpen(false);
    reset();
  }, [initialValue, pattern, reset]);

  const getCurrentSelectedDate = () => {
    const parsed = parseDate(tempInputValue, pattern);
    return parsed ?? tempSelectedDate;
  };

  return {
    selectedDate: tempSelectedDate,
    formatMinDate,
    formatMaxDate,
    inputValue: tempInputValue,
    currentSelectedDate: getCurrentSelectedDate(),
    isOpen,
    setIsOpen,
    handleDateClick,
    handleConfirm,
    handleCancel,
    handleInputChange,
    handleBlur,
    isValidInput,
    errorMessage,
  };
};
