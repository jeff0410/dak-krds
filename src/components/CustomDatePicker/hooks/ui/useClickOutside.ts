import { type RefObject, useEffect } from 'react';

export const useCustomClickOutside = <T extends HTMLElement = HTMLElement>(
  refs: RefObject<T | null>[],
  callback: () => void,
  isEnabled: boolean,
) => {
  useEffect(() => {
    if (!isEnabled) return;

    const handleClickOutside = (event: MouseEvent) => {
      const isOutside = refs.every((ref) => {
        return ref.current && !ref.current.contains(event.target as Node);
      });

      if (isOutside) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [refs, callback, isEnabled]);
};
