import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  createDateValidator,
  formatDateToString,
  parseDate,
} from '../../utils';
import type { CustomDatePattern } from '../../CustomDatePicker.type';
import type { LocalDate } from '@js-joda/core';
import { debounce } from 'lodash-es';

export const useCustomRangeValidation = (
  formatMinDate?: LocalDate | null,
  formatMaxDate?: LocalDate | null,
  minYear?: number,
  maxYear?: number,
  selectedRange?: [LocalDate | null, LocalDate | null],
  pattern: CustomDatePattern = 'yyyy-MM-dd',
  onChange?: (range: string[]) => void,
) => {
  const startDebounceRef = useRef<ReturnType<typeof debounce> | null>(null);
  const endDebounceRef = useRef<ReturnType<typeof debounce> | null>(null);

  const [isStartValidInput, setIsStartValidInput] = useState<boolean>(true);
  const [isEndValidInput, setIsEndValidInput] = useState<boolean>(true);
  const [startErrorMessage, setStartErrorMessage] = useState<string>('');
  const [endErrorMessage, setEndErrorMessage] = useState<string>('');

  const validateRangeDate = useCallback(
    (date: LocalDate, isStart: boolean) => {
      const baseValidation = createDateValidator(
        formatMinDate,
        formatMaxDate,
        minYear,
        maxYear,
        pattern,
      )(date);
      if (!baseValidation.isValid) return baseValidation;

      const [start, end] = selectedRange ?? [null, null];
      if (isStart && end && date.isAfter(end)) {
        return {
          isValid: false,
          errorMessage: '시작일은 종료일보다 이전이어야 합니다.',
        };
      }
      if (!isStart && start && date.isBefore(start)) {
        return {
          isValid: false,
          errorMessage: '종료일은 시작일보다 이후여야 합니다.',
        };
      }

      return { isValid: true, errorMessage: '' };
    },
    [formatMinDate, formatMaxDate, minYear, maxYear, selectedRange, pattern],
  );

  const executeValidation = useCallback(
    (val: string, isStart: boolean) => {
      const setValid = isStart ? setIsStartValidInput : setIsEndValidInput;
      const setError = isStart ? setStartErrorMessage : setEndErrorMessage;
      const [start, end] = selectedRange || [null, null];

      if (!val.trim()) {
        setValid(true);
        setError('');
        const otherSide = isStart ? end : start;
        const nextRange = isStart
          ? ['', otherSide ? formatDateToString(otherSide, pattern) : '']
          : [otherSide ? formatDateToString(otherSide, pattern) : '', ''];
        onChange?.(nextRange);
        return;
      }

      const parsedDate = parseDate(val, pattern);
      if (!parsedDate) {
        setValid(false);
        setError(`${pattern} 형식으로 입력해주세요.`);
        return;
      }

      const validation = validateRangeDate(parsedDate, isStart);
      setValid(validation.isValid);
      setError(validation.errorMessage);

      if (validation.isValid) {
        const otherSide = isStart ? end : start;
        const formatted = formatDateToString(parsedDate, pattern);
        const nextRange = isStart
          ? [formatted, otherSide ? formatDateToString(otherSide, pattern) : '']
          : [
              otherSide ? formatDateToString(otherSide, pattern) : '',
              formatted,
            ];
        onChange?.(nextRange);
      }
    },
    [selectedRange, pattern, validateRangeDate, onChange],
  );

  const validateStartInput = useMemo(
    () => debounce((v: string) => executeValidation(v, true), 500),
    [executeValidation],
  );
  const validateEndInput = useMemo(
    () => debounce((v: string) => executeValidation(v, false), 500),
    [executeValidation],
  );

  useEffect(() => {
    return () => {
      validateStartInput.cancel();
      validateEndInput.cancel();
    };
  }, [validateStartInput, validateEndInput]);

  const resetAll = useCallback(() => {
    setIsStartValidInput(true);
    setIsEndValidInput(true);
    setStartErrorMessage('');
    setEndErrorMessage('');
  }, []);

  return {
    startDebounceRef,
    endDebounceRef,
    isStartValidInput,
    isEndValidInput,
    startErrorMessage,
    endErrorMessage,
    validateStartInput: (value: string) => validateStartInput(value),
    validateEndInput: (value: string) => validateEndInput(value),
    resetStart: () => {
      setIsStartValidInput(true);
      setStartErrorMessage('');
    },
    resetEnd: () => {
      setIsEndValidInput(true);
      setEndErrorMessage('');
    },
    resetAll,
  };
};
