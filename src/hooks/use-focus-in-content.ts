import { useCallback, useEffect, useRef } from 'react';

interface UseFocusInContentProps {
  id?: string;
}

const focusableElements =
  'button:not(:disabled), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * 접근성 측면에서의 포커스 관리를 위한 Hook
 * id에 해당하는 content 내에서만 포커스 움직임
 *
 * - content 그 자체에 focus
 * - content내에서 focus 유지
 *   해당 기능을 위해 content내에 tabIndex 값 할당X
 * - content가 unmount 되었을때 마지막으로 focus된 el로 다시 focus
 */
export const useFocusInContent = ({ id }: UseFocusInContentProps) => {
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  const handleKeydown = (e: KeyboardEvent) => {
    if (!id) return;

    const portals = document.getElementsByClassName('portal-wrap');
    const contentEl = Array.from(portals ?? []).find(
      (portal) => portal.getAttribute('data-id') === id,
    );

    if (!contentEl) return;

    // tab키 입력할 때 마다 focusable element 탐색을 위해
    const focusableList = contentEl.querySelectorAll(focusableElements);
    const firstElement = focusableList[0];
    const lastElement = focusableList[focusableList.length - 1];
    const isTabPressed = e.key === 'Tab';

    if (!isTabPressed) return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        if (lastElement instanceof HTMLElement) lastElement.focus();
        e.preventDefault();
        return;
      }
    }

    if (document.activeElement === lastElement) {
      if (firstElement instanceof HTMLElement) firstElement.focus();

      e.preventDefault();
    }
  };

  const addEventForFocus = useCallback(() => {
    if (!id) return;

    const contentEl = document.getElementById(id);

    if (!contentEl) return;

    const forceFocusList = contentEl.querySelectorAll('[data-focus="true"]');

    setFocusInContent(contentEl, forceFocusList);
  }, [id]);

  useEffect(() => {
    if (!id) return;

    if (!lastFocusedElement.current) {
      if (document.activeElement instanceof HTMLElement) {
        lastFocusedElement.current = document.activeElement;
      }
    }

    addEventForFocus();
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);

      if (lastFocusedElement.current instanceof HTMLElement) {
        lastFocusedElement.current.focus();
      }
    };
  }, [id, addEventForFocus]);
};

const checkElementIsFocused = (el: Element) => {
  const { activeElement } = document;

  // focusable element가 없다면 body에 focus가 되므로 false
  if (activeElement === document.body) return false;
  if (activeElement === el) return true;

  return false;
};

// data-focus 속성을 가지고 있는 요소들이 content에 속하고 focusable 하다면
// 해당 list 요소들에 순차적으로 focus하고 아니라면 modal에 focus를 준다.
const setFocusInContent = (content: HTMLElement, list: NodeListOf<Element>) => {
  for (const item of Array.from(list)) {
    if (item instanceof HTMLElement) item.focus();

    const isFocused = checkElementIsFocused(item);

    if (isFocused) return;
  }

  // data-focus를 가지고 있는 nodeList가 전부 focusable하지 않을 경우
  if (!content.contains(document.activeElement)) {
    content.setAttribute('tabIndex', '0');
    content.focus();
  }
};
