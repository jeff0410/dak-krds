import { PropsWithChildren } from 'react';
import { BackdropProps } from '../Modal.type';
import { ClearBackdrop } from './ClearBackdrop';
import { DimmedBackdrop } from './DimmedBackdrop';

export const Backdrop = ({
  backdropType,
  onClickBackdrop,
  children,
  staticBackdrop,
}: PropsWithChildren<BackdropProps>) => {
  if (backdropType === 'dimmed' && onClickBackdrop) {
    return (
      <DimmedBackdrop staticBackdrop={staticBackdrop} onClickBackdrop={onClickBackdrop}>
        {children}
      </DimmedBackdrop>
    );
  }

  return <ClearBackdrop staticBackdrop={staticBackdrop}>{children}</ClearBackdrop>;
};
