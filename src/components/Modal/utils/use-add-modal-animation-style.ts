import { useEffect, useRef } from 'react';

export const useAddModalAnimationStyle = ({
  trigger,
  id,
  top,
}: {
  trigger: boolean;
  id?: string;
  top?: string;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const addStyle = () => {
    const portals = document.getElementsByClassName('portal-wrap');
    const activePortal = Array.from(portals ?? []).find(
      (portal) => portal.getAttribute('data-id') === id,
    );

    const backdrop = activePortal?.querySelector('#backdrop') as HTMLElement;
    const content = activePortal?.querySelector('#modal-content') as HTMLElement;

    if (!backdrop || !content) {
      return;
    }

    if (top) {
      content.style.position = 'fixed';
      content.style.top = top;
    }

    if (trigger) {
      backdrop.style.opacity = '1';
      backdrop.style.transition = 'all 200ms ease';
      content.style.opacity = '1';
      content.style.animation = 'fadeInUp 200ms';
      return;
    }
    if (!trigger) {
      backdrop.style.opacity = '0';
      backdrop.style.transition = 'all 200ms ease';
      content.style.opacity = '0';
      content.style.animation = 'fadeOutDown 200ms';
    }
  };

  useEffect(addStyle, [trigger, id]);

  return { ref };
};
