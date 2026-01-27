import {
  ChronoUnit,
  DateTimeFormatter,
  DayOfWeek,
  Instant,
  LocalDate,
  LocalDateTime,
  TemporalAdjusters,
  ZoneId,
  ZonedDateTime,
  convert,
  nativeJs,
} from '@js-joda/core';

export enum DateTimeFormat {
  YearMonthDays = 'yyyy-MM-dd',
  YearMonthDays2 = 'yyyy. MM. dd',
  YearMonthDaysDot = 'yyyy.MM.dd',
  YearMonthDaysKo = 'yyyy년 MM월 dd일',
  YearMonthDayWithNoSlash = 'yyyyMMdd',
  Full = 'yyyy-MM-dd HH:mm:ss',
  FullWithOutSec = 'yyyy-MM-dd HH:mm',
  FullWithAMPM = 'yyyy-MM-dd a hh:mm',
  Year = 'yyyy',
  MonthDays = 'MM.dd',
  MonthDays2 = 'MM-dd',
  Days = 'dd',
  Time = 'HH:mm',
  TimeWithAMPM = 'hh:mm',
  TimeSec = 'HH:mm:ss',
  YearMonth = 'yyyy. MM',
  YearMonth2 = 'yyyy-MM',
}

const regNoExpFront = /^[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1])$/;
const validateRegNoExpFront = (number: string) => {
  return regNoExpFront.test(number);
};

const regNoExpBack = /^[0-9][0-9]{6}$/;
const validateRegNoExpBack = (number: string) => {
  return regNoExpBack.test(number);
};

/**
 * Date 객체를 ZonedDateTime 으로 변환한다.
 * @param date Date 객체
 * @returns ZonedDateTime
 */
export const convertDateToZonedDateTime = (date: Date) => {
  const instant = Instant.ofEpochMilli(date.getTime());
  const zoneId = ZoneId.systemDefault();
  return ZonedDateTime.ofInstant(instant, zoneId);
};

/**
 * ZonedDateTime => 한국 시간으로 변경
 */
