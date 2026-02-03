import type {MTabScrollWrapperProps} from 'src/components';
import {Button, Icon, Tabs} from 'src/components';
import {useEffect, useMemo, useRef, useState} from 'react';
import styles from './MScrollTab.module.css';

export function MScrollTab(tabProps: MTabScrollWrapperProps) {
  const {scrollByAmount = 200, tabs: tabList, selectedIndex, autoScroll = false} = tabProps;
  const [isOverflowed, setIsOverflowed] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const tabContainerRef = useRef<HTMLDivElement>(null);

  const tabs = useMemo(() => tabList.map(it => ({...it, content: null})), [tabList]);
  const getRender = () => {
    const content = tabList?.[selectedIndex ?? 0]?.content;
    return typeof content === 'function' ? content() : content;
  };

  useEffect(() => {
    const TOL = 2;

    const updateOverflowState = () => {
      const el = tabContainerRef.current;
      if (!el) return;

      const {scrollLeft, clientWidth, scrollWidth} = el;
      setIsOverflowed(scrollWidth > clientWidth + TOL);
      setCanScrollLeft(scrollLeft > TOL);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - TOL);
    };

    updateOverflowState();

    const el = tabContainerRef.current;
    if (!el) return;

    el.addEventListener('scroll', updateOverflowState, {passive: true});
    window.addEventListener('resize', updateOverflowState);

    return () => {
      el.removeEventListener('scroll', updateOverflowState);
      window.removeEventListener('resize', updateOverflowState);
    };
  }, [tabs, selectedIndex]);

  const scrollLeft = () => {
    const el = tabContainerRef.current;
    if (!el) return;
    el.scrollBy({left: -scrollByAmount, behavior: 'smooth'});
  };
  const scrollRight = () => {
    const el = tabContainerRef.current;
    if (!el) return;
    el.scrollBy({left: scrollByAmount, behavior: 'smooth'});
  };

  const onChangeTab = (index: number) => {
    tabProps?.onChange?.(index);

    if (!autoScroll) return;
    const el = tabContainerRef.current;
    if (!el) return;
    const selectedTabElement = el.querySelector(`#tab-${tabList[index].id}`) as HTMLElement;
    if (selectedTabElement) {
      selectedTabElement.scrollIntoView({block: 'nearest', behavior: 'smooth', inline: 'center'});
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div ref={tabContainerRef} className={styles.scrollContainer}>
          <Tabs {...tabProps} tabs={tabs} onChange={onChangeTab}/>
        </div>
        {isOverflowed && canScrollLeft && (
          <div className={styles.overlayLeft}>
            <div className={styles.innerLeft}>
              <Button
                width="100%"
                height="100%"
                variant="transparent"
                onClick={scrollLeft}
                className={styles.buttonLeft}
              >
                <Icon icon="ArrowLeft" size={20} viewBox="0 0 16 16"/>
              </Button>
              <div className={`${styles.separator}`}/>
            </div>
            <div className={styles.gradientLeft}/>
          </div>
        )}
        {isOverflowed && canScrollRight && (
          <div className={styles.overlayRight}>
            <div className={styles.gradientRight}/>
            <div className={styles.innerRight}>
              <div className={`${styles.separator}`}/>
              <Button
                width="100%"
                height="100%"
                variant="transparent"
                onClick={scrollRight}
                className={styles.buttonRight}
              >
                <Icon icon="ArrowRight" size={20} viewBox="0 0 16 16"/>
              </Button>
            </div>
          </div>
        )}
      </div>
      {getRender()}
    </>
  );
}