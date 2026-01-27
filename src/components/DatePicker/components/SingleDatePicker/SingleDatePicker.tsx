import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Icon, TextInput } from '../../../index';
import * as styles from '../../DatePicker.module.css';
import type { SingleDatePickerProps } from '../../DatePicker.type';
import { useCalendarPosition } from '../../hooks/useCalendarPosition';
import { useDatePickerState } from '../../hooks/useDatePickerState';
import { Calendar } from '../Calendar/Calendar';

const throttle = (callback: () => void, time: number) => {
  let throttleId: ReturnType<typeof setTimeout> | null = null;
  return () => {
    if (throttleId) return;
    throttleId = setTimeout(() => {
      callback();
      throttleId = null;
    }, time);
  };
};

export function SingleDatePicker({
  id = '',
  label,
  inputTitle,
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
  scrollableElementId,
}: SingleDatePickerProps) {
  const singleDateId = `${id}`;
  const inputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const { position, calPosition } = useCalendarPosition(inputRef);

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
    isValidInput,
    errorMessage,
  } = useDatePickerState(value, minDate, maxDate, minYear, maxYear, onChange);

  const rootElement = document.getElementById('app');

  const handleToggle = () => {
    if (!isOpen) {
      calPosition();
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        if (isOpen) {
          handleCancel();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleCancel]);

  useEffect(() => {
    if (!usePortal) return;
    const positioning = () => {
      if (calendarRef.current && inputRef.current && usePortal) {
        const inputRect = inputRef.current.getBoundingClientRect();
        const calendarWidth =
          calendarRef.current.firstElementChild?.getBoundingClientRect()?.width ?? 328;
        const diff = Math.abs(calendarWidth - inputRect.width);
        const left = inputRect.left + (calendarWidth > inputRect.width ? -1 : 1) * diff;

        calendarRef.current.style.left = `${left}px`;
        calendarRef.current.style.position = 'fixed';
        calendarRef.current.style.zIndex = '2600';
        calendarRef.current.style.width = 'fit-content';

        if (calPosition() === 'top') {
          calendarRef.current.style.bottom = `${window.innerHeight - inputRect.top + portalGap}px`;
          calendarRef.current.style.top = 'auto';
        } else {
          calendarRef.current.style.top = `${inputRect.bottom + portalGap}px`;
          calendarRef.current.style.bottom = 'auto';
        }
      }
    };

    const throttledPositioning = throttle(positioning, 10);

    positioning();

    const scrollableElement = scrollableElementId
      ? document.getElementById(scrollableElementId)
      : window;
    window.addEventListener('resize', throttledPositioning);
    scrollableElement?.addEventListener('scroll', throttledPositioning);
    return () => {
      window.removeEventListener('resize', throttledPositioning);
      scrollableElement?.removeEventListener('scroll', throttledPositioning);
    };
  }, [isOpen, usePortal]);

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
            titleAttr={inputTitle || label || '날짜'}
            isValid={isValid === false ? false : isValidInput}
            error={useMessage ? errorMessage : undefined}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            useIcon={true}
            icon={
              <button
                title={'캘린더 열기'}
                type='button'
                onClick={handleToggle}
                className={styles.iconButton}
                disabled={disabled}>
                <Icon icon='Calendar' className={styles.icon} />
              </button>
            }
            iconPosition='right'
            clickableIcon={true}
            style={{ height, width: '100%' }}
          />
          {!usePortal && (
            <div
              ref={calendarRef}
              className={`${styles.calendarDropdown} ${styles[position]} ${isOpen ? styles.open : ''}`}>
              <Calendar
                type='single'
                selectedDate={currentSelectedDate || selectedDate}
                onDateSelect={handleDateClick}
                onConfirm={() => handleConfirm(onChange)}
                onCancel={() => handleCancel()}
                minYear={minYear}
                maxYear={maxYear}
                minDate={formatMinDate}
                maxDate={formatMaxDate}
              />
            </div>
          )}
          {isOpen &&
            usePortal &&
            rootElement &&
            createPortal(
              <div ref={calendarRef} className={`${styles.calendarDropdown} ${styles.open}`}>
                <Calendar
                  type='single'
                  selectedDate={currentSelectedDate || selectedDate}
                  onDateSelect={handleDateClick}
                  onConfirm={() => handleConfirm(onChange)}
                  onCancel={() => handleCancel()}
                  minYear={minYear}
                  maxYear={maxYear}
                  minDate={formatMinDate}
                  maxDate={formatMaxDate}
                />
              </div>,
              rootElement,
            )}
        </div>
      </div>
    </div>
  );
}
