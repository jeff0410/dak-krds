import type { Dispatch, SetStateAction } from 'react';
import type { ToastBarProps } from '../ToastBar.type';

interface UseHandleToastBarListProps {
  toastbars: ToastBarProps[];
  setToastbars: Dispatch<SetStateAction<ToastBarProps[]>>;
}

export const useHandleToastBarList = ({ toastbars, setToastbars }: UseHandleToastBarListProps) => {
  const closeByIdToastBar = (id: string) => {
    const updatedToastBar = toastbars.map((toastbar) => {
      if (toastbar.id === id) {
        return { ...toastbar, autoCloseTimestamp: -1 };
      }
      return toastbar;
    });

    setToastbars(toastbars.concat(updatedToastBar));
  };

  const closeAllToastBar = () => {
    const updatedToastBar = toastbars.map((toastbar) => {
      return { ...toastbar, autoCloseTimestamp: -1 };
    });

    setToastbars(updatedToastBar);
  };

  return {
    closeByIdToastBar,
    closeAllToastBar,
  };
};
