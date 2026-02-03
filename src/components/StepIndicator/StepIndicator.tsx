import type { FC } from 'react';
import React from 'react';
import { Icon } from '../Icon';
import styles from './StepIndicator.module.css';
import type { StepIndicatorProps } from './StepIndicator.type';


// 버튼 사용 예시
// <Button onClick={() => setStepIndex((prev) => Math.max(prev - 1, 0))}>이전</Button>;
// <Button onClick={() => setStepIndex((prev) => Math.min(prev + 1, steps.length - 1))}>다음</Button>;

const STYLE_CONTAINER = {
  line: 'stepList',
  box: 'stepBox',
};

export const StepIndicator: FC<StepIndicatorProps> = ({
  steps,
  currentStepIndex,
  className,
  align = 'center',
  variant = 'line',
  onClickStep,
  focusable = false,
}) => {
  const CheckIcon = () => (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'>
      <circle cx='12' cy='12' r='12' fill='#6D7882' />
      <path
        d='M17.207 8.793a1 1 0 0 0-1.414-1.414l-5.5 5.5L8.207 10.793a1 1 0 1 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l6-6Z'
        fill='white'
      />
    </svg>
  );

  const OngoingIcon = () => (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'>
      <circle cx='12' cy='12' r='12' fill='#256EF4' />
      <circle cx='12' cy='12' r='10' fill='white' />
      <circle cx='12' cy='12' r='8' fill='#256EF4' />
    </svg>
  );

  return (
    <ol
      className={`${styles[STYLE_CONTAINER[variant]]} ${className ?? ''}`}
      aria-label='진행 단계 표시'>
      {steps.map((step, index) => {
        /**
         * 단계별 상태 계산
         * - 현재 인덱스보다 작으면 완료(completion)
         * - 같으면 진행 중(ongoing)
         * - 크면 예정 단계(before)
         */
        const status =
          index < currentStepIndex
            ? 'completion'
            : index === currentStepIndex
              ? 'ongoing'
              : 'before';

        const itemClass = [
          styles.stepItem,
          styles[align],
          status === 'completion' ? styles.completed : '',
          status === 'ongoing' ? styles.ongoing : '',
          //   status === 'before' ? styles.before : '',
        ].join(' ');

        return (
          <React.Fragment key={`step-${index}`}>
            <li className={itemClass}>
              <button
                tabIndex={focusable ? 0 : -1}
                type='button'
                className={styles.stepButton}
                onClick={() => onClickStep?.(index)}
                aria-current={status === 'ongoing' ? 'step' : undefined}
                aria-disabled={status === 'before' ? 'true' : undefined}
                aria-label={`${index + 1}단계 ${status === 'completion' ? '완료' : status === 'ongoing' ? '진행 중' : '예정'}`}>
                <div className={styles.stepCircle}>
                  {status === 'completion' ? (
                    <CheckIcon />
                  ) : status === 'ongoing' ? (
                    <OngoingIcon />
                  ) : (
                    <span aria-hidden='true' />
                  )}
                </div>
                <div className={styles.stepLabelGroup}>
                  <span className={styles.stepLabel}>{`${index + 1}단계`}</span>
                  <span className={styles.stepTitle}>{step.description}</span>
                </div>
              </button>
            </li>
            {index < steps.length - 1 && variant === 'box' && (
              <Icon icon={'ArrowRight'} size={20} viewBox={'0 0 20 20'} />
            )}
          </React.Fragment>
        );
      })}
    </ol>
  );
};
