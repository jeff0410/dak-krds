import { useEffect } from 'react';

export const customEventService = {
  dispatch: <T extends string, V = void>(event: T, body?: CustomEventInit<V>) => {
    const customEvent = new CustomEvent(event, body);
    document.dispatchEvent(customEvent);
  },

  subscribe: <T extends string>(event: T, listener: EventListener) => {
    document.addEventListener(event, listener);
  },

  unSubscribe: <T extends string>(event: T, listener: EventListener) => {
    document.removeEventListener(event, listener);
  },
};

interface UseCustomEventListenerProps<T extends string, P = void> {
  eventType: T;
  handler: (e: P) => void;
  depths?: unknown[];
}

export const useCustomEventListener = <T extends string, P = void>({
  eventType,
  handler,
  depths = [],
}: UseCustomEventListenerProps<T, P>) => {
  useEffect(() => {
    const cb = (event: Event) => {
      const eventData = event as CustomEvent<P>;
      return handler(eventData.detail);
    };
    customEventService.subscribe<T>(eventType, cb);
    return () => customEventService.unSubscribe<T>(eventType, cb);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- depths 는 호출자가 주입하는 추가 의존성 배열이라 정적으로 검증할 수 없다
  }, [eventType, handler, ...depths]);
};
