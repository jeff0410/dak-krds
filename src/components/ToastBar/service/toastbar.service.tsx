import { ReactNode } from 'react';
import { Icon } from 'src/components';
import { customEventService } from 'src/hooks';
import type { ToastBarEventListenerType, ToastBarProps } from '../ToastBar.type';
import { uniqueId } from 'lodash-es';

const END_OF_DAY = Date.parse('9999-12-31');

export enum TOASTBAR_TYPE {
  DANGER = 'danger',
  SUCCEED = 'succeed',
  WARNING = 'warning',
  INFO = 'info',
}

type ToastbarOptionProps = {
  [i in TOASTBAR_TYPE]: {
    icon?: ReactNode;
    closeDelay: number;
    type: 'danger' | 'succeed' | 'warning' | 'info';
  };
};

const TOASTBAR_OPTIONS: ToastbarOptionProps = {
  danger: {
    icon: <Icon icon='SystemDanger' size={20} primary='#DE3412' />,
    closeDelay: 3000,
    type: 'danger',
  },
  succeed: {
    icon: <Icon icon='SystemSuccess' size={20} primary='#007A4E' />,
    closeDelay: 3000,
    type: 'succeed',
  },
  warning: {
    icon: <Icon icon='SystemWarning' size={20} primary='#9E6A00' />,
    closeDelay: 3000,
    type: 'warning',
  },
  info: {
    icon: <Icon icon='SystemInfo' size={20} primary='#16408D' />,
    closeDelay: 3000,
    type: 'info',
  },
};

const newToastBar = (
  text: ReactNode,
  type: TOASTBAR_TYPE,
  title?: string,
  id?: string,
): ToastBarProps => {
  const uid = id ?? uniqueId('toast-bar-');

  const autoCloseTimestamp = TOASTBAR_OPTIONS[type].closeDelay
    ? Date.now() + TOASTBAR_OPTIONS[type].closeDelay
    : END_OF_DAY;

  return {
    text,
    id: uid,
    autoCloseTimestamp,
    icon: TOASTBAR_OPTIONS[type].icon,
    closeDelay: TOASTBAR_OPTIONS[type].closeDelay,
    title,
    type: TOASTBAR_OPTIONS[type].type,
  };
};

export const toastbarService = {
  dangerMsg(text: ReactNode, title?: string, id?: string) {
    const uid = id ?? uniqueId('danger-toast-bar-');
    customEventService.dispatch<ToastBarEventListenerType, ToastBarProps>(
      '[toastbar] show dangerMsg',
      { detail: newToastBar(text, TOASTBAR_TYPE.DANGER, title, id) },
    );
    return uid;
  },

  succeedMsg(text: ReactNode, title?: string, id?: string) {
    const uid = id ?? uniqueId('succeed-toast-bar-');
    customEventService.dispatch<ToastBarEventListenerType, ToastBarProps>(
      '[toastbar] show succeedMsg',
      { detail: newToastBar(text, TOASTBAR_TYPE.SUCCEED, title, id) },
    );
    return uid;
  },

  warningMsg(text: ReactNode, title?: string, id?: string) {
    const uid = id ?? uniqueId('warning-toast-bar-');
    customEventService.dispatch<ToastBarEventListenerType, ToastBarProps>(
      '[toastbar] show warningMsg',
      { detail: newToastBar(text, TOASTBAR_TYPE.WARNING, title, id) },
    );
    return uid;
  },

  infoMsg(text: ReactNode, title?: string, id?: string) {
    const uid = id ?? uniqueId('info-toast-bar-');
    customEventService.dispatch<ToastBarEventListenerType, ToastBarProps>(
      '[toastbar] show infoMsg',
      { detail: newToastBar(text, TOASTBAR_TYPE.INFO, title, id) },
    );
    return uid;
  },

  close(id: string) {
    customEventService.dispatch<ToastBarEventListenerType, string>('[toastbar] close Toast', {
      detail: id,
    });
  },
  closeAll() {
    customEventService.dispatch<ToastBarEventListenerType, void>('[toastbar] close all toast');
  },
};
