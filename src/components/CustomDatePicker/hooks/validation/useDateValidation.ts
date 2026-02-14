import { useCallback, useEffect, useRef, useState } from 'react';
import { createDateValidator, formatDate, parseDate } from '../../utils';
import type { CustomDatePattern } from '../../CustomDatePicker.type';
import type { LocalDate } from '@js-joda/core';
import { debounce } from 'lodash-es';

export const useCustomDateValidation = (
  formatMinDate?: LocalDate | null,
  formatMaxDate?: LocalDate | null,
  minYear?: number,
  maxYear?: number,
  pattern: CustomDatePattern = 'yyyy-MM-dd',
  onChange?: (date: string) => void,
) => {
  const [isValidInput, setIsValidInput] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const debounceRef = useRef<ReturnType<typeof debounce> | null>(null);

  const validateDate = useCallback(
    (date: LocalDate | null) => {
      const validator = createDateValidator(
        formatMinDate,
        formatMaxDate,
        minYear,
        maxYear,
      );
      return validator(date);
    },
    [formatMinDate, formatMaxDate, minYear, maxYear],
  );

  useEffect(() => {
    debounceRef.current = debounce((val: string) => {
      if (!val.trim()) {
        setIsValidInput(true);
        setErrorMessage('');
        onChange?.('');
        return;
      }

      const parsedDate = parseDate(val, pattern);
      if (!parsedDate) {
        setIsValidInput(false);
        setErrorMessage(`${pattern} 형식으로 입력해주세요.`);
        return;
      }

      const validation = validateDate(parsedDate);
      setIsValidInput(validation.isValid);
      setErrorMessage(validation.errorMessage);

      if (validation.isValid) {
        const formatted = formatDate(parsedDate, pattern);
        onChange?.(formatted);
      }
    }, 500);

    return () => {
      debounceRef.current?.cancel();
    };
  }, [validateDate, onChange, pattern]);

  const reset = useCallback(() => {
    setIsValidInput(true);
    setErrorMessage('');
  }, []);

  return {
    isValidInput,
    errorMessage,
    validateInput: (value: string) => debounceRef.current?.(value),
    reset,
  };
};
