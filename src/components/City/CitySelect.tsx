import { useEffect, useMemo, useState } from "react";
import { Select } from "../Select";
import { cityData } from "./CitySelect.Model";
import styles from "./CitySelect.module.css";
import type { CitySelectProps, cityValue } from "./CitySelect.type";

export function CitySelect({
	useGugun = true,
	value,
	onChange,
	...restProps
}: CitySelectProps) {
	const [internalSidoCode, setInternalSidoCode] = useState<string>(
		value?.sidoCode ?? "",
	);
	const [internalGugunCode, setInternalGugunCode] = useState<string>(
		value?.gugunCode ?? "",
	);

	useEffect(() => {
		if (value) {
			setInternalSidoCode(value.sidoCode);
			setInternalGugunCode(value.gugunCode);
		}
	}, [value]);

	const sidoOptions = useMemo(
		() =>
			cityData.sido.map((item) => ({
				value: item.cityCode,
				label: item.cityName,
			})),
		[],
	);

	const gugunOptions = useMemo(
		() =>
			cityData.gugun
				.filter((item) => item.cityCode === internalSidoCode)
				.map((item) => ({
					value: item.gugunCode,
					label: item.gugunKorName,
				})),
		[internalSidoCode],
	);

	const handleSidoChange = (sidoCode: string) => {
		setInternalSidoCode(sidoCode);
		setInternalGugunCode("");

		const selectedSido = cityData.sido.find((item) => item.cityCode === sidoCode);

		if (!useGugun && onChange) {
			const newValue: cityValue = {
				sido: selectedSido?.cityName ?? "",
				gugun: "",
				sidoCode: sidoCode,
				gugunCode: "",
				fullName: "",
			};
			onChange(newValue);
		}
	};

	const handleGugunChange = (gugunCode: string) => {
		setInternalGugunCode(gugunCode);

		const selectedSido = cityData.sido.find(
			(item) => item.cityCode === internalSidoCode,
		);
		const selectedGugun = cityData.gugun.find(
			(item) => item.gugunCode === gugunCode,
		);

		if (onChange) {
			const newValue: cityValue = {
				sido: selectedSido?.cityName ?? "",
				gugun: selectedGugun?.gugunKorName ?? "",
				sidoCode: internalSidoCode,
				gugunCode: gugunCode,
				fullName: selectedGugun?.fullName ?? "",
			};
			onChange(newValue);
		}
	};

	const { type: _, ...selectProps } = restProps as {
		type?: string;
		[key: string]: unknown;
	};

	return (
		<div className={styles.citySelect}>
			<Select
				{...selectProps}
				type="single"
				options={sidoOptions}
				value={internalSidoCode}
				onChange={handleSidoChange}
				placeholder="시/도 선택"
			/>
			{useGugun && (
				<Select
					{...selectProps}
					type="single"
					options={gugunOptions}
					value={internalGugunCode}
					onChange={handleGugunChange}
					placeholder="구/군 선택"
					disabled={!internalSidoCode}
				/>
			)}
		</div>
	);
}
