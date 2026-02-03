export interface DateSelectArg {
	start: Date;
	end: Date;
	startStr: string;
	endStr: string;
	allDay: boolean;
	view: unknown;
}

export interface EventClickArg {
	el: HTMLElement;
	event: unknown;
	jsEvent: MouseEvent;
	view: unknown;
}

export interface ScheduleEvent {
	/** 이벤트의 고유 식별자 */
	id: string;

	/** 이벤트의 제목 (달력에 표시될 텍스트) */
	title: string;

	/** 이벤트 시작 시간 (ISO 문자열 또는 Date 객체) */
	start: string | Date;

	/** 이벤트 종료 시간 (선택사항, ISO 문자열 또는 Date 객체) */
	end?: string | Date;

	/** 하루 종일 이벤트 여부 (true: 하루 종일, false: 특정 시간) */
	allDay?: boolean;

	/** 이벤트 배경색 (CSS 색상 값: hex, rgb, rgba 등) */
	backgroundColor?: string;

	/** 이벤트 테두리색 (CSS 색상 값: hex, rgb, rgba 등) */
	borderColor?: string;

	/** 이벤트 텍스트 색상 (CSS 색상 값: hex, rgb, rgba 등) */
	textColor?: string;

	/**
	 * 이벤트의 모서리 둥글기 (CSS border-radius 값)
	 * 예: '8px', '50%', '4px 8px' 등
	 */
	borderRadius?: string;

	/**
	 * 이벤트 정렬 순서
	 * 숫자가 작을수록 위에 표시됨
	 * 같은 날짜의 이벤트들 간 표시 순서를 제어
	 */
	order?: number;

	/**
	 * 이벤트 카테고리
	 * 카테고리별로 정렬 순서를 다르게 할 수 있음
	 */
	category?: "meeting" | "deadline" | "personal" | "other";

	/** 추가 커스텀 데이터를 저장할 수 있는 객체 */
	extendedProps?: Record<string, any>;
}

/**
 * 반복 이벤트 설정을 정의하는 인터페이스
 * 특정 기간 동안 반복되는 이벤트를 생성하기 위한 설정
 */
export interface RecurringEventConfig {
	/** 반복 이벤트의 제목 */
	title: string;

	/** 반복 시작 날짜 (YYYY-MM-DD 형식) */
	startDate: string;

	/** 반복 종료 날짜 (YYYY-MM-DD 형식) */
	endDate: string;

	/**
	 * 반복할 요일들 (선택사항)
	 * 0=일요일, 1=월요일, 2=화요일, 3=수요일, 4=목요일, 5=금요일, 6=토요일
	 */
	daysOfWeek?: number[];

	/**
	 * 반복에서 제외할 특정 날짜들 (선택사항)
	 * YYYY-MM-DD 형식의 문자열 배열
	 */
	excludeDates?: string[];

	/** 반복 이벤트의 배경색 */
	backgroundColor?: string;

	/** 반복 이벤트의 테두리색 */
	borderColor?: string;

	/** 반복 이벤트의 텍스트 색상 */
	textColor?: string;

	/**
	 * 반복 이벤트의 모서리 둥글기
	 * 예: '8px', '12px', '50%' 등
	 */
	borderRadius?: string;

	/**
	 * 연속 이벤트 여부
	 * true: 하나의 긴 이벤트로 생성 (기간 표시)
	 * false: 매일 개별 이벤트로 생성 (기본값)
	 * @default false
	 */
	continuous?: boolean;

	/** 반복 이벤트에 추가할 커스텀 데이터 */
	extendedProps?: Record<string, any>;
}

/**
 * 이벤트 크기 조정(리사이즈) 정보를 담는 인터페이스
 * 사용자가 이벤트의 시작/종료 시간을 드래그로 변경할 때 발생
 */
export interface EventResizeInfo {
	/** 크기 조정된 후의 이벤트 객체 */
	event: any;

	/** 크기 조정되기 전의 원본 이벤트 객체 */
	oldEvent: any;

	/** 종료 시간의 변화량 (Duration 객체) */
	endDelta: any;

	/** 시작 시간의 변화량 (Duration 객체) */
	startDelta: any;

	/** 변경사항을 되돌리는 함수 */
	revert: () => void;
}

