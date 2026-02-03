import { useEffect, useRef } from 'react';
import { useAnimationToggle } from '../../hooks/use-animation-toggle';
import styles from './ToastBar.module.css';
import type { ToastBarProps } from './ToastBar.type';

const TYPE_CLASS_MAP: Record<ToastBarProps['type'], string> = {
  succeed: styles.success,
  danger: styles.danger,
  warning: styles.warning,
  info: styles.information,
};

const TYPE_LABEL_MAP: Record<ToastBarProps['type'], string> = {
  succeed: '성공',
  danger: '오류',
  warning: '경고',
  info: '정보',
};

const TYPE_ARIA_LIVE_MAP: Record<ToastBarProps['type'], 'assertive' | 'polite'> = {
  succeed: 'polite',
  danger: 'assertive',
  warning: 'assertive',
  info: 'polite',
};

export const ToastBar = ({
  text,
  icon,
  closeDelay,
  autoCloseTimestamp,
  style,
  id,
  title,
  type,
}: ToastBarProps) => {
  const dissolveTimeout = useRef<ReturnType<typeof setTimeout>>(null);
  const { mounted, trigger, onShow, onHide } = useAnimationToggle({
    transitionDuration: closeDelay || 0 + 1000,
  });

  useEffect(() => {
    onShow();
  }, [onShow]);

  useEffect(() => {
    if (!dissolveTimeout.current) {
      return;
    }
    if (autoCloseTimestamp === -1) {
      onHide();
      clearTimeout(dissolveTimeout.current);
    }
  }, [autoCloseTimestamp]);

  useEffect(() => {
    if (closeDelay) {
      dissolveTimeout.current = setTimeout(onHide, closeDelay);
    }
    return () => {
      if (!dissolveTimeout.current) {
        return;
      }
      clearTimeout(dissolveTimeout.current);
    };
  }, [closeDelay, onHide]);

  if (!mounted) return null;

  const typeClass = TYPE_CLASS_MAP[type] ?? '';
  const titleColorClass = styles[`title_${type}`] ?? '';
  const ariaLive = TYPE_ARIA_LIVE_MAP[type];
  const typeLabel = TYPE_LABEL_MAP[type];

  return (
    mounted && (
      // biome-ignore lint/a11y/useAriaPropsSupportedByRole: 토스트 알림의 타입을 스크린 리더에 명확히 전달하기 위해 aria-label 필요
      <div
        id={id}
        className={`${styles.toastBar} ${typeClass}`}
        role={'alert'}
        aria-live={ariaLive}
        aria-atomic='true'
        aria-label={`${typeLabel} 알림`}
        aria-labelledby={`${typeLabel} 알림`}
        aria-describedby={title}
        tabIndex={0}
        style={{
          ...style,
          opacity: trigger,
          transform: trigger ? undefined : 'translate(0,30px)',
        }}>
        {icon && (
          <div className={styles.icon} aria-hidden='true'>
            {icon}
          </div>
        )}
        <div className={styles.content}>
          {title && (
            <div className={styles.titleRow}>
              <span className={`${styles.title} ${titleColorClass}`}>{title}</span>
            </div>
          )}
          <div className={title ? styles.descriptionIndented : styles.description}>{text}</div>
        </div>
      </div>
    )
  );
};
