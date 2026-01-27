import * as style from './Spinner.module.css';
import type { SpinnerProps } from './Spinner.type.ts';

export const Spinner = ({ size = 'm', className = '' }: SpinnerProps) => {
  const sizeClass = style[size] ?? '';
  const spinnerClass = `${style.spinner} ${sizeClass} ${className}`.trim();

  return (
    <div className={spinnerClass} role='status' aria-hidden='true'>
      <svg className={style.svg} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <circle className={style.circle} cx='12' cy='12' r='9' stroke='#CDD1D5' strokeWidth='2' />
        <path
          className={style.path}
          fill='#256EF4'
          d='M12 2a10 10 0 0110 10 10 10 0 01-5 8.66l-1-1.73a8 8 0 004-6.93 8 8 0 00-8-8V2z'
        />
      </svg>
    </div>
  );
};
