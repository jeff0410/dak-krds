import { useCallback, useState } from 'react';

import { useDelayToggle } from './use-delay-toggle';

interface UseAnimationToggleProps {
  transitionDuration: number;
  onShow?: VoidFunction;
  onHide?: VoidFunction;
  openDelay?: number;
  closeDelay?: number;
}

export const useAnimationToggle = ({
  transitionDuration,
  onShow: _onShow,
  onHide: _onHide,
  openDelay,
  closeDelay,
}: UseAnimationToggleProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isTrigger, setIsTrigger] = useState<number>(0);

  const onShowCallback = useCallback(() => {
    if (_onShow) _onShow();
    setIsTrigger(100);
  }, [_onShow]);

  const onHideCallback = useCallback(() => {
    if (_onHide) _onHide();
    setIsMounted(false);
  }, [_onHide]);

  const { delayedShow, delayedHide } = useDelayToggle({
    transitionDuration,
    onShow: onShowCallback,
    onHide: onHideCallback,
    openDelay,
    closeDelay,
  });

  const onShow = useCallback(() => {
    setIsMounted(true);
    delayedShow();
  }, [delayedShow]);

  const onHide = useCallback(() => {
    setIsTrigger(0);
    delayedHide();
  }, [delayedHide]);

  return { mounted: isMounted, trigger: isTrigger, onShow, onHide };
};
