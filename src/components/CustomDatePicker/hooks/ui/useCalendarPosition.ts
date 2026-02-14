import type { RefObject } from 'react';
import { useState } from 'react';

export const useCustomCalendarPosition = (inputRef: RefObject<HTMLInputElement | null>) => {
  const [position, setPosition] = useState<'top' | 'bottom'>('bottom');

  const calPosition = () => {
    if (!inputRef.current) return;

    const inputRect = inputRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const calendarHeight = 400;

    const spaceBelow = viewportHeight - inputRect.bottom;
    const spaceAbove = inputRect.top;

    if (spaceBelow >= calendarHeight || spaceBelow > spaceAbove) {
      setPosition('bottom');
    } else {
      setPosition('top');
    }
  };

  return { position, calPosition };
};
