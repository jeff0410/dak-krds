import type { PropsWithChildren } from 'react';
import styles from './Header.module.css';

export const DialogModalHeader = ({ children }: PropsWithChildren) => {
  return <div className={styles.dialogTitle}>{children}</div>;
};
