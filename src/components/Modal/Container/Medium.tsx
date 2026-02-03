import type { PropsWithChildren } from 'react';
import { forwardRef, useCallback } from 'react';
import { Icon } from '../../index';
import { Backdrop } from '../BackDrop';
import { EscKeyEventHandler } from '../KeyEventHandler';
import type { ModalContainerProps } from '../Modal.type';
import styles from './Container.module.css';

export const MediumModalContainer = forwardRef<
  HTMLDivElement,
  PropsWithChildren<ModalContainerProps>
>(
  (
    {
      children,
      onClose: _onClose,
      onClickBackdrop: _onClickBackdrop,
      onEscKeyDown: _onEscKeyDown,
      useClose = true,
      backdropType = 'dimmed',
      staticBackdrop,
      className = '',
      ...props
    },
    ref,
  ) => {
    const onClose = () => {
      const customEvent = new CustomEvent('pop');
      document.dispatchEvent(customEvent);
    };

    const onEscKeyDown = useCallback(_onEscKeyDown ?? _onClose ?? onClose, [
      _onEscKeyDown,
      _onClose,
      onClose,
    ]);

    const onClickBackdrop = useCallback(_onClickBackdrop ?? _onClose ?? onClose, [
      _onClickBackdrop,
      _onClose,
      onClose,
    ]);

    const onClick = _onClose ?? onClose;

    const modal = (
      <div
        {...props}
        ref={ref}
        className={`${className} ${styles.modalContainer} ${styles.modalContainerMedium}`}>
        {children}
        {useClose && (
          <div className={`${styles.modalCloseContainer} ${styles.buttonWrapMedium}`}>
            <button
              type='button'
              className={styles.modalCloseButton}
              onClick={onClick}
              title={'모달 닫기'}
              aria-label='닫기'>
              <Icon icon='Close' size={20} />
            </button>
          </div>
        )}
      </div>
    );

    return (
      <EscKeyEventHandler onEscKeyDown={onEscKeyDown}>
        <Backdrop
          staticBackdrop={staticBackdrop}
          backdropType={backdropType}
          onClickBackdrop={onClickBackdrop}>
          {modal}
        </Backdrop>
      </EscKeyEventHandler>
    );
  },
);
