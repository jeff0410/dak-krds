import { useEffect, useMemo, useRef } from 'react';
import * as styles from './ScheduleCalendar.module.css';
import {
  DateNavigationInfo,
  RecurringEventConfig,
  ScheduleCalendarProps,
  ScheduleEvent,
} from './ScheduleCalendar.type';
import { getHolidayName } from './holidays';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';

// 색상 팔레트 (borderRadius와 textColor 포함)
const COLOR_PALETTE = [
  { background: '#007bff', border: '#0056b3', text: '#ffffff', radius: '6px' },
  { background: '#28a745', border: '#1e7e34', text: '#ffffff', radius: '6px' },
  { background: '#dc3545', border: '#c82333', text: '#ffffff', radius: '6px' },
  { background: '#ffc107', border: '#e0a800', text: '#000000', radius: '6px' },
  { background: '#6f42c1', border: '#5a2d91', text: '#ffffff', radius: '6px' },
  { background: '#fd7e14', border: '#e55a00', text: '#ffffff', radius: '6px' },
  { background: '#20c997', border: '#17a2b8', text: '#ffffff', radius: '6px' },
  { background: '#e83e8c', border: '#d91a72', text: '#ffffff', radius: '6px' },
  { background: '#6c757d', border: '#545b62', text: '#ffffff', radius: '6px' },
  { background: '#17a2b8', border: '#138496', text: '#ffffff', radius: '6px' },
];

/**
 * 문자열을 해시값으로 변환하는 함수
 * 이벤트 제목을 기반으로 일관된 색상을 할당하기 위해 사용
 */
function stringToHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

/**
 * 이벤트에 자동으로 색상을 할당하는 함수
 * 이미 색상이 지정된 이벤트는 그대로 유지
 */
function assignAutoColors(events: ScheduleEvent[]): ScheduleEvent[] {
  return events.map((event) => {
    // 이미 색상이 지정되어 있으면 그대로 사용
    if (event.backgroundColor || event.borderColor || event.textColor) {
      return event;
    }

    // 제목을 기반으로 색상 인덱스 계산
    const colorIndex = stringToHash(event.title) % COLOR_PALETTE.length;
    const colors = COLOR_PALETTE[colorIndex];

    return {
      ...event,
      backgroundColor: colors.background,
      borderColor: colors.border,
      textColor: colors.text,
      borderRadius: event.borderRadius || colors.radius,
    };
  });
}

/**
 * 반복 이벤트를 개별 이벤트로 변환하는 함수
 */
