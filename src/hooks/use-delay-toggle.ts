import { useCallback, useRef } from 'react';

interface UseDelayToggle {
  onShow: VoidFunction;
  onHide: VoidFunction;
  /* css transiton duration
   * ms 단위로 입력해주세요
   */
  transitionDuration?: number;
  openDelay?: number;
  closeDelay?: number;
}

export const useDelayToggle = ({
  transitionDuration = 1500,
  openDelay = 0,
  closeDelay = 0,
  onShow,
  onHide,
}: UseDelayToggle) => {
  const enterTimeout = useRef<number | undefined>(undefined);
  const exitTimeout = useRef<number | undefined>(undefined);

  const delayedShow = useCallback(() => {
    if (exitTimeout.current) {
      clearTimeout(exitTimeout.current);
      exitTimeout.current = undefined;
    }

    enterTimeout.current = window.setTimeout(onShow, openDelay);
  }, [onShow, openDelay]);

  const delayedHide = useCallback(() => {
    if (enterTimeout.current) {
      clearTimeout(enterTimeout.current);
      enterTimeout.current = undefined;
    }

    exitTimeout.current = window.setTimeout(onHide, closeDelay + transitionDuration);
  }, [onHide, closeDelay, transitionDuration]);

  return { delayedShow, delayedHide };
};
