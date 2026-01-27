import type { PropsWithChildren } from 'react';
import * as styles from './Content.module.css';
import type { ModalContentProps } from './Modal.type';

export const LargeModalContent = ({
  children,
  className = '',
  contentMaxHeight,
  ...props
}: PropsWithChildren<ModalContentProps>) => {
  return (
    <section
      className={`${className} ${styles.modalContent}  ${styles.modalContentLarge}`}
      tabIndex={0}
      aria-label='모달 내용 스크롤 영역'
      {...props}>
      {children}
    </section>
  );
};