/**
 * 이벤트 드래그 앤 드롭 정보를 담는 인터페이스
 * 사용자가 이벤트를 다른 날짜/시간으로 이동할 때 발생
 */
export interface EventDropInfo {
	/** 이동된 후의 이벤트 객체 */
	event: any;

	/** 이동되기 전의 원본 이벤트 객체 */
	oldEvent: any;

	/** 시간의 변화량 (Duration 객체) */
	delta: any;

	/** 변경사항을 되돌리는 함수 */
	revert: () => void;
}

/**
 * 이벤트 변경 정보를 담는 인터페이스
 * 이벤트의 속성이 변경될 때 발생 (프로그래밍적 변경 포함)
 */
export interface EventChangeInfo {
	/** 변경된 후의 이벤트 객체 */
	event: any;

	/** 변경되기 전의 원본 이벤트 객체 */
	oldEvent: any;

	/** 변경사항을 되돌리는 함수 */
	revert: () => void;
}

/**
 * 이벤트 추가 정보를 담는 인터페이스
 * 새로운 이벤트가 달력에 추가될 때 발생
 */
export interface EventAddInfo {
	/** 추가된 이벤트 객체 */
	event: any;

	/** 추가를 되돌리는 함수 (이벤트 삭제) */
	revert: () => void;
}

/**
 * 이벤트 제거 정보를 담는 인터페이스
 * 이벤트가 달력에서 제거될 때 발생
 */
export interface EventRemoveInfo {
	/** 제거된 이벤트 객체 */
	event: any;
}

/**
 * ScheduleCalendar 컴포넌트의 Props 인터페이스
 * 달력의 모든 설정과 이벤트 핸들러를 정의
 */
export interface ScheduleCalendarProps {
	/**
	 * 표시할 이벤트들의 배열
	 * 각 이벤트는 ScheduleEvent 타입을 따라야 함
	 */
	events?: ScheduleEvent[];

	/**
	 * 이벤트의 모서리 둥글기 (CSS border-radius 값)
	 * 예: '8px', '50%', '4px 8px' 등
	 */
	borderRadius?: string;

	/**
	 * 공휴일 표시 여부
	 * @default false
	 */
	showHolidays?: boolean;

	/**
	 * 공휴일 날짜 색상
	 * @default '#dc3545' (빨간색)
	 */
	holidayColor?: string;

	/**
	 * 커스텀 공휴일 데이터
	 * Record<string, string> 형태로 '날짜': '공휴일명' 매핑
	 * 전달하지 않으면 기본 한국 공휴일 사용
	 */
	customHolidays?: Record<string, string>;

	/**
	 * 날짜 표시에 '일' 단위 표시 여부
	 * false: 숫자만 표시 (9, 10, 11...) - 기본값
	 * true: '일' 단위 포함 표시 (9일, 10일, 11일...)
	 * @default false
	 */
	showDayUnit?: boolean;

	/**
	 * 반복 이벤트 설정 배열
	 * 특정 패턴으로 반복되는 이벤트들을 자동 생성
	 */
	recurringEvents?: RecurringEventConfig[];

	/**
	 * 초기 달력 보기 모드
	 * - 'dayGridMonth': 월 단위 그리드 보기 (기본값)
	 * - 'timeGridWeek': 주 단위 시간표 보기
	 * - 'timeGridDay': 일 단위 시간표 보기
	 * - 'listWeek': 주 단위 목록 보기
	 */
	initialView?: "dayGridMonth" | "timeGridWeek" | "timeGridDay" | "listWeek";

	/**
	 * 초기 표시 날짜
	 * 지정하지 않으면 오늘 날짜로 설정됨
	 */
	initialDate?: string | Date;

	/**
	 * 달력의 높이
	 * - 'auto': 내용에 맞게 자동 조정
	 * - 숫자: 픽셀 단위 고정 높이
	 * - 문자열: CSS 높이 값 (예: '100%', '500px')
	 */
	height?: string | number;

	/**
	 * 헤더 표시 여부
	 * false: 헤더 완전 제거 (외부 커스텀 컨트롤 사용)
	 * true: 기본 헤더 표시
	 * @default false
	 */
	showHeader?: boolean;

