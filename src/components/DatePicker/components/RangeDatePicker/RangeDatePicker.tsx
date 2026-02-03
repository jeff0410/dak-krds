import type React from 'react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Icon, Label, TextInput } from '../../../index';
import * as styles from '../../DatePicker.module.css';
import type { RangeDatePickerProps } from '../../DatePicker.type';
import { useCalendarPosition } from '../../hooks/useCalendarPosition';
import { useRangeDatePickerState } from '../../hooks/useRangeDatePickerState';
import { getErrorPriority } from '../../utils/errorPriority';
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

export function RangeDatePicker({
  id = '',
  label,
  minYear = 1900,
  maxYear,
  minDate,
  maxDate,
  width = '100%',
  height = '56px',
  disabled = false,
  className = '',
  value,
  onChange = () => {},
  isRequired = false,
  useMessage = false,
  titlePosition = 'vertical',
  titleClassName = '',
  gap = titlePosition === 'horizontal' ? '5%' : '10px',
  usePortal = false,
  portalGap = 5,
  isValid,
  scrollableElementId = 'main-content',
}: RangeDatePickerProps) {
  const rangeDateId = `${id}`;
  const inputRef = useRef<HTMLInputElement>(null);
  const endInputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const { position, calPosition } = useCalendarPosition(inputRef);
  const rootElement = document.getElementById('app');

  const {
    selectedRange,
    startInputValue,
    endInputValue,
    formatMinDate,
    formatMaxDate,
    isOpen,
    setIsOpen,
    handleDateClick,
    handleConfirm,
    handleCancel,
    handleStartInputChange,
    handleEndInputChange,
    isStartValidInput,
    isEndValidInput,
    startErrorMessage,
    endErrorMessage,
  } = useRangeDatePickerState(value, minDate, maxDate, minYear, maxYear, onChange);

  const handleToggle = () => {
    if (!isOpen) {
      calPosition();
    }
    setIsOpen(!isOpen);
  };

  const errorPriority = getErrorPriority(
    isStartValidInput,
    startErrorMessage,
    isEndValidInput,
    endErrorMessage,
  );

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

    if (calendarRef.current) calendarRef.current.style.transition = 'none';
    const positioning = () => {
      if (calendarRef.current && endInputRef.current && usePortal) {
        const inputRect = endInputRef.current.getBoundingClientRect();
        const calendarWidth =
          calendarRef.current.firstElementChild?.getBoundingClientRect()?.width ?? 328;
        if (calendarWidth <= 0) return;
        const diff = Math.abs(calendarWidth - inputRect.width);
        const left = inputRect.left + (calendarWidth > inputRect.width ? -1 : 1) * diff;

        calendarRef.current.style.left = `${left}px`;
        calendarRef.current.style.position = 'fixed';
        calendarRef.current.style.zIndex = '30';
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

  const wrapperStyle = {
    width,
    gap,
    '--input-height': height,
  } as React.CSSProperties;

  const calendarContent = (
    <div
      ref={calendarRef}
      className={`${styles.calendarDropdown} ${styles[position]} ${isOpen ? styles.open : ''}`}>
      <Calendar
        type='range'
        selectedRange={selectedRange}
        onDateSelect={handleDateClick}
        onConfirm={() => handleConfirm(onChange)}
        onCancel={() => handleCancel()}
        minYear={minYear}
        maxYear={maxYear}
        minDate={formatMinDate}
        maxDate={formatMaxDate}
      />
    </div>
  );

  return (
    <div
      className={`${styles.datePicker}  ${titlePosition === 'horizontal' ? styles.horizontal : ''}  ${className}`}
      style={wrapperStyle}>
      {label && (
        <div className={`${styles.titleWrapper} `}>
          <Label
            size='s'
            id={`${rangeDateId}`}
            className={titleClassName}
            required={isRequired}
            style={{ fontWeight: 400 }}>
            {label}
          </Label>
        </div>
      )}

      <div className={styles.rangeInputContainer}>
        <TextInput
          ref={inputRef}
          type='text'
          titleAttr={'시작일'}
          id={`${rangeDateId}`}
          value={startInputValue}
          isValid={isValid === false ? false : isStartValidInput}
          error={useMessage && errorPriority.type === 'start' ? errorPriority.message : undefined}
          onChange={(e) => handleStartInputChange(e.target.value)}
          placeholder='시작일'
          disabled={disabled}
          className={styles.rangeInput}
          style={{ height }}
          gap={0}
        />
        <span className={styles.rangeSeparator}>~</span>

        <TextInput
          type='text'
          ref={endInputRef}
          titleAttr={'종료일'}
          id={`${rangeDateId}-end`}
          value={endInputValue}
          isValid={isValid === false ? false : isEndValidInput}
          error={useMessage && errorPriority.type === 'end' ? errorPriority.message : undefined}
          onChange={(e) => handleEndInputChange(e.target.value)}
          placeholder='종료일'
          disabled={disabled}
          className={styles.rangeInput}
          useIcon={true}
          icon={
            <button
              type='button'
              title={'캘린더 열기'}
              onClick={handleToggle}
              className={styles.iconButton}
              disabled={disabled}>
              <Icon icon='Calendar' className={styles.icon} />
            </button>
          }
          iconPosition='right'
          clickableIcon={true}
          style={{ height, position: 'relative' }}
          gap={0}
        />
        {usePortal && rootElement ? createPortal(calendarContent, rootElement) : calendarContent}
      </div>
    </div>
  );
}
