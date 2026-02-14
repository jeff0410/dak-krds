import { useRef } from 'react';
import {
  useCustomCalendarPosition,
  useCustomClickOutside,
  useCustomDatePickerState,
  useCustomPortalPosition,
} from '../../hooks';
import { Icon, TextInput } from '../../../index';
import styles from '../../CustomDatePicker.module.css';
import type { CustomSingleDatePickerProps } from '../../CustomDatePicker.type';
import { CustomDatePickerCalendar } from '../DatePickerCalendar';

export function CustomSingleDatePicker({
  id = '',
  label,
  minYear,
  maxYear,
  minDate,
  maxDate,
  width = '100%',
  height = '56px',
  placeholder = '날짜를 선택하세요',
  disabled = false,
  className = '',
  value,
  onChange = () => {},
  isRequired = false,
  useMessage = false,
  titlePosition,
  gap,
  usePortal = false,
  portalGap = 5,
  isValid,
  pattern = 'yyyy-MM-dd',
  editable = true,
  calendarBackgroundColor,
  eventList,
  onMonthChange,
}: CustomSingleDatePickerProps) {
  const singleDateId = `${id}`;
  const inputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const { position, calPosition } = useCustomCalendarPosition(inputRef);
  const cursor = disabled ? 'default' : !editable ? 'pointer' : '';
  const {
    selectedDate,
    formatMinDate,
    formatMaxDate,
    currentSelectedDate,
    inputValue,
    isOpen,
    setIsOpen,
    handleDateClick,
    handleConfirm,
    handleCancel,
    handleInputChange,
    handleBlur,
    isValidInput,
    errorMessage,
  } = useCustomDatePickerState(
    value,
    minDate,
    maxDate,
    minYear,
    maxYear,
    pattern,
    onChange,
  );

  const rootElement = document.getElementById('app');

  const handleToggle = () => {
    if (!isOpen) {
      calPosition();
    }
    setIsOpen(!isOpen);
  };

  useCustomClickOutside([inputRef, calendarRef], handleCancel, isOpen);
  useCustomPortalPosition(
    inputRef,
    calendarRef,
    isOpen,
    usePortal,
    portalGap,
    position,
  );

  return (
    <div style={{ width, height }} className={className}>
      <div className={`${className} ${styles.wrapper}`}>
        <div style={{ position: 'relative', flex: 1 }}>
          <TextInput
            ref={inputRef}
            type='text'
            title={label}
            isRequired={isRequired}
            titlePosition={titlePosition}
            gap={gap}
            id={singleDateId}
            value={inputValue}
            titleAttr='date'
            isValid={isValid === false ? false : isValidInput}
            error={useMessage ? errorMessage : undefined}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            useIcon={true}
            icon={
              <button
                type='button'
                onClick={handleToggle}
                className={styles.iconButton}
                disabled={disabled}>
                <Icon icon='Calendar' className={styles.icon} />
              </button>
            }
            iconPosition='right'
            clickableIcon={true}
            style={{ height, width: '100%', cursor }}
            onBlur={handleBlur}
            readOnly={!editable}
            onClick={editable && !disabled ? undefined : handleToggle}
          />
          <CustomDatePickerCalendar
            type='single'
            selectedDate={currentSelectedDate || selectedDate}
            onDateSelect={handleDateClick}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            minYear={minYear}
            maxYear={maxYear}
            minDate={formatMinDate}
            maxDate={formatMaxDate}
            calendarRef={calendarRef}
            isOpen={isOpen}
            usePortal={usePortal}
            position={position}
            rootElement={rootElement}
            backgroundColor={calendarBackgroundColor}
            eventList={eventList}
            onMonthChange={onMonthChange}
          />
        </div>
      </div>
    </div>
  );
}
