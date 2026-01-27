import { useEffect } from 'react';

export const useBlockDocumentScroll = (trigger: boolean) => {
  useEffect(() => {
    if (trigger) {
      document.body.style.overflow = 'hidden';
      return;
    }

    document.body.style.overflow = 'initial';
  }, [trigger]);
};
