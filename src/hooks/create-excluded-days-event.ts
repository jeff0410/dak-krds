import type { ScheduleEvent } from "src/components/ScheduleCalendar/ScheduleCalendar.type";

/**
 * 특정 요일과 날짜를 제외한 연속 이벤트 생성 함수
 *
 * 이 함수는 지정된 기간 동안의 연속 이벤트를 생성하되,
 * 특정 요일이나 날짜를 제외하여 여러 개의 분할된 이벤트로 만듭니다.
 *
 * @example
 * // 월요일만 제외
 * createExcludedDaysEvent('event1', '업무', '2025-08-01', '2025-08-31', {
 *   excludeDaysOfWeek: [1], // 월요일 제외
 *   backgroundColor: '#007bff'
 * });
 *
 * // 주말과 특정 공휴일 제외
 * createExcludedDaysEvent('event2', '근무일', '2025-08-01', '2025-08-31', {
 *   excludeDaysOfWeek: [0, 6], // 일요일, 토요일 제외
 *   excludeDates: ['2025-08-15'], // 광복절 제외
 *   backgroundColor: '#28a745'
 * });
 */
export const createExcludedDaysEvent = (
	/**
	 * 이벤트의 고유 식별자
	 * 생성되는 각 분할 이벤트는 "{id}-0", "{id}-1" 형태로 ID가 생성됩니다.
	 *
	 * @example 'summer-event' → 'summer-event-0', 'summer-event-1', ...
	 */
	id: string,

	/**
	 * 이벤트의 제목 (달력에 표시될 텍스트)
	 * 모든 분할된 이벤트에 동일하게 적용됩니다.
	 *
	 * @example '여름 휴가 기간', '프로젝트 진행 기간'
	 */
	title: string,

	/**
	 * 이벤트 시작 날짜
	 * ISO 8601 형식의 날짜 문자열 (YYYY-MM-DD)
	 *
	 * @example '2025-08-01', '2025-12-25'
	 */
	startDate: string,

	/**
	 * 이벤트 종료 날짜 (포함)
	 * ISO 8601 형식의 날짜 문자열 (YYYY-MM-DD)
	 * 이 날짜까지 포함하여 이벤트가 생성됩니다.
	 *
	 * @example '2025-08-31' → 8월 31일까지 포함
	 */
	endDate: string,

	/**
	 * 이벤트 생성 옵션 객체
	 */
	options: {
		/**
		 * 이벤트 배경색
		 * CSS 색상 값 (hex, rgb, rgba, 색상명 등)
		 *
		 * @example '#007bff', 'rgb(255, 0, 0)', 'blue'
		 */
		backgroundColor?: string;

		/**
		 * 이벤트 테두리색
		 * CSS 색상 값 (hex, rgb, rgba, 색상명 등)
		 * 설정하지 않으면 backgroundColor와 동일하게 적용됩니다.
		 *
		 * @example '#0056b3', 'rgba(0, 0, 0, 0.3)'
		 */
		borderColor?: string;

		/**
		 * 이벤트 텍스트 색상
		 * CSS 색상 값 (hex, rgb, rgba, 색상명 등)
		 * 배경색과 대비되는 색상을 선택하여 가독성을 높이세요.
		 *
		 * @example '#ffffff' (흰색), '#000000' (검은색)
		 */
		textColor?: string;

		/**
		 * 이벤트의 모서리 둥글기
		 * CSS border-radius 값
		 *
		 * @example
		 * '8px' - 기본 둥근 모서리
		 * '50%' - 완전한 원형 (pill 형태)
		 * '0px' - 각진 모서리
		 * '4px 8px' - 비대칭 둥글기
		 */
		borderRadius?: string;

		/**
		 * 제외할 요일들의 배열
		 * 숫자로 요일을 지정합니다.
		 * 0 = 일요일, 1 = 월요일, 2 = 화요일, 3 = 수요일,
		 * 4 = 목요일, 5 = 금요일, 6 = 토요일
		 *
		 * @example
		 * [1] - 월요일만 제외
		 * [0, 6] - 주말(일요일, 토요일) 제외
		 * [1, 3, 5] - 월요일, 수요일, 금요일 제외
		 * [] - 요일 제외 없음
		 */
		excludeDaysOfWeek?: number[];

		/**
		 * 제외할 특정 날짜들의 배열
		 * ISO 8601 형식의 날짜 문자열 배열 (YYYY-MM-DD)
		 * 공휴일, 휴가일, 특별한 날 등을 제외할 때 사용합니다.
		 *
		 * @example
		 * ['2025-08-15'] - 광복절만 제외
		 * ['2025-12-25', '2025-01-01'] - 크리스마스, 신정 제외
		 * ['2025-08-10', '2025-08-20', '2025-08-30'] - 여러 특정 날짜 제외
		 * [] - 특정 날짜 제외 없음
		 */
		excludeDates?: string[];
	} = {},
) => {
	const events: ScheduleEvent[] = [];
	const start = new Date(startDate);
	const end = new Date(endDate);

	const excludeDaysSet = new Set(options.excludeDaysOfWeek || []);
	const excludeDatesSet = new Set(options.excludeDates || []);

	let segmentStart: Date | null = null;
	let segmentId = 0;
	const current = new Date(start);

	while (current <= end) {
		const currentDateString = current.toISOString().split("T")[0];
		const currentDayOfWeek = current.getDay();

		// 제외해야 할 날짜인지 확인
		const shouldExclude =
			excludeDaysSet.has(currentDayOfWeek) ||
			excludeDatesSet.has(currentDateString);

		if (!shouldExclude) {
			// 포함되는 날짜
			if (!segmentStart) {
				segmentStart = new Date(current);
			}
		} else {
			// 제외되는 날짜
			if (segmentStart) {
				const segmentEnd = new Date(current);
				events.push({
					id: `${id}-${segmentId++}`,
					title,
					start: segmentStart.toISOString().split("T")[0],
					end: segmentEnd.toISOString().split("T")[0],
					allDay: true,
					backgroundColor: options.backgroundColor,
					borderColor: options.borderColor,
					textColor: options.textColor,
					borderRadius: options.borderRadius,
				});
				segmentStart = null;
			}
		}

		current.setDate(current.getDate() + 1);
	}

	// 마지막 세그먼트 처리
	if (segmentStart) {
		const segmentEnd = new Date(end);
		segmentEnd.setDate(segmentEnd.getDate() + 1);
		events.push({
			id: `${id}-${segmentId++}`,
			title,
			start: segmentStart.toISOString().split("T")[0],
			end: segmentEnd.toISOString().split("T")[0],
			allDay: true,
			backgroundColor: options.backgroundColor,
			borderColor: options.borderColor,
			textColor: options.textColor,
			borderRadius: options.borderRadius,
		});
	}

	return events;
};
