// hooks/useRangeDateValidation.ts
import type { LocalDate } from "@js-joda/core";
import { debounce } from "lodash-es";
import { useCallback, useEffect, useRef, useState } from "react";
import {
	createDateValidator,
	formatDate,
	parseDate,
	validateDateFormat,
} from "../utils/dateValidation";

export const useRangeValidation = (
	formatMinDate?: LocalDate | null,
	formatMaxDate?: LocalDate | null,
	minYear?: number,
	maxYear?: number,
	selectedRange?: [LocalDate | null, LocalDate | null],
	onChange?: (range: string[]) => void,
) => {
	const startDebounceRef = useRef<ReturnType<typeof debounce> | null>(null);
	const endDebounceRef = useRef<ReturnType<typeof debounce> | null>(null);

	const [isStartValidInput, setIsStartValidInput] = useState<boolean>(true);
	const [isEndValidInput, setIsEndValidInput] = useState<boolean>(true);
	const [startErrorMessage, setStartErrorMessage] = useState<string>("");
	const [endErrorMessage, setEndErrorMessage] = useState<string>("");

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

	const validateRangeDate = useCallback(
		(date: LocalDate, isStart: boolean) => {
			const baseValidation = validateDate(date);
			if (!baseValidation.isValid) return baseValidation;

			const [start, end] = selectedRange || [null, null];

			if (isStart && end && date.isAfter(end)) {
				return {
					isValid: false,
					errorMessage: "시작일은 종료일보다 이전이어야 합니다.",
				};
			}

			if (!isStart && start && date.isBefore(start)) {
				return {
					isValid: false,
					errorMessage: "종료일은 시작일보다 이후여야 합니다.",
				};
			}

			return { isValid: true, errorMessage: "" };
		},
		[validateDate, selectedRange],
	);

	useEffect(() => {
		startDebounceRef.current = debounce((val: string) => {
			if (!val.trim()) {
				setIsStartValidInput(true);
				setStartErrorMessage("");
				const [, end] = selectedRange || [null, null];
				onChange?.(["", end ? formatDate(end) : ""]);
				return;
			}

			if (!validateDateFormat(val)) {
				setIsStartValidInput(false);
				setStartErrorMessage("yyyy-MM-dd 형식으로 입력해주세요.");
				return;
			}

			const parsedDate = parseDate(val);
			if (!parsedDate) {
				setIsStartValidInput(false);
				setStartErrorMessage("유효한 날짜를 입력해주세요.");
				return;
			}

			const validation = validateRangeDate(parsedDate, true);
			setIsStartValidInput(validation.isValid);
			setStartErrorMessage(validation.errorMessage);

			if (validation.isValid) {
				const [, end] = selectedRange || [null, null];
				onChange?.([formatDate(parsedDate), end ? formatDate(end) : ""]);
			}
		}, 500);
	}, [validateRangeDate, selectedRange, onChange]);

	useEffect(() => {
		endDebounceRef.current = debounce((val: string) => {
			if (!val.trim()) {
				setIsEndValidInput(true);
				setEndErrorMessage("");
				const [start] = selectedRange || [null, null];
				onChange?.([start ? formatDate(start) : "", ""]);
				return;
			}

			if (!validateDateFormat(val)) {
				setIsEndValidInput(false);
				setEndErrorMessage("yyyy-MM-dd 형식으로 입력해주세요.");
				return;
			}

			const parsedDate = parseDate(val);
			if (!parsedDate) {
				setIsEndValidInput(false);
				setEndErrorMessage("유효한 날짜를 입력해주세요.");
				return;
			}

			const validation = validateRangeDate(parsedDate, false);
			setIsEndValidInput(validation.isValid);
			setEndErrorMessage(validation.errorMessage);

			if (validation.isValid) {
				const [start] = selectedRange || [null, null];
				onChange?.([start ? formatDate(start) : "", formatDate(parsedDate)]);
			}
		}, 500);
	}, [validateRangeDate, selectedRange, onChange]);

	const resetStart = useCallback(() => {
		setIsStartValidInput(true);
		setStartErrorMessage("");
	}, []);

	const resetEnd = useCallback(() => {
		setIsEndValidInput(true);
		setEndErrorMessage("");
	}, []);

	const resetAll = useCallback(() => {
		setIsStartValidInput(true);
		setIsEndValidInput(true);
		setStartErrorMessage("");
		setEndErrorMessage("");
	}, []);

	return {
		startDebounceRef,
		endDebounceRef,
		isStartValidInput,
		isEndValidInput,
		startErrorMessage,
		endErrorMessage,
		validateStartInput: (value: string) => startDebounceRef.current?.(value),
		validateEndInput: (value: string) => endDebounceRef.current?.(value),
		resetStart,
		resetEnd,
		resetAll,
	};
};
