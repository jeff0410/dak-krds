import { type MouseEvent, useRef, useState } from 'react';

// TODO: 스토리 설명 추가하기
/** modal 내부가 아닌 backdrop을 클릭해야만 모달이 닫히도록 함 (고객 요구사항) */
export const useHandleClickBackdrop = (onClickBackdrop: () => void) => {
  const [isClickBackdrop, setIsClickBackdrop] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: MouseEvent) => {
    setIsClickBackdrop(e.target === backdropRef?.current);
  };

  const handleMouseUp = () => {
    if (!isClickBackdrop) return;
    onClickBackdrop();
  };

  return {
    backdropRef,
    handleMouseDown,
    handleMouseUp,
  };
};
