import * as styles from './TextInput.module.css';
import { Icon, Label } from '../index';

interface StatusLabelProps {
  value?: string;
  disabled: boolean;
  isValid?: boolean;
  error?: string;
  info?: string;
  errorId: string;
  infoId: string;
  useCount?: boolean;
  maxLength?: number;
  charCountColor?: string;
  hasContent?: boolean;
}

export function StatusLabel({
  value,
  disabled,
  isValid,
  error,
  info,
  errorId,
  infoId,
  useCount = false,
  maxLength,
  charCountColor = 'var(--krds-color-primary-50)',
  hasContent = false,
}: StatusLabelProps) {
  const errorMessage = isValid === false && error;
  const charCount = value?.length || 0;
  const showCount = useCount && maxLength;
  const shouldDisplay = hasContent && (errorMessage || info || (showCount && !disabled));

  const containerClass = `${styles.statusContainer} ${shouldDisplay ? styles.visible : styles.hidden}`;

  const renderContent = () => {
    if (disabled && showCount) {
      return (
        <>
          <div className={styles.leftContent}></div>
          <div className={styles.charCountWrapper}>
            <span style={{ color: charCountColor }}>{charCount}</span>
            <span>{`/ ${maxLength}`}</span>
          </div>
        </>
      );
    }

    if (errorMessage) {
      return (
        <>
          <div className={styles.leftContent}>
            <Label id={errorId} size='xs' color='danger' className={styles.errorText}>
              <Icon icon='SystemDanger' size={16} primary='var(--krds-color-danger-50)' />
              {error}
            </Label>
          </div>
          {showCount && (
            <div className={styles.charCountWrapper}>
              <span style={{ color: charCountColor }}>{charCount}</span>
              <span>{`/ ${maxLength}`}</span>
            </div>
          )}
        </>
      );
    }

    if (info) {
      return (
        <>
          <div className={styles.leftContent}>
            <Label id={infoId} size='xs' color='gray-50' className={styles.infoText}>
              <Icon icon='SystemInfo' size={16} />
              {info}
            </Label>
          </div>
          {showCount && (
            <div className={styles.charCountWrapper}>
              <span style={{ color: charCountColor }}>{charCount}</span>
              <span>{`/ ${maxLength}`}</span>
            </div>
          )}
        </>
      );
    }

    if (showCount) {
      return (
        <>
          <div className={styles.leftContent}></div>
          <div className={styles.charCountWrapper}>
            <span style={{ color: charCountColor }}>{charCount}</span>
            <span>{`/ ${maxLength}`}</span>
          </div>
        </>
      );
    }

    return (
      <>
        <div className={styles.leftContent}></div>
        <div></div>
      </>
    );
  };

  return <div className={containerClass} aria-live="assertive" >{renderContent()}</div>;
}
