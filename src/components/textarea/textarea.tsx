import type React from 'react';
import { forwardRef } from 'react';
import { getColor } from 'src/styles/color/color';
import { Label, StatusLabel } from '../index';
import * as styles from './TextArea.module.css';
import type { TextAreaProps } from './TextArea.type';

/* eslint-disable no-undef */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      id,
      title,
      titlePosition = 'vertical',
      gap = titlePosition === 'horizontal' ? '5%' : '10px',
      description,
      isValid = true,
      isRequired = false,
      error,
      info,
      placeholder,
      size = 'm',
      maxLength,
      width = '100%',
      height,
      minHeight,
      maxHeight,
      useCount = false,
      className = '',
      titleClassName = '',
      inputClassName = '',
      value = '',
      setValue = () => {},
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const inputId = id;
    const errorId = `${inputId}-error`;
    const infoId = `${inputId}-info`;
    const checkIsValid = maxLength ? value.length <= maxLength : isValid;

    const sizeClass = size === 's' ? styles.sizeS : size === 'l' ? styles.sizeL : styles.sizeM;

    const showStatusLabel = !disabled && (error || info);
    const showCharCount = useCount && !!maxLength;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setValue(newValue);

      if (props.onChange) {
        props.onChange(e);
      }
    };

    return (
      <div
        className={`${styles.wrapper}  ${titlePosition === 'horizontal' ? styles.horizontal : ''}  ${className}`}
        style={{ width, gap }}>
        {title && (
          <Label
            size='s'
            id={inputId}
            className={titleClassName}
            required={isRequired}
            style={{ fontWeight: 400 }}>
            {title}
          </Label>
        )}
        {description && (
          <Label
            id={`${inputId}-description`}
            size='xs'
            style={{ color: getColor('gray-40'), fontWeight: 400 }}>
            {description}
          </Label>
        )}

        <div style={{ position: 'relative' }}>
          <textarea
            ref={ref}
            id={id}
            className={`
                ${styles.textarea} ${sizeClass} 
                ${!checkIsValid && !disabled ? styles.error : styles.normal}
                ${disabled ? styles.textareaDisabled : ''}
                ${inputClassName}`}
            placeholder={placeholder}
            maxLength={maxLength}
            value={value}
            onChange={handleChange}
            style={{ height, minHeight, maxHeight }}
            disabled={disabled}
            {...props}
          />
          {(showStatusLabel || showCharCount) && (
            <StatusLabel
              value={value}
              disabled={disabled}
              isValid={checkIsValid}
              error={error}
              info={info}
              errorId={errorId}
              infoId={infoId}
              useCount={showCharCount}
              maxLength={maxLength}
              hasContent={!!(error || info || useCount)}
            />
          )}
        </div>
      </div>
    );
  },
);
