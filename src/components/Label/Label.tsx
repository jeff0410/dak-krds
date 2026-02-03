import type { ElementType } from 'react';
import * as styles from './Label.module.css';
import type { LabelProps } from './Label.type';
import { uniqueId } from 'lodash-es';

/**
 *
 * - @param props - Label 컴포넌트의 속성
 * - @param id - 글자 크기
 * - @param size - 글자 크기
 * - @param weight - 글자 두께 (regular 또는 bold)
 * - @param children
 * - @param className
 * - @param required - 필수 항목 여부 ( * 표시 ) 기본 값은 false
 * - @param as - 렌더링할 HTML 요소 (기본값: 'label')
 * - @param label - label이 있는 경우 우선 표시됩니다. children보다 우선합니다.
 * - @returns
 */
export const Label = <E extends ElementType = 'label'>({
  id,
  size = 'm',
  weight = 'regular',
  children,
  className = '',
  required = false,
  as,
  label,
  ...props
}: LabelProps<E>) => {
  const Component = (as || 'label') as ElementType;

  const uId = id || uniqueId();

  if (label) {
    return (
      <Component
        className={`${styles.label} ${styles[`size_${size}`]} ${styles[`weight_${weight}`]} ${className}`}
        htmlFor={uId}
        {...props}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </Component>
    );
  }

  return (
    <Component
      className={`${styles.label} ${styles[`size_${size}`]} ${styles[`weight_${weight}`]} ${className}`}
      htmlFor={uId}
      {...props}>
      {children}
      {required && <span className={styles.required}>*</span>}
    </Component>
  );
};
