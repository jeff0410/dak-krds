import * as React from 'react';
import { colors, getColor } from 'src/styles/color/color';
import * as styles from './Display.module.css';
import type { DisplayProps } from './Display.type';

/**
 * Display 컴포넌트 😸
 * 제목(헤딩) 텍스트
 *
 * @param props - Display 컴포넌트의 props
 * @param size - 제목 텍스트의 크기 (예: 's', 'm', 'l')
 * @param color - 제목 텍스트의 색상
 * @param children - 렌더링할 텍스트 또는 노드
 * @param className - 추가로 적용할 클래스 이름
 */
export function Display<E extends React.ElementType = 'h1'>({
  size = 'm',
  children,
  color = 'gray-90',
  className = '',
  ...props
}: DisplayProps<E>) {
  const sizeClass = styles[`size_${size}`];
  const weightClass = styles.weight_bold;
  const displayClass = styles.display;

  let colorStyle: React.CSSProperties = {};
  if (color in colors) {
    colorStyle.color = getColor(color as keyof typeof colors);
  } else {
    colorStyle.color = color;
  }

  return (
    <h1
      className={`${displayClass} ${sizeClass} ${weightClass} ${className}`.trim()}
      style={colorStyle}
      {...props}>
      {children}
    </h1>
  );
}
