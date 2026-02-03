import type { ReactNode } from 'react';
import { Button, Icon } from 'src/design-index';
import { DialogModal } from '../Dialog';
import type { DialogProps, ModalListProps } from '../Modal.type';
import { MODAL_LIST_TYPE } from '../Modal.type';
import styles from './Dialog.module.css';
import { modalService } from './modal.service';
import { uniqueId } from 'lodash-es';

export enum DefaultDialogTypes {
  BOTH = 0,
  CONFIRM = 1,
}

export enum DefaultDialogButtonTypes {
  PRIMARY = 'primary',
  DANGER = 'danger',
  TERTIARY = 'teriary',
  OUTLINED_BLUE = 'outlinedBlue',
}

export interface DefaultDialogProps {
  title?: ReactNode;
  id?: string;
  zIndex?: number;
  closeButton?: boolean;
  onCloseCb?: VoidFunction;
  onConfirmCb?: VoidFunction;
  cancelLabel?: string;
  buttonType?: DefaultDialogTypes;
  confirmButtonType?: DefaultDialogButtonTypes;
  confirmLabel?: string;
  width?: string;
  height?: string;
  bodyClassName?: string;
  footerClassName?: string;
}

const type = MODAL_LIST_TYPE.DIALOG;

const renderConfirmButton = (
  buttonType: DefaultDialogButtonTypes,
  label: string,
  onClick: VoidFunction,
): ReactNode => {
  const buttonProps = { onClick, children: label };

  const buttonMap = {
    [DefaultDialogButtonTypes.PRIMARY]: DialogModal.PrimaryButton,
    [DefaultDialogButtonTypes.TERTIARY]: DialogModal.TeriaryButton,
    [DefaultDialogButtonTypes.OUTLINED_BLUE]: DialogModal.OutlinedBlueButton,
    [DefaultDialogButtonTypes.DANGER]: DialogModal.DangerButton,
  };

  const ButtonComponent = buttonMap[buttonType] || DialogModal.DangerButton;
  return <ButtonComponent {...buttonProps} />;
};

const safeExecuteCallback = (callback: VoidFunction | undefined, errorMessage: string): void => {
  if (!callback) return;

  try {
    callback();
  } catch (error) {
    console.error(errorMessage, error);
  }
};

export const dialogService = {
  defaultDialog(text: ReactNode, props?: DefaultDialogProps): string {
    const uid = props?.id ?? uniqueId();
    const {
      buttonType = DefaultDialogTypes.BOTH,
      confirmButtonType = DefaultDialogButtonTypes.DANGER,
      confirmLabel = '삭제',
      cancelLabel = '취소',
      zIndex,
      closeButton = false,
      footerClassName,
      onCloseCb,
      onConfirmCb,
      title,
      width = '400px',
      height = 'auto',
      bodyClassName = '',
    } = props ?? {};

    const handleClose = (): void => {
      safeExecuteCallback(onCloseCb, 'Error in onCloseCb:');
      dialogService.popById(uid);
    };

    const handleConfirm = (): void => {
      safeExecuteCallback(onConfirmCb, 'Error in onConfirmCb:');
      dialogService.popById(uid);
    };

    const contents = (
      <DialogModal onClose={handleClose} style={{ width, height }}>
        {closeButton && (
          <div className={styles.dialogCloseIcon}>
            <Button
              icon={<Icon icon='Close' />}
              size='xs'
              width='24px'
              variant='text'
              onClick={handleClose}
            />
          </div>
        )}

        <div
          className={`${styles.dialogBody} ${bodyClassName}`}
          style={title ? { gap: '16px' } : undefined}>
          {title && <DialogModal.Header>{title}</DialogModal.Header>}
          <DialogModal.Content>{text}</DialogModal.Content>
        </div>

        <DialogModal.Footer>
          <div
            className={`${buttonType === DefaultDialogTypes.BOTH && styles.defaultDialogButton} ${footerClassName || ''}`.trim()}>
            {buttonType === DefaultDialogTypes.BOTH && (
              <DialogModal.OutlinedBlueButton onClick={handleClose}>
                {cancelLabel}
              </DialogModal.OutlinedBlueButton>
            )}
            {renderConfirmButton(confirmButtonType, confirmLabel, handleConfirm)}
          </div>
        </DialogModal.Footer>
      </DialogModal>
    );

    const dialogItem: ModalListProps = {
      type,
      id: uid,
      show: true,
      contents,
      zIndex,
      onKeydown: handleClose,
    };

    modalService.push(contents, dialogItem);
    return uid;
  },

  push(contents: ReactNode, props?: DialogProps): string {
    const id = props?.id ?? uniqueId();

    const dialogItem: ModalListProps = {
      type,
      id,
      show: true,
      contents,
      onKeydown: (e) => dialogUtilService.handleKeydownById(e, id, props?.onConfirmCb),
    };

    modalService.push(contents, dialogItem);
    return id;
  },

  pop(): void {
    modalService.pop();
  },

  popById(id: string): void {
    modalService.popById(id);
  },
};

export const dialogUtilService = {
  handleKeydownById(e: KeyboardEvent, dialogId: string, onKeydown?: VoidFunction): void {
    if (e.key === 'Enter') {
      if (onKeydown) {
        onKeydown();
      } else {
        dialogService.popById(dialogId);
      }
    }
  },
};
