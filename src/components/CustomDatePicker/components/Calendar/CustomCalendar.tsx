import { useCustomCalendar } from '../../hooks';
import { Icon } from '../../../index';
import styles from './CustomCalendar.module.css';
import type { CustomCalendarProps } from './CustomCalendar.type';
import { CustomYearMonthSelector } from './YearMonthSelector/YearMonthSelector';

export function CustomCalendar({
  type = 'single',
  selectedDate,
  onDateSelect = () => {},
  selectedRange,
  minYear,
  maxYear,
  minDate,
  maxDate,
  className = '',
  buttonsDisabled,
  border = '1px solid var(--krds-color-gray-20)',
  width = '100%',
  ...props
}: CustomCalendarProps) {
  const {
    currentDate,
    goToPrevMonth,
    goToNextMonth,
    goToYear,
    goToMonth,
    generateDays,
    getDayClassName,
    getRangeTextColor,
  } = useCustomCalendar({
    selectedDate:
      type === 'single' ? selectedDate : selectedRange?.[0] || undefined,
    type,
    selectedRange,
    minDate,
    maxDate,
    minYear,
    maxYear,
  });

  const days = generateDays();

  return (
    <div
      className={`${className} ${styles.calendar}`}
      style={{
        border: border || 'none',
        width: width,
        ...props.style,
      }}
      {...props}>
      <div className={styles.headerContainer}>
        <button type='button' className={styles.header} onClick={goToPrevMonth}>
          <Icon size={20} viewBox='0 0 24 24' icon='ArrowLeft' />
        </button>
        <div>
          <CustomYearMonthSelector
            currentDate={currentDate}
            minYear={minYear}
            maxYear={maxYear}
            onYearChange={goToYear}
            onMonthChange={goToMonth}
          />
        </div>
        <button type='button' className={styles.header} onClick={goToNextMonth}>
          <Icon size={20} viewBox='0 0 24 24' icon='ArrowRight' />
        </button>
      </div>

      <div className={styles.calendarBody}>
        <div className={styles.weekdaysContainer}>
          {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className={styles.daysContainer}>
          {days.map((dayInfo, index) => {
            const classNames = getDayClassName(dayInfo, index, days.length);

            return (
              <button
                type='button'
                key={dayInfo.date.toString()}
                onClick={() =>
                  !dayInfo.isDisabled && onDateSelect(dayInfo.date)
                }
                className={classNames.map((name) => styles[name]).join(' ')}
                style={{
                  color: getRangeTextColor(dayInfo),
                }}>
                {dayInfo.date.dayOfMonth()}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
