import { useEffect, useState } from 'react';
import { Icon } from '../Icon';
import * as styles from './Carousel.module.css';
import { CarouselProps } from './Carousel.type';

export const Carousel = <T,>({
  dataList,
  onChange,
  initialIndex = 0,
  className = '',
  disabled = false,
}: CarouselProps<T>) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      onChange(newIndex);
    }
  };

  const handleNext = () => {
    if (currentIndex < dataList.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      onChange(newIndex);
    }
  };

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex === dataList.length - 1;
  const currentPage = currentIndex + 1;
  const totalPages = dataList.length;

  if (dataList.length === 0) {
    return null;
  }

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <button
        type='button'
        onClick={handlePrev}
        disabled={isPrevDisabled || disabled}
        className={`${styles.button} ${styles.buttonPrev}`}
        aria-label='이전'>
        <Icon icon='ArrowLeft' size={16} viewBox='0 0 20 20' />
      </button>

      <div className={styles.pageInfo}>
        {currentPage}/{totalPages}
      </div>

      <button
        type='button'
        onClick={handleNext}
        disabled={isNextDisabled || disabled}
        className={`${styles.button} ${styles.buttonNext}`}
        aria-label='다음'>
        <Icon icon='ArrowRight' size={16} viewBox='0 0 20 20' />
      </button>
    </div>
  );
};
