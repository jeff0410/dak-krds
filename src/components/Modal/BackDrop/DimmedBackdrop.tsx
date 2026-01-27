import type { PropsWithChildren } from 'react';
import { useHandleClickBackdrop } from 'src/hooks/use-handle-click-backdrop';
import type { DimmedBackdropProps } from '../Modal.type';
import * as styles from './Backdrop.module.css';

export const DimmedBackdrop = ({
  children,
  onClickBackdrop,
  staticBackdrop,
}: PropsWithChildren<DimmedBackdropProps>) => {
  const onClose = () => {
    const customEvent = new CustomEvent('pop');
    document.dispatchEvent(customEvent);
  };

  const { backdropRef, handleMouseDown, handleMouseUp } = useHandleClickBackdrop(
    onClickBackdrop ?? onClose,
  );

  return (
    <div
      id='backdrop'
      ref={backdropRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className={styles.dimmedBackdrop}
      style={{
        opacity: staticBackdrop ? '1' : '0',
      }}>
      <div id='modal-content' className={styles.contentWrapper}>
        {children}
      </div>
    </div>
  );
};
