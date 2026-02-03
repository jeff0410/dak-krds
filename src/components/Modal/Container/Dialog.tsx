import { PropsWithChildren, forwardRef, useCallback } from 'react';
import { Backdrop } from '../BackDrop';
import { EscKeyEventHandler } from '../KeyEventHandler';
import { ModalContainerProps } from '../Modal.type';
import * as styles from './Container.module.css';

export const DialogModalContainer = forwardRef<
  HTMLDivElement,
  PropsWithChildren<ModalContainerProps>
>(
  (
    {
      children,
      onClose: _onClose,
      onClickBackdrop: _onClickBackdrop,
      onEscKeyDown: _onEscKeyDown,
      backdropType = 'dimmed',
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

    return (
      <EscKeyEventHandler onEscKeyDown={onEscKeyDown}>
        <Backdrop backdropType={backdropType} onClickBackdrop={onClickBackdrop}>
          <div {...props} ref={ref} className={`${styles.modalContainerDialog} ${className}`}>
            {children}
          </div>
        </Backdrop>
      </EscKeyEventHandler>
    );
  },
);
