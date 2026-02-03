import type { PropsWithChildren } from 'react';
import styles from './Content.module.css';

export const DialogModalContent = ({ children }: PropsWithChildren) => {
  return <div className={styles.modalContentDialog}>{children}</div>;
};
