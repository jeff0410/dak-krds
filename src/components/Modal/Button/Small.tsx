import type { HTMLAttributes, PropsWithChildren } from 'react';
import * as styles from './Button.module.css';

export const SmallModalButton = ({
  children,
  className = '',
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => {
  return (
    <div {...props} className={`${className} ${styles.buttonWrap} ${styles.buttonWrapSmall}`}>
      {children}
    </div>
  );
};
