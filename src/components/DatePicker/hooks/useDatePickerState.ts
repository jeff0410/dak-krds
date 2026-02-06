import { DateTimeFormatter, LocalDate } from "@js-joda/core";
import { useCallback, useEffect, useState } from "react";
import { useDateValidation } from "./useDateValidation";

/**
 * @Datepicker 상태를 관리하는 커스텀 훅 😸
 *  날짜를 선택하고, 입력값을 관리하며, 날짜 형식 변환을 처리
 */
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

export const useDatePickerState = (
	initialValue?: LocalDate | string | null,
	minDate?: LocalDate | string | null,
	maxDate?: LocalDate | string | null,
	minYear?: number,
	maxYear?: number,
	onChange?: (date: string) => void,
) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedDate, setSelectedDate] = useState<LocalDate | null>(() => {
		if (typeof initialValue === "string") {
			if (!initialValue.trim()) {
				return null;
			}
			try {
				return LocalDate.parse(initialValue);
			} catch {
				return null;
			}
		}
		return initialValue ?? null;
	});
	const [inputValue, setInputValue] = useState(
		selectedDate
			? selectedDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"))
			: "",
	);

	useEffect(() => {
		if (typeof initialValue === "string") {
			if (!initialValue.trim()) {
				setSelectedDate(null);
				setInputValue("");
			}
			try {
				setSelectedDate(LocalDate.parse(initialValue));
				setInputValue(initialValue);
			} catch {
				setSelectedDate(null);
				setInputValue("");
			}
		}
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
		(validDate: string) => {
			const parsedDate = parsingDate(validDate);
			setSelectedDate(parsedDate);
			onChange?.(validDate);
		},
		[onChange],
	);

	const { isValidInput, errorMessage, validateInput, reset } =
		useDateValidation(
			formatMinDate,
			formatMaxDate,
			minYear,
			maxYear,
			handleValidate,
		);

	const handleDateClick = (date: LocalDate) => {
		const formattedDate = date.format(
			DateTimeFormatter.ofPattern("yyyy-MM-dd"),
		);
		setInputValue(formattedDate);
		setSelectedDate(date);
		onChange?.(formattedDate);
		reset();
	};

	const handleInputChange = (value: string) => {
		setInputValue(value);
		validateInput(value);
	};

	const handleConfirm = (onConfirm: (date: string) => void) => {
		if (selectedDate) {
			const formattedDate = selectedDate.format(
				DateTimeFormatter.ofPattern("yyyy-MM-dd"),
			);
			onConfirm(formattedDate);
			reset();
		} else {
			try {
				const parsedDate = parsingDate(inputValue);
				if (parsedDate) {
					setSelectedDate(parsedDate);
					onConfirm(
						parsedDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")),
					);
					reset();
				}
			} catch {
				// 날짜 오류 시 아무 작업 x
			}
		}
		setIsOpen(false);
	};

	const handleCancel = () => {
		setInputValue("");
		setSelectedDate(null);
		setIsOpen(false);
		onChange?.("");
		reset();
	};

	const getCurrentSelectedDate = () => {
		try {
			return parsingDate(inputValue);
		} catch {
			return selectedDate;
		}
	};

	return {
		selectedDate,
		formatMinDate,
		formatMaxDate,
		inputValue,
		currentSelectedDate: getCurrentSelectedDate(),
		isOpen,
		setIsOpen,
		handleDateClick,
		handleConfirm,
		handleCancel,
		handleInputChange,
		isValidInput,
		errorMessage,
	};
};
