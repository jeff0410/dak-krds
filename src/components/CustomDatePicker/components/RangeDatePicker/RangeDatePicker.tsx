import React, { useRef } from 'react';
import {
  useCustomCalendarPosition,
  useCustomClickOutside,
  useCustomPortalPosition,
  useCustomRangeDatePickerState,
} from '../../hooks';
import { getErrorPriority } from '../../utils';
import { Icon, Label, TextInput } from '../../../index';
import type { CustomRangeDatePickerProps } from '../../CustomDatePicker.type';
import styles from '../../CustomDatePicker.module.css';
import { CustomDatePickerCalendar } from '../DatePickerCalendar';
import { uniqueId } from 'lodash-es';

export function CustomRangeDatePicker({
  id = '',
  label,
  minYear,
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
  usePortal = true,
  portalGap = 5,
  isValid,
  pattern = 'yyyy-MM-dd',
  editable = true,
}: CustomRangeDatePickerProps) {
  const rangeDateId = id || uniqueId();
  const containerRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const { position, calPosition } = useCustomCalendarPosition(anchorRef);
  const cursor = disabled ? 'default' : !editable ? 'pointer' : '';

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
    handleBlur,
    isStartValidInput,
    isEndValidInput,
    startErrorMessage,
    endErrorMessage,
  } = useCustomRangeDatePickerState(
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

  const errorPriority = getErrorPriority(
    isStartValidInput,
    startErrorMessage,
    isEndValidInput,
    endErrorMessage,
  );

  useCustomClickOutside([containerRef, calendarRef], handleCancel, isOpen);
  useCustomPortalPosition(
    anchorRef,
    calendarRef,
    isOpen,
    usePortal,
    portalGap,
    position,
  );
  const wrapperStyle = {
    width,
    gap,
    '--input-height': typeof height === 'number' ? `${height}px` : height,
  } as React.CSSProperties;

  return (
    <div
      ref={containerRef}
      className={`${styles.datePicker}  ${titlePosition === 'horizontal' ? styles.horizontal : ''}  ${className}`}
      style={wrapperStyle}>
      {label && (
        <div className={`${styles.titleWrapper} `}>
          <Label
            size='s'
            id={`${rangeDateId}-start`}
            className={titleClassName}
            required={isRequired}
            style={{ fontWeight: 400 }}>
            {label}
          </Label>
        </div>
      )}

      <div className={styles.rangeInputContainer}>
        <TextInput
          type='text'
          id={`${rangeDateId}-start`}
          value={startInputValue}
          isValid={isValid === false ? false : isStartValidInput}
          error={
            useMessage && errorPriority.type === 'start'
              ? errorPriority.message
              : undefined
          }
          onChange={(e) => handleStartInputChange(e.target.value)}
          placeholder='시작일'
          disabled={disabled}
          className={styles.rangeInput}
          style={{ height, width: '100%', cursor }}
          gap={0}
          onBlur={handleBlur}
          readOnly={!editable}
          onClick={editable && !disabled ? undefined : handleToggle}
        />
        <span className={styles.rangeSeparator}>-</span>

        <TextInput
          type='text'
          ref={anchorRef}
          id={`${rangeDateId}-end`}
          value={endInputValue}
          isValid={isValid === false ? false : isEndValidInput}
          error={
            useMessage && errorPriority.type === 'end'
              ? errorPriority.message
              : undefined
          }
          onChange={(e) => handleEndInputChange(e.target.value)}
          placeholder='종료일'
          disabled={disabled}
          className={styles.rangeInput}
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
          style={{ height, width: '100%', position: 'relative', cursor }}
          gap={0}
          onBlur={handleBlur}
          readOnly={!editable}
          onClick={editable && !disabled ? undefined : handleToggle}
        />
        <CustomDatePickerCalendar
          type='range'
          selectedRange={selectedRange}
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
        />
      </div>
    </div>
  );
}
