import { type RefObject, useEffect } from 'react';
import { throttle } from '../../utils';

export const useCustomPortalPosition = (
  inputRef: RefObject<HTMLInputElement | null>,
  calendarRef: RefObject<HTMLDivElement | null>,
  isOpen: boolean,
  usePortal: boolean,
  portalGap: number,
  position: 'top' | 'bottom',
) => {
  useEffect(() => {
    if (!usePortal || !isOpen) return;

    const positioning = () => {
      const inputElement = inputRef.current;
      const calendarElement = calendarRef.current;

      if (!calendarElement || !inputElement) return;

      const inputRect = inputElement.getBoundingClientRect();
      const calendarWidth =
        calendarElement.firstElementChild?.getBoundingClientRect()?.width ?? 328;
      const diff = Math.abs(calendarWidth - inputRect.width);
      const left = inputRect.left + (calendarWidth > inputRect.width ? -1 : 1) * diff;

      calendarElement.style.left = `${left}px`;
      calendarElement.style.position = 'fixed';
      calendarElement.style.zIndex = '2600';
      calendarElement.style.width = 'fit-content';

      const isTopPosition = position === 'top';
      if (isTopPosition) {
        calendarElement.style.bottom = `${window.innerHeight - inputRect.top + portalGap}px`;
        calendarElement.style.top = 'auto';
      } else {
        calendarElement.style.top = `${inputRect.bottom + portalGap}px`;
        calendarElement.style.bottom = 'auto';
      }
    };

    const throttledPositioning = throttle(positioning, 100);

    positioning();

    window.addEventListener('resize', throttledPositioning);
    window.addEventListener('scroll', throttledPositioning);

    return () => {
      window.removeEventListener('resize', throttledPositioning);
      window.removeEventListener('scroll', throttledPositioning);
    };
  }, [isOpen, usePortal, portalGap, position, inputRef, calendarRef]);
};
