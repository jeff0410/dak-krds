import { MutableRefObject, useEffect } from 'react';

export const useEscKeyEventListener = ({
  onEscKeyDown,
  ref,
}: {
  onEscKeyDown: () => void;
  ref: MutableRefObject<HTMLDivElement | null>;
}) => {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      const portals = document.getElementsByClassName('portal-wrap');
      const currentPortalId = Array.from(portals ?? [])
        .find((modal) => modal.contains(ref.current))
        ?.getAttribute('data-id');
      const activePortalId = Array.from(portals ?? [])[portals.length - 1]?.getAttribute('data-id');

      const isActivePortal = currentPortalId === activePortalId;

      if (e.key === 'Escape' && isActivePortal && !!onEscKeyDown) {
        onEscKeyDown();
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [onEscKeyDown, ref.current]);
};
