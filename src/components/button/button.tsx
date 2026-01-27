import type React from 'react';
import type { MouseEvent } from 'react';
import { Spinner } from '../Spinner';
import * as styles from './Button.module.css';
import type { ButtonProps } from './Button.type';

export function Button({
  type = 'button',
  label = '',
  variant = 'primary',
  onClick = () => {},
  disabled = false,
  className = '',
  width = '100%',
  height,
  rounded = '6px',
  padding,
  icon,
  iconPosition = 'left',
  iconClassName = '',
  size = 'm',
  children,
  loading = false,
  loadingText,
  spinnerSize,
  color,
  borderColor,
  useIcon,
  ...props
}: ButtonProps) {
  const shouldUseIcon = useIcon ?? (!!icon && !loading);
  const hasText = !!(children || label || loadingText);

  // 로딩 중이거나 disabled일 때 비활성화
  const isDisabled = disabled || loading;

  const variantClass = styles[variant] || '';
  const sizeClass = styles[size] || '';
  const disabledClass = isDisabled ? styles.disabled : '';
  const buttonClass =
    `${styles.button} ${variantClass} ${sizeClass} ${disabledClass} ${className}`.trim();

  // 로딩 중일 때 클릭 방지
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (loading || disabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  // 표시할 텍스트 결정
  const displayText = loading && loadingText ? loadingText : children || label;

  return (
    <button
      type={type}
      role='button'
      onClick={handleClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      tabIndex={isDisabled ? -1 : 0}
      style={
        {
          width,
          borderRadius: rounded,
          height,
          padding,
          '--btn-bg': color,
          '--btn-color': '#fff',
          '--btn-border-color': borderColor,
        } as React.CSSProperties
      }
      className={buttonClass}
      {...props}>
      {/* 로딩 스피너 (항상 왼쪽에 표시) */}
      {loading && (
        <span className={styles.icon}>
          <Spinner size='s' />
        </span>
      )}

      {/* 아이콘 왼쪽 (로딩 중이 아닐 때만) */}
      {shouldUseIcon && iconPosition === 'left' && (
        <span className={iconClassName || styles.icon}>{icon}</span>
      )}

      {/* 텍스트 있을 때만 출력 */}
      {hasText && <span className={styles.content}>{displayText}</span>}

      {/* 아이콘 오른쪽 (로딩 중이 아닐 때만) */}
      {shouldUseIcon && iconPosition === 'right' && (
        <span className={iconClassName || styles.icon}>{icon}</span>
      )}
    </button>
  );
}