function generateRecurringEvents(config: RecurringEventConfig): ScheduleEvent[] {
  const events: ScheduleEvent[] = [];
  const startDate = new Date(config.startDate);
  const endDate = new Date(config.endDate);

  // 연속 이벤트인 경우
  if (config.continuous) {
    events.push({
      id: `continuous-${config.title}`,
      title: config.title,
      start: config.startDate,
      end: new Date(endDate.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      allDay: true,
      backgroundColor: config.backgroundColor,
      borderColor: config.borderColor,
      textColor: config.textColor,
      borderRadius: config.borderRadius,
      extendedProps: config.extendedProps,
    });
    return events;
  }

  // 개별 이벤트 생성
  const excludeDates = new Set(config.excludeDates || []);
  const currentDate = new Date(startDate);
  let eventId = 0;

  while (currentDate <= endDate) {
    const dateString = currentDate.toISOString().split('T')[0];
    const dayOfWeek = currentDate.getDay();

    // 제외 날짜 확인
    if (excludeDates.has(dateString)) {
      currentDate.setDate(currentDate.getDate() + 1);
      continue;
    }

    // 특정 요일만 포함하는 경우 확인
    if (config.daysOfWeek && !config.daysOfWeek.includes(dayOfWeek)) {
      currentDate.setDate(currentDate.getDate() + 1);
      continue;
    }

    events.push({
      id: `recurring-${config.title}-${eventId++}`,
      title: config.title,
      start: dateString,
      allDay: true,
      backgroundColor: config.backgroundColor,
      borderColor: config.borderColor,
      textColor: config.textColor,
      borderRadius: config.borderRadius,
      extendedProps: config.extendedProps,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return events;
}

/**
 * 스케줄 달력 컴포넌트
 * FullCalendar를 기반으로 한 커스터마이징된 달력 컴포넌트
 */
export const ScheduleCalendar = ({
  events = [],
  recurringEvents = [],
  initialView = 'dayGridMonth',
  initialDate,
  height = 'auto',
  showHeader = false,
  showDayUnit = false,
  editable = false,
  selectable = false,
  selectMirror = true,
  dayMaxEvents = true,
  weekends = true,
  autoColor = true,
  showHolidays = false,
  holidayColor = '#dc3545',
  customHolidays,
  onDateChange,
  goToDate,
  onEventClick,
  onEventResize,
  onEventDrop,
  onDateSelect,
  onEventAdd,
  onEventChange,
  onEventRemove,
}: ScheduleCalendarProps) => {
  const calendarRef = useRef<FullCalendar>(null);

  // 공휴일 데이터 가져오기
  const getHolidayData = (date: string | Date): string | null => {
    const dateString = typeof date === 'string' ? date : date.toISOString().split('T')[0];

    if (customHolidays) {
      return customHolidays[dateString] || null;
    }

    return getHolidayName(dateString);
  };

  // 반복 이벤트를 개별 이벤트로 변환하고 자동 색상 적용
  const processedEvents = useMemo(() => {
    const allEvents: ScheduleEvent[] = [...events];

    // 반복 이벤트 생성
    recurringEvents.forEach((config) => {
      const generatedEvents = generateRecurringEvents(config);
      allEvents.push(...generatedEvents);
    });

    // 자동 색상 적용
    return autoColor ? assignAutoColors(allEvents) : allEvents;
  }, [events, recurringEvents, autoColor]);

  // 외부에서 날짜 변경 요청시 달력 이동
  useEffect(() => {
    if (goToDate && calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(goToDate);
    }
  }, [goToDate]);

  // 요일 헤더 커스터마이징 (한국어)
  const dayHeaderContent = (arg: any) => {
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    return dayNames[arg.date.getDay()];
  };

  // 날짜 숫자 표시 커스터마이징 (공휴일 색상 포함)
  const dayCellContent = (arg: any) => {
    const dayNumber = arg.date.getDate();
    const dateString = arg.date.toISOString().split('T')[0];
    const holidayName = showHolidays ? getHolidayData(dateString) : null;

    if (holidayName) {
      // 공휴일인 경우 색상 적용
      return {
        html: `<div class="fc-daygrid-day-number holiday-date" style="color: ${holidayColor};" title="${holidayName}">
          ${showDayUnit ? `${dayNumber}일` : dayNumber}
        </div>`,
      };
    }

    return showDayUnit ? `${dayNumber}일` : dayNumber.toString();
  };

  // 날짜 셀에 CSS 클래스 추가 (공휴일 스타일링용)
  const dayCellClassNames = (arg: any) => {
    const dateString = arg.date.toISOString().split('T')[0];
    const holidayName = showHolidays ? getHolidayData(dateString) : null;

    if (holidayName) {
      return ['korean-holiday'];
    }
    return [];
  };

  // 이벤트 렌더링 커스터마이징 (borderRadius 적용)
  const eventContent = (arg: any) => {
    const event = arg.event;
    const borderRadius = event.extendedProps?.borderRadius;

    if (borderRadius) {
      // 이벤트 요소에 직접 스타일 적용
      setTimeout(() => {
        const eventEl = arg.el;
        if (eventEl) {
          eventEl.style.borderRadius = borderRadius;
        }
      }, 0);
    }

    return { html: `<div class="fc-event-title">${event.title}</div>` };
  };

  // 달력의 날짜가 변경될 때 외부에 알림
  const handleDatesSet = (dateInfo: any) => {
    if (onDateChange) {
      const navigationInfo: DateNavigationInfo = {
        currentDate: dateInfo.start,
        currentView: dateInfo.view.type,
        canGoPrev: true,
        canGoNext: true,
      };
      onDateChange(navigationInfo);
    }
  };

  return (
    <div className={styles.scheduleCalendarContainer}>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView={initialView}
        initialDate={initialDate}
        height={height}
        // 헤더 설정
        headerToolbar={
          showHeader
            ? {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth',
              }
            : false
        }
        // 이벤트 데이터 (borderRadius를 extendedProps에 추가)
        events={processedEvents.map((event) => ({
          ...event,
          extendedProps: {
            ...event.extendedProps,
            borderRadius: event.borderRadius,
          },
        }))}
        // 기본 설정
        editable={editable}
        selectable={selectable}
        selectMirror={selectMirror}
        dayMaxEvents={dayMaxEvents}
        weekends={weekends}
        locale='ko'
        eventDisplay='block'
        displayEventTime={false}
        // 이벤트 정렬 순서
        eventOrder={['order', 'title', 'start']}
        // 커스터마이징 함수들
        dayHeaderContent={dayHeaderContent}
        dayCellContent={dayCellContent}
        dayCellClassNames={dayCellClassNames}
        eventContent={eventContent}
        // 이벤트 핸들러들
        datesSet={handleDatesSet}
        eventClick={onEventClick}
        eventResize={onEventResize}
        eventDrop={onEventDrop}
        select={onDateSelect}
        eventAdd={onEventAdd}
        eventChange={onEventChange}
        eventRemove={onEventRemove}
      />
    </div>
  );
};
