import { DateTimeFormatter, LocalDate } from "@js-joda/core";
import { useCallback, useEffect, useState } from "react";
import { useRangeValidation } from "./useRangeValidation";

/**
 * @Datepicker 기간 설정 커스텀 훅 😸
 *  기간을 선택하고, 입력값을 관리하며, 날짜 형식 변환을 처리
 */
const convertType = (
	value?: LocalDate[] | string[] | null,
): [LocalDate | null, LocalDate | null] => {
	if (!value || value.length === 0) return [null, null];

	if (typeof value[0] === "string") {
		const stringArray = value as string[];
		try {
			const start = stringArray[0] ? LocalDate.parse(stringArray[0]) : null;
			const end = stringArray[1] ? LocalDate.parse(stringArray[1]) : null;
			return [start, end];
		} catch {
			return [null, null];
		}
	} else {
		const dateArray = value as LocalDate[];
		return [dateArray[0] || null, dateArray[1] || null];
	}
};

const parsingDate = (val: string | null | undefined): LocalDate | null => {
	if (!val || !val.trim()) {
		return null;
	}
	try {
		return LocalDate.parse(val);
	} catch {
		return null;
	}
};

export const useRangeDatePickerState = (
	initialValue?: LocalDate[] | string[] | null,
	minDate?: LocalDate | string | null,
	maxDate?: LocalDate | string | null,
	minYear?: number,
	maxYear?: number,
	onChange?: (range: string[]) => void,
) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedRange, setSelectedRange] = useState<
		[LocalDate | null, LocalDate | null]
	>(convertType(initialValue));
	const [currentStep, setCurrentStep] = useState<"start" | "end">("start");

	const [startInputValue, setStartInputValue] = useState(
		selectedRange[0]
			? selectedRange[0].format(DateTimeFormatter.ofPattern("yyyy-MM-dd"))
			: "",
	);
	const [endInputValue, setEndInputValue] = useState(
		selectedRange[1]
			? selectedRange[1].format(DateTimeFormatter.ofPattern("yyyy-MM-dd"))
			: "",
	);

	useEffect(() => {
		const range = convertType(initialValue);
		setSelectedRange(range);
		setStartInputValue(
			range[0]
				? range[0].format(DateTimeFormatter.ofPattern("yyyy-MM-dd"))
				: "",
		);
		setEndInputValue(
			range[1]
				? range[1].format(DateTimeFormatter.ofPattern("yyyy-MM-dd"))
				: "",
		);
	}, [initialValue]);

	const formatMinDate = minDate
		? typeof minDate === "string"
			? parsingDate(minDate)
			: minDate
		: null;
	const formatMaxDate = maxDate
		? typeof maxDate === "string"
			? parsingDate(maxDate)
			: maxDate
		: null;

	const handleValidate = useCallback(
		(validRange: string[]) => {
			const [startStr, endStr] = validRange;
			const newStart = startStr ? parsingDate(startStr) : null;
			const newEnd = endStr ? parsingDate(endStr) : null;

			setSelectedRange([newStart, newEnd]);
			onChange?.(validRange);
		},
		[onChange],
	);

	const {
		isStartValidInput,
		isEndValidInput,
		startErrorMessage,
		endErrorMessage,
		validateStartInput,
		validateEndInput,
		resetStart,
		resetEnd,
		resetAll,
	} = useRangeValidation(
		formatMinDate,
		formatMaxDate,
		minYear,
		maxYear,
		selectedRange,
		handleValidate,
	);

	const handleStartInputChange = (value: string) => {
		setStartInputValue(value);
		validateStartInput(value);
	};

	const handleEndInputChange = (value: string) => {
		setEndInputValue(value);
		validateEndInput(value);
	};

	const handleDateClick = (date: LocalDate) => {
		const [start, end] = selectedRange;

		if (start && end) {
			const formattedDate = date.format(
				DateTimeFormatter.ofPattern("yyyy-MM-dd"),
			);
			setSelectedRange([date, null]);
			setStartInputValue(formattedDate);
			setEndInputValue("");
			setCurrentStep("end");
			onChange?.([formattedDate, ""]);
			resetAll();
			return;
		}

		if (currentStep === "start") {
			// 시작일 단계
			const formattedDate = date.format(
				DateTimeFormatter.ofPattern("yyyy-MM-dd"),
			);
			setSelectedRange([date, null]);
			setStartInputValue(formattedDate);
			setEndInputValue("");
			setCurrentStep("end");
			onChange?.([formattedDate, ""]);
			resetStart();
		} else {
			const [startDate] = selectedRange;
			if (startDate) {
				if (date.isBefore(startDate)) {
					const formattedDate = date.format(
						DateTimeFormatter.ofPattern("yyyy-MM-dd"),
					);
					setSelectedRange([date, null]);
					setStartInputValue(formattedDate);
					setEndInputValue("");
					setCurrentStep("end");
					onChange?.([formattedDate, ""]);
					resetAll();
				} else {
					const startFormatted = startDate.format(
						DateTimeFormatter.ofPattern("yyyy-MM-dd"),
					);
					const endFormatted = date.format(
						DateTimeFormatter.ofPattern("yyyy-MM-dd"),
					);
					setSelectedRange([startDate, date]);
					setEndInputValue(endFormatted);
					onChange?.([startFormatted, endFormatted]);
					resetEnd();
				}
			}
		}
	};

	const handleConfirm = (onConfirm: (range: string[]) => void) => {
		const [start, end] = selectedRange;
		if (start && end) {
			const rangeStrings = [
				start.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")),
				end.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")),
			];
			onConfirm(rangeStrings);
			setIsOpen(false);
			setCurrentStep("start");
			resetAll();
		}
	};

	const handleCancel = () => {
		setSelectedRange([null, null]);
		setStartInputValue("");
		setEndInputValue("");
		setIsOpen(false);
		setCurrentStep("start");
		onChange?.(["", ""]);
		resetAll();
	};

	return {
		selectedRange,
		startInputValue,
		endInputValue,
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
		isStartValidInput,
		isEndValidInput,
		startErrorMessage,
		endErrorMessage,
	};
};
