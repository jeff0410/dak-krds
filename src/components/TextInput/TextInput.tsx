import type * as React from 'react';
import { forwardRef, useState } from 'react';
import { getColor } from 'src/styles/color/color';
import { Icon, Label } from '../index';
import { StatusLabel } from './StatusLabel';
import * as styles from './TextInput.module.css';
import type { TextInputProps } from './TextInput.type';

const calculateGap = (
  title: string | undefined,
  description: string | undefined,
  titlePosition: string,
) => {
  if (!title && !description) return '0';
  return titlePosition === 'horizontal' ? '5%' : '10px';
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      id,
      type = 'text',
      title,
      titlePosition = 'vertical',
      description,
      gap = calculateGap(title, description, titlePosition),
      isValid = true,
      isRequired = false,
      error,
      info,
      placeholder,
      width = '100%',
      height = '48px', //'40px' | '48px' | '56px'
      minHeight,
      maxHeight,
      className = '',
      titleClassName = '',
      inputClassName = '',
      value,
      setValue = () => {},
      onEnterKeyPress = () => {},
      disabled = false,
      useIcon = false,
      iconPosition = 'left',
      icon = (
        <span
          className={`${iconPosition === 'left' ? styles.inputLeftIconSvg : styles.inputRightIconSvg}`}>
          <Icon icon='Search' color={getColor('gray-40')} size={20} viewBox='0 0 20 20' />
        </span>
      ),
      clickableIcon = false,
      useDelete = false,
      deleteAction,
      titleAttr,
      ...props
    },
    ref,
  ) => {
    const [isComposing, setIsComposing] = useState<boolean>(false);
    const [showValue, setShowValue] = useState<boolean>(false);
    const showLeftIcon = useIcon && iconPosition === 'left' && type !== 'password';
    const showRightIcon = useIcon && iconPosition === 'right' && type !== 'password';
    const showPassword = useIcon && type === 'password';
    const inputType = type === 'password' && showValue ? 'text' : type;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      setIsComposing(true);
    };

    const handleDelete = () => {
      if (deleteAction) {
        deleteAction();
      } else {
        setValue('');
        if (props.onChange) {
          const event = {
            target: { value: '' },
          } as React.ChangeEvent<HTMLInputElement>;
          props.onChange(event);
        }
      }
    };
    const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isComposing) {
        e.preventDefault();
        onEnterKeyPress();
      }
    };

    return (
      <div
        className={`${styles.wrapper}  ${titlePosition === 'horizontal' ? styles.horizontal : ''}  ${className}`}
        style={{
          width,
          gap,
        }}>
        <div>
          {title && (
            <div className={`${styles.titleWrapper} `}>
              <Label
                size='s'
                id={id}
                className={titleClassName}
                required={isRequired}
                style={{ fontWeight: 400 }}>
                {title}
              </Label>
            </div>
          )}
          {description && (
            <Label
              id='text-input-description'
              size='xs'
              style={{ color: getColor('gray-40'), fontWeight: 400 }}>
              {description}
            </Label>
          )}
        </div>
        <div className={styles.inputGroup}>
          <div style={{ position: 'relative' }}>
            {showLeftIcon && (
              <span
                className={`${styles.inputLeftIconSvg} ${clickableIcon ? styles.clickable : ''}`}>
                {icon}
              </span>
            )}
            {/* styles.inputRightDefault */}
            <input
              ref={ref}
              id={id}
              title={titleAttr}
              type={inputType}
              className={`
            ${styles.input}
            ${!isValid && !disabled ? styles.error : styles.normal}
            ${disabled ? styles.inputDisabled : ''}
            ${showLeftIcon ? styles.inputLeftIcon : ''}
            ${showRightIcon || showPassword ? styles.inputRightIcon : ''} 
            ${inputClassName}
          `.trim()}
              placeholder={placeholder}
              value={value}
              disabled={disabled}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleEnterKeyPress(e);
              }}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
              style={{ height, minHeight, maxHeight, width: '100%' }}
              aria-describedby={error ? `${id}-error` : `${id}-success`}
              aria-invalid={!!error}
              autoComplete='on'
              {...props}
            />
            {useDelete && !disabled && value && (
              <button
                type='button'
                className={`
            ${styles.deleteButton}
            ${showRightIcon || showPassword ? styles.deleteButtonWithIcon : styles.deleteButtonRight}
            ${value ? styles.show : ''}
          `}
                onClick={handleDelete}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleDelete();
                }}
                aria-label='입력값 삭제'>
                <Icon icon='Delete' size={18} viewBox='0 0 18 18' />
              </button>
            )}

            {showRightIcon && (
              <span
                className={`${styles.inputRightIconSvg} ${clickableIcon ? styles.clickable : ''}`}>
                {icon}
              </span>
            )}
            {showPassword && (
              <button
                type='button'
                onClick={() => setShowValue((prev) => !prev)}
                className={styles.passwordIcon}
                aria-label={showValue ? '비밀번호 숨기기' : '비밀번호 보기'}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setShowValue((prev) => !prev);
                  }
                }}>
                {showValue ? (
                  <Icon icon='Visibility' color='var(--krds-color-gray-50)' size={19} />
                ) : (
                  <Icon icon='VisibilityOff' color='var(--krds-color-gray-50)' size={19} />
                )}
              </button>
            )}
          </div>
          <StatusLabel
            value={value}
            disabled={disabled}
            isValid={isValid}
            error={error}
            info={info}
            errorId={`${id}-error`}
            infoId={`${id}-info`}
            hasContent={!!(error || info)}
          />
        </div>
      </div>
    );
  },
);
