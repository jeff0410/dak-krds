import React from 'react';
import { Icon } from '../Icon';
import { Link } from '../Link';
import styles from './LinkButton.module.css';
import type { LinkButtonProps } from './LinkButton.type';

/**
 * LinkButton 컴포넌트 😸
 * 링크
 *
 * @param props - LinkButton 컴포넌트의 props
 * @param variant - 버튼의 스타일 종류 ('default' | 'accent')
 * @param size - 버튼의 크기 ('small' | 'medium' | 'large')
 * @param children - 버튼 내부에 렌더링할 내용
 * @param className - 추가로 적용할 클래스 이름
 * @param href - 링크의 URL
 * @param title - 버튼의 title, aria-label 속성
 * @param useIcon - 아이콘 사용 여부
 * @param icon - 사용할 커스텀 아이콘
 * @param iconClassName - 아이콘에 적용할 클래스 이름
 */

export function LinkButton<E extends React.ElementType = 'a'>({
  variant = 'default',
  size = 'm',
  children,
  className = '',
  href,
  title,
  useIcon = true,
  icon,
  iconColor,
  iconClassName = '',
  ...props
}: LinkButtonProps<E>) {
  const parsingHref = href
    ? href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')
      ? href
      : `https://${href}`
    : href;
  return (
    <Link
      className={`
        ${styles.linkButton}
        ${variant === 'accent' ? styles.linkButtonAccent : styles.linkButtonDefault}
        ${size === 's' ? styles.linkButtonSmall : size === 'l' ? styles.linkButtonLarge : styles.linkButtonMedium}
        ${className}
      `.trim()}
      href={parsingHref}
      role='link'
      title={title}
      target={
        href && (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//'))
          ? '_blank'
          : undefined
      }
      rel={
        href && (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//'))
          ? 'noopener noreferrer'
          : undefined
      }
      {...props}>
      {children}
      {useIcon &&
        (icon ? (
          icon
        ) : (
          <Icon
            icon='OpenNewWindow'
            color={iconColor || 'var(--krds-color-primary-50)'}
            className={`${styles.icon} ${iconClassName}`}
          />
        ))}
    </Link>
  );
}
