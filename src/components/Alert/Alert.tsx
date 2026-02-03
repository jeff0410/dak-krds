import { Icon } from '../Icon';
import styles from './Alert.module.css';
import type { AlertProps, AlertVariant, IconName } from './Alert.type';

const VARIANT_CLASS_MAP: Record<AlertVariant, string> = {
  danger: styles.danger,
  warning: styles.warning,
  success: styles.success,
  information: styles.information,
  secondary: styles.secondary,
};

const VARIANT_PRIMARY_COLOR_MAP: Record<AlertVariant, string> = {
  danger: '#DE3412',
  warning: '#9E6A00',
  success: '#007A4E',
  information: '#16408D',
  secondary: '#052B57',
};

const ICON_NAME_MAP: Record<AlertVariant, IconName> = {
  danger: 'SystemDanger',
  warning: 'SystemWarning',
  success: 'SystemSuccess',
  information: 'SystemInfo',
  secondary: 'SystemInfo',
};

export const Alert = ({ variant, icon, title, description, className, isFullWidth = true }: AlertProps) => {
  const variantClass = VARIANT_CLASS_MAP[variant];
  const iconName = ICON_NAME_MAP[icon ?? variant];
  const titleColorClass = styles[`title_${variant}`] ?? '';
  const primaryColor = VARIANT_PRIMARY_COLOR_MAP[variant];

  return (
    <div className={`${styles.alertContainer} ${variantClass} ${className ?? ''}`} style={isFullWidth ? {width: '100%'} : {}}>
      <div className={styles.icon}>
        <Icon icon={iconName} size={24} viewBox='0 0 24 24' primary={primaryColor} />
      </div>

      <div className={styles.content}>
        {title && (
          <div className={styles.titleRow}>
            <span className={`${styles.title} ${titleColorClass}`}>{title}</span>
          </div>
        )}
        {description && (
          <div className={title ? styles.descriptionIndented : styles.description}>
            {description}
          </div>
        )}
      </div>
    </div>
  );
};
