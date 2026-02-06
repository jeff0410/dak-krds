/**
 * 대한민국 공휴일 데이터
 * 매년 업데이트가 필요합니다.
 */
export const koreanHolidays2025: Record<string, string> = {
	"2025-01-01": "신정",
	"2025-01-28": "설날 연휴",
	"2025-01-29": "설날",
	"2025-01-30": "설날 연휴",
	"2025-03-01": "삼일절",
	"2025-05-05": "어린이날",
	"2025-05-06": "어린이날 대체공휴일",
	"2025-06-06": "현충일",
	"2025-08-15": "광복절",
	"2025-09-06": "추석 연휴",
	"2025-09-07": "추석 연휴",
	"2025-09-08": "추석",
	"2025-09-09": "추석 연휴",
	"2025-10-03": "개천절",
	"2025-10-09": "한글날",
	"2025-12-25": "크리스마스",
};

// 여러 년도 지원
export const koreanHolidays: Record<number, Record<string, string>> = {
	2025: koreanHolidays2025,
	// 2026년, 2027년 등 추가 가능
};

/**
 * 특정 날짜가 공휴일인지 확인
 */
export const isKoreanHoliday = (date: string | Date): boolean => {
	const dateString =
		typeof date === "string" ? date : date.toISOString().split("T")[0];
	const year = new Date(dateString).getFullYear();
	return !!koreanHolidays[year]?.[dateString];
};

/**
 * 공휴일 이름 가져오기
 */
export const getHolidayName = (date: string | Date): string | null => {
	const dateString =
		typeof date === "string" ? date : date.toISOString().split("T")[0];
	const year = new Date(dateString).getFullYear();
	return koreanHolidays[year]?.[dateString] || null;
};