	/**
	 * 헤더 툴바 설정
	 * 달력 상단의 네비게이션 버튼들과 제목 배치를 설정
	 */
	headerToolbar?: {
		/** 왼쪽 영역에 표시할 요소들 (예: 'prev,next today') */
		left?: string;
		/** 가운데 영역에 표시할 요소들 (예: 'title') */
		center?: string;
		/** 오른쪽 영역에 표시할 요소들 (예: 'dayGridMonth,timeGridWeek') */
		right?: string;
	};

	/**
	 * 이벤트 편집 가능 여부
	 * true: 드래그 앤 드롭, 리사이즈 가능
	 * false: 읽기 전용
	 */
	editable?: boolean;

	/**
	 * 날짜/시간 선택 가능 여부
	 * true: 클릭/드래그로 날짜 범위 선택 가능
	 * false: 선택 불가
	 */
	selectable?: boolean;

	/**
	 * 선택 중 미리보기 표시 여부
	 * true: 드래그 중 선택 영역 미리보기 표시
	 * false: 미리보기 없음
	 */
	selectMirror?: boolean;

	autoColor?: boolean;

	/**
	 * 달력의 날짜가 변경될 때 호출되는 함수
	 * 외부에서 현재 날짜 상태를 추적하기 위해 사용
	 * @param info 현재 달력의 날짜 및 뷰 정보
	 */
	onDateChange?: (info: DateNavigationInfo) => void;

	/**
	 * 외부에서 달력의 날짜를 변경하고 싶을 때 사용
	 * 이 값이 변경되면 달력이 해당 날짜로 이동
	 */
	goToDate?: Date | string;

	/**
	 * 하루에 표시할 최대 이벤트 수
	 * - true: 자동으로 +more 링크 생성
	 * - 숫자: 지정된 개수까지만 표시
	 * - false: 모든 이벤트 표시
	 */
	dayMaxEvents?: boolean | number;

	/**
	 * 주말 표시 여부
	 * true: 토요일, 일요일 표시
	 * false: 평일만 표시
	 */
	weekends?: boolean;

	// Event handlers (이벤트 핸들러들)

	/**
	 * 이벤트 클릭 시 호출되는 함수
	 * @param info 클릭된 이벤트의 정보
	 */
	onEventClick?: (info: EventClickArg) => void;

	/**
	 * 이벤트 크기 조정 시 호출되는 함수
	 * 이벤트의 시작/종료 시간을 드래그로 변경할 때 발생
	 * @param info 리사이즈 정보 (변경 전후 이벤트, 변화량, revert 함수)
	 */
	onEventResize?: (info: EventResizeInfo) => void;

	/**
	 * 이벤트 드래그 앤 드롭 시 호출되는 함수
	 * 이벤트를 다른 날짜/시간으로 이동할 때 발생
	 * @param info 드롭 정보 (변경 전후 이벤트, 변화량, revert 함수)
	 */
	onEventDrop?: (info: EventDropInfo) => void;

	/**
	 * 날짜 선택 시 호출되는 함수
	 * 사용자가 달력에서 날짜 범위를 선택할 때 발생
	 * @param selectInfo 선택된 날짜 범위 정보
	 */
	onDateSelect?: (selectInfo: DateSelectArg) => void;

	/**
	 * 새 이벤트 추가 시 호출되는 함수
	 * 프로그래밍적으로 또는 사용자 액션으로 이벤트가 추가될 때 발생
	 * @param addInfo 추가된 이벤트 정보
	 */
	onEventAdd?: (addInfo: EventAddInfo) => void;

	/**
	 * 이벤트 변경 시 호출되는 함수
	 * 이벤트의 속성이 변경될 때 발생 (시간, 제목, 색상 등)
	 * @param changeInfo 변경된 이벤트 정보
	 */
	onEventChange?: (changeInfo: EventChangeInfo) => void;

	/**
	 * 이벤트 제거 시 호출되는 함수
	 * 이벤트가 달력에서 삭제될 때 발생
	 * @param removeInfo 제거된 이벤트 정보
	 */
	onEventRemove?: (removeInfo: EventRemoveInfo) => void;
}

/**
 * 외부 날짜 네비게이션 정보를 담는 인터페이스
 */
export interface DateNavigationInfo {
	/** 현재 표시되고 있는 날짜 */
	currentDate: Date;
	/** 현재 뷰 타입 */
	currentView: string;
	/** 이전 달로 이동 가능 여부 */
	canGoPrev: boolean;
	/** 다음 달로 이동 가능 여부 */
	canGoNext: boolean;
}
