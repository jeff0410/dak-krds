import type React from 'react';
import styles from './Checkbox.module.css';
import type { CheckboxGroupProps, CheckboxProps } from './Checkbox.type';

// ✅ 체크 아이콘 컴포넌트 (status === 'on'일 때 표시)
const CheckIcon = () => (
  // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
  <svg viewBox='0 0 24 24' fill='none'>
    <path
      d='M20 6L9 17L4 12'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

/**
 * ✅ 단일 Checkbox 컴포넌트
 * - 커스텀 체크박스 렌더링 (실제 input + 시각적 span)
 * - 키보드 접근성 지원 (기본 checkbox 동작)
 * - 상태: 'on' | 'off'
 */
export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  status,
  onChange,
  label,
  disabled = false,
  size = 'm',
  accentColor,
  labelClassName,
  title,
}) => {
  // 클릭 또는 키보드로 상태 토글
  const handleChange = () => {
    if (!disabled) {
      const nextStatus = status === 'on' ? 'off' : 'on';
      onChange(nextStatus);
    }
  };

  // 상태에 따라 스타일 클래스 적용
  const stateClass = disabled ? styles.disabled : styles[status];

  return (
    <label className={styles.checkboxContainer} htmlFor={id}>
      {/* 실제 input 요소 (접근성/폼 제출용) */}
      <input
        type='checkbox'
        id={id}
        title={title || label || id}
        checked={status === 'on'}
        onChange={handleChange}
        disabled={disabled}
        className={styles.checkboxInput}
        tabIndex={0}
      />
      {/* 시각적 박스 영역 */}
      <span
        className={`${styles.checkboxBox} ${styles[`checkbox_${size}`]} ${stateClass}`}
        aria-hidden='true'
        style={
          status === 'on' && accentColor
            ? ({
                '--checkbox-bg': accentColor,
                '--checkbox-border': accentColor,
                '--checkbox-icon': '#fff',
              } as React.CSSProperties)
            : undefined
        }>
        {/* 체크 상태일 때만 아이콘 표시 */}
        {status === 'on' && <CheckIcon />}
      </span>

      {/* 라벨이 있는 경우 렌더링 */}
      {label && (
        <span
          className={`${styles.checkboxLabel} ${styles[`label_${size}`]} ${disabled ? styles.labelDisabled : ''} ${labelClassName ?? ''}`}>
          {label}
        </span>
      )}
    </label>
  );
};

/**
 * ✅ CheckboxGroup 컴포넌트
 * - 여러 Checkbox 항목을 배열로 렌더링
 * - 선택된 값 배열(values)을 관리함
 * - 'labelKey', 'valueKey'를 통해 옵션 키를 지정 가능
 * - 방향은 수평(horizontal) 또는 수직(vertical)
 */
export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  id,
  options,
  values,
  onChange,
  disabled = false,
  size = 'm',
  labelKey = 'label',
  valueKey = 'value',
  direction = 'horizontal',
  className,
}) => {
  // 체크 상태 토글 핸들러
  const handleToggle = (value: string) => {
    if (disabled) return;

    const nextValues = values.includes(value)
      ? values.filter((v) => v !== value)
      : [...values, value];

    onChange(nextValues);
  };

  return (
    <div
      className={`${styles.group} ${
        direction === 'vertical' ? styles.groupVertical : styles.groupHorizontal
      } ${className}`}>
      {/* 각 옵션을 Checkbox로 렌더링 */}
      {options.map((option) => (
        <Checkbox
          key={option[valueKey]}
          id={`${id || 'checkbox-group'}-${option[valueKey]}`}
          status={values.includes(option[valueKey]) ? 'on' : 'off'}
          onChange={() => handleToggle(option[valueKey])}
          label={option[labelKey]}
          disabled={disabled}
          size={size}
        />
      ))}
    </div>
  );
};
