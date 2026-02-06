export function splitPhoneNumber(value: string | null | undefined) {
	if (!value) return ["", "", ""];
	const digitsOnly = value.replace(/\D/g, "");
	if (digitsOnly.length === 9) {
		// 02-354-8645 (지역번호 2자리)
		return [
			digitsOnly.slice(0, 2),
			digitsOnly.slice(2, 5),
			digitsOnly.slice(5, 9),
		];
	}
	if (digitsOnly.length === 10) {
		// 02-3456-7891 || 031-234-5678 (지역번호 2~3자리)

		if (digitsOnly.startsWith("02")) {
			return [
				digitsOnly.slice(0, 2),
				digitsOnly.slice(2, 6),
				digitsOnly.slice(6, 10),
			];
		}
		return [
			digitsOnly.slice(0, 3),
			digitsOnly.slice(3, 6),
			digitsOnly.slice(6, 10),
		];
	}
	if (digitsOnly.length === 11) {
		//010-1234-5678
		return [
			digitsOnly.slice(0, 3),
			digitsOnly.slice(3, 7),
			digitsOnly.slice(7, 11),
		];
	}
	return [
		digitsOnly.slice(0, 3),
		digitsOnly.slice(3, 7),
		digitsOnly.slice(7, 11),
	];
}
