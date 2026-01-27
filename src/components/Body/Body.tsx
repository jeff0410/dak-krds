import * as styles from './Body.module.css';
import * as React from 'react';
import { colors, getColor } from '../../styles/color/color';
import type { BodyProps } from './Body.type';

/**
 * Body 컴포넌트 😸
 * 본문 텍스트 렌더링 dak-t1, dak-t2 스타일을 적용합니다.
 *
 * - @param props - Body 컴포넌트의 props
 * - @param size - 본문 텍스트의 크기 (1 또는 2)
 * - @param weight - 본문 텍스트의 두께 ('regular', 'semibold', 'bold')
 * - @param color - 본문 텍스트의 색상
 * - @param children - 렌더링할 텍스트 또는 노드
 * - @param className - 추가로 적용할 클래스 이름
 * - @param label - 본문 텍스트의 레이블
 */

export function Body<E extends React.ElementType = 'p'>({
  size = 1,
  weight = 'regular',
  color = 'gray-90',
  children,
  label,
  className = '',
  ...props
}: BodyProps<E>) {
  let colorStyle: React.CSSProperties = {};
  if (color in colors) {
    colorStyle.color = getColor(color as keyof typeof colors);
  } else {
    colorStyle.color = color;
  }

  return (
    <p
      className={`${styles.body} ${styles[`size_${size}`]} ${styles[`weight_${weight}`]} ${className}`.trim()}
      style={colorStyle}
      {...props}>
      {children ? children : label}
    </p>
  );
}
