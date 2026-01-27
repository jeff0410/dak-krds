import type { PropsWithChildren } from 'react';
import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import type { PortalProps } from './Portal.type';

export const Portal = ({ children, style, container }: PropsWithChildren<PortalProps>) => {
  const portal = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    Object.assign(portal.style, style);
  }, [portal, style]);

  useEffect(() => {
    const parent = container || document.body;
    parent.style.position = 'relative';

    if (parent instanceof HTMLElement) {
      parent.appendChild(portal);
    }

    return () => {
      if (parent.contains(portal)) {
        parent.removeChild(portal);
      }
    };
  }, [portal, container]);

  return createPortal(children, portal);
};
