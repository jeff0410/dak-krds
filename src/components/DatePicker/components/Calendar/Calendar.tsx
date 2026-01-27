import { useCalendar } from '../../hooks/useCalendar';
import { Button, Icon } from '../../../index';
import * as styles from './Calendar.module.css';
import type { CalendarProps } from './Calendar.type';
import { YearMonthSelector } from './YearMonthSelector/YearMonthSelector';

export function Calendar({
  type = 'single',
  selectedDate,
  onDateSelect = () => {},
  selectedRange,
  onConfirm = () => {},
  onCancel = () => {},
  minYear,
  maxYear,
  minDate,
  maxDate,
  className = '',
  buttonsDisabled,
  ...props
}: CalendarProps) {
  const {
    today,
    currentDate,
    goToPrevMonth,
    goToNextMonth,
    goToYear,
    goToMonth,
    generateDays,
    getDayClassName,
    getRangeTextColor,
  } = useCalendar({
    selectedDate: type === 'single' ? selectedDate : selectedRange?.[0] || undefined,
    type,
    selectedRange,
    minDate,
    maxDate,
    minYear,
    maxYear,
  });

  const days = generateDays();

  return (
    <div className={`${className} ${styles.calendar}`} {...props}>
      {/* 헤더 */}
      <div className={styles.headerContainer}>
        <button type={'button'} className={styles.header} onClick={goToPrevMonth}>
          <Icon size={20} viewBox='0 0 20 20' icon='ArrowLeft' />
        </button>
        <div>
          <YearMonthSelector
            currentDate={currentDate}
            minYear={minYear}
            maxYear={maxYear}
            onYearChange={goToYear}
            onMonthChange={goToMonth}
          />
        </div>
        <button type={'button'} className={styles.header} onClick={goToNextMonth}>
          <Icon size={20} viewBox='0 0 20 20' icon='ArrowRight' />
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
                type={'button'}
                key={dayInfo.date.toString()}
                onClick={() => !dayInfo.isDisabled && onDateSelect(dayInfo.date)}
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
      {buttonsDisabled ? (
        <></>
      ) : (
        <div className={styles.calendarFooter}>
          <Button
            size='xs'
            variant='text'
            label='오늘'
            onClick={() => onDateSelect(today)}
            style={{ minWidth: '5px', borderRadius: '8px' }}
          />
          <div className={styles.footerButton}>
            <Button size='s' label='취소' variant='teriary' onClick={onCancel} />
            <Button size='s' label='선택' onClick={onConfirm} />
          </div>
        </div>
      )}
    </div>
  );
}