export const parseZoneDateTimeToLocalFullTime = (date: string, locale = 'ko-KR') => {
  const ldt = LocalDateTime.parse(date);
  const jsDate = convert(ldt).toDate();

  return jsDate.toLocaleDateString(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};

/**
 * ZoneDateTime Parse With System default
 * @param date string 또는 Date, string 은 날짜 형식이 포함되어야 한다.
 */
export const parseZoneDateTime = (date?: string | Date) => {
  const time = date
    ? typeof date === 'string'
      ? new Date(date.replace('[UTC]', '')).toISOString()
      : date.toISOString()
    : new Date().toISOString();

  return ZonedDateTime.parse(time)
    .withZoneSameInstant(ZoneId.systemDefault())
    .withFixedOffsetZone();
};

/**
 * 입력한 시간을 정해진 포맷과 함께 반환한다. (기본값은 현재시간)
 * @param date
 * @param format DateTimeFormat enum type 에서 선택 또는 string 으로 직접 작성. 기본값은 yyyy-MM-dd
 * @example dateNowWithFormat() // 2021-03-01
 * dateNowWithFormat(DateTimeFormat.full) // 2021-03-01 09:00:00
 */
export const dateWithFormat = (date?: string | Date, format?: DateTimeFormat | string) => {
  return parseZoneDateTime(date ? date : new Date().toISOString()).format(
    DateTimeFormatter.ofPattern(format ? format : DateTimeFormat.YearMonthDays),
  );
};

export const dateWithFormatDot = (date?: string | Date, format?: DateTimeFormat | string) => {
  return parseZoneDateTime(date ? date : new Date().toISOString()).format(
    DateTimeFormatter.ofPattern(format ? format : DateTimeFormat.YearMonthDaysDot),
  );
};

/**
 *
 * @param date
 * @param format
 * @returns hh:mm
 */
export const timeWithFormat = (date?: string | Date) => {
  const selectedDay = parseZoneDateTime(date ? date : new Date().toISOString());
  const hours = selectedDay.hour() % 12 ? selectedDay.hour() % 12 : 12;
  const minutes = selectedDay.minute() < 10 ? `0${selectedDay.minute()}` : selectedDay.minute();
  const ampm = selectedDay.hour() >= 12 ? 'PM' : 'AM';
  const formatDate = `${hours}:${minutes} ${ampm}`;

  return formatDate;
};

/**
 * 기준시간과 대상시간을 입력 받아 해당 날짜와의 차이를 구한다.
 * @param standard 기준이 될 시간
 * @param target 대상이 될 시간
 * @param unit 값을 반환 할 기준 (일, 월, 시간..) 기본값은 DAYS
 * @example daysBetweenTwoDate('2021-02-01', '2021-01-31') // 1
 * daysBetweenTwoDate('2021-01-30', '2021-03-15', ChronoUnit.MONTHS) // -1
 */

export const daysBetweenTwoDate = (
  standard: string | Date,
  target: string | Date,
  unit = ChronoUnit.DAYS,
) => {
  const st = parseZoneDateTime(standard);
  const tg = parseZoneDateTime(target);

  return tg.until(st, unit);
};

/**
 * 대상 날짜 월 의 시작과 끝을 ZonedDateTime 형식으로 반환한다.
 * @param date
 *
 */
export const getFirstDayAndLastDayOfMonth = (date: string) => {
  return {
    firstDay: parseZoneDateTime(date),
    lastDay: parseZoneDateTime(
      LocalDate.parse(date).with(TemporalAdjusters.lastDayOfMonth()).toString(),
    ),
  };
};

/**
 * standard 날짜의 월이 target 의 월과 같은지 확인
 * @param standard 기준 날짜
 * @param target 대상 날짜
 * @returns boolean
 */
export const isBetweenUntilMonth = (standard: string | Date, target: string | Date) => {
  const st = parseZoneDateTime(standard);
  const tg = parseZoneDateTime(target);

  return st.monthValue() === tg.monthValue() && st.year() === tg.year();
};

/**
 * date 값이 속한 주의 시작일, 끝일을 반환
 * @param date 기준 날짜
 * @param startDayOfWeek 주의 시작 요일 (기본값: 일요일)
 */
export const getFirstAndLastDayOfWeek = (
  date: ZonedDateTime,
  startDayOfWeek: DayOfWeek = DayOfWeek.SUNDAY,
) => {
  const firstDate = date.with(TemporalAdjusters.previousOrSame(startDayOfWeek));
  const lastDate = date.with(TemporalAdjusters.nextOrSame(startDayOfWeek.plus(6)));

  return {
    firstDate,
    lastDate,
  };
};

export const regNoToDatePickerFormat = (regNo: string) => {
  const RegCodes = ['18', '19', '19', '20', '20', '19', '19', '20', '20', '18'];

  const frontRegNo = regNo.split('-')[0];
  const backRegNo = regNo.split('-')[1];

  if (!validateRegNoExpFront(frontRegNo) || !validateRegNoExpBack(backRegNo)) {
    return '';
  }
  const century = RegCodes[Number.parseInt(backRegNo[0], 10)];
  const yyyy = century + frontRegNo.substring(0, 2);
  const mm = frontRegNo.substring(2, 4);
  const dd = frontRegNo.substring(4, 6);

  return `${yyyy}-${mm}-${dd}`;
};

export const regNoToBirthDateWithFormat = (
  regNo: string,
  format: DateTimeFormat | string = DateTimeFormat.YearMonthDays,
) => {
  const date = regNoToDatePickerFormat(regNo);
  return LocalDate.parse(date).format(DateTimeFormatter.ofPattern(format));
};

export const birthDateFormat = (birthDate: string) => {
  const yyyy = birthDate.substring(0, 4);
  const mm = birthDate.substring(4, 6);
  const dd = birthDate.substring(6, 8);
  return `${yyyy}-${mm}-${dd}`;
};

export const parseStringToLocalDate = (date?: string, format?: DateTimeFormat | string) => {
  if (!date) return LocalDate.now();
  return LocalDate.parse(date, DateTimeFormatter.ofPattern(format ?? DateTimeFormat.YearMonthDays));
};

export const numberToHHMMSS = (secs: number) => {
  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor(secs / 60) % 60;
  const seconds = secs % 60;

  return [hours, minutes, seconds]
    .map((v) => (v < 10 ? `0${v}` : v))
    .filter((v, i) => v !== '00' || i > 0)
    .join(':');
};

/**
 * Tablet Safari 대응 임시 util
 */

export const parseZoneDateTimeTablet = (date?: string | Date) => {
  const time = date
    ? typeof date === 'string'
      ? new Date(date.replace(/-/g, '/'))
      : date
    : new Date();

  return ZonedDateTime.from(nativeJs(time))
    .withZoneSameInstant(ZoneId.systemDefault())
    .withFixedOffsetZone();
};

export const daysBetweenTwoDateTablet = (
  standard: string | Date,
  target: string | Date,
  unit = ChronoUnit.DAYS,
) => {
  const st = parseZoneDateTimeTablet(standard);
  const tg = parseZoneDateTimeTablet(target);

  return tg.until(st, unit);
};

export const dateWithFormatTablet = (date?: string | Date, format?: DateTimeFormat | string) => {
  return parseZoneDateTimeTablet(date ? date.toString().replace(/-/g, '/') : new Date()).format(
    DateTimeFormatter.ofPattern(format ? format : DateTimeFormat.YearMonthDays),
  );
};

export const dateWithFormatWithoutConvert = (date: string, format: string) => {
  return ZonedDateTime.from(nativeJs(new Date(date))).format(DateTimeFormatter.ofPattern(format));
};

export const parseStringToLocalDateTime = (date: string, format: DateTimeFormat | string) => {
  const formatter = DateTimeFormatter.ofPattern(format);
  return LocalDateTime.parse(date, formatter);
};

export const parseStringToZonedDateTime = (date: string, format: DateTimeFormat | string) => {
  return parseStringToLocalDateTime(date, format)
    .atZone(ZoneId.systemDefault())
    .withFixedOffsetZone();
};

/** 타임존이 systemDefault로 세팅된 ZonedDateTime parser */
export const parseZonedDateTime = (zonedDateTimeString: string) =>
  ZonedDateTime.parse(zonedDateTimeString)
    .withZoneSameInstant(ZoneId.systemDefault())
    .withFixedOffsetZone();

/** 타임존이 systemDefault로 세팅된 현재 시간의 ZonedDateTime */
export const getZonedDateTimeNow = () =>
  ZonedDateTime.now().withZoneSameInstant(ZoneId.systemDefault()).withFixedOffsetZone();

/**
 * 1달 후 > return 28, 29, 30, 31 | 1년후 > return 364, 365 2달, 2년, 등등 일수 계산하여 리턴
 * @param day number // 1개월 후, 2개월 후, 1년 뒤, 2년 뒤 처럼 되었을 경우 앞 숫자 1,2,3....
 * @param period string // month, year
 */
export const getCalculateTheNumberOfDays = (day: number, period: string) => {
  if (!day) {
    return 0;
  }
  const now = new Date();
  const today = LocalDate.of(now.getFullYear(), now.getMonth() + 1, now.getDate());

  //month
  if (period === 'month') {
    const oneMonthLater = today.plus(day, ChronoUnit.MONTHS);
    const daysBetween = today.until(oneMonthLater, ChronoUnit.DAYS);
    return daysBetween;
  }

  //year
  const oneYearLater = today.plus(day, ChronoUnit.YEARS);
  const daysBetween = today.until(oneYearLater, ChronoUnit.DAYS);
  return daysBetween;
};
