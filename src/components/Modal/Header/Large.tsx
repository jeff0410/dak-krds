import { forwardRef } from 'react';
import { Heading, Icon } from '../../index';
import * as styles from './Header.module.css';
import type { ModalLargeHeaderProps } from './Header.type';

export const LargeModalHeader = forwardRef<HTMLDivElement, ModalLargeHeaderProps>(
  ({ title, icon, subTitle, extra }, ref) => {
    return (
      <div className={`${styles.modalHeaderLarge} ${styles.modalHeader}`} ref={ref}>
        <Heading size={3} className={styles.modalHeaderLargeTitle}>
          {icon && (
            <span>
              <Icon icon={icon} size={24} />
            </span>
          )}
          <div>{title}</div>
        </Heading>

        <div className={styles.modalHeaderRight}>
          {extra && <div className={styles.modalHeaderExtra}>{extra}</div>}
        </div>
        {subTitle && <div className={styles.modalHeaderSubTitle}>{subTitle}</div>}
      </div>
    );
  },
);
