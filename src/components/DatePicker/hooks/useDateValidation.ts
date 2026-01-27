// hooks/useDateValidation.ts
import type { LocalDate } from '@js-joda/core';
import { debounce } from 'lodash-es';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  createDateValidator,
  formatDate,
  parseDate,
  validateDateFormat,
} from '../utils/dateValidation';

export const useDateValidation = (
  formatMinDate?: LocalDate | null,
  formatMaxDate?: LocalDate | null,
  minYear?: number,
  maxYear?: number,
  onChange?: (date: string) => void,
) => {
  const [isValidInput, setIsValidInput] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const debounceRef = useRef<ReturnType<typeof debounce> | null>(null);

  const validateDate = useCallback(
    (date: LocalDate | null) => {
      const validator = createDateValidator(formatMinDate, formatMaxDate, minYear, maxYear);
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

      if (!validateDateFormat(val)) {
        setIsValidInput(false);
        setErrorMessage('yyyy-MM-dd 형식으로 입력해주세요.');
        return;
      }

      const parsedDate = parseDate(val);
      if (!parsedDate) {
        setIsValidInput(false);
        setErrorMessage('유효한 날짜를 입력해주세요.');
        return;
      }

      const validation = validateDate(parsedDate);
      setIsValidInput(validation.isValid);
      setErrorMessage(validation.errorMessage);

      if (validation.isValid) {
        onChange?.(formatDate(parsedDate));
      }
    }, 500);

    return () => {
      debounceRef.current?.cancel();
    };
  }, [validateDate, onChange]);

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
