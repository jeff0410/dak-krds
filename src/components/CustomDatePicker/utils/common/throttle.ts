export const throttle = (callback: () => void, time: number) => {
  let throttleId: ReturnType<typeof setTimeout> | null = null;
  return () => {
    if (throttleId) return;
    throttleId = setTimeout(() => {
      callback();
      throttleId = null;
    }, time);
  };
};
