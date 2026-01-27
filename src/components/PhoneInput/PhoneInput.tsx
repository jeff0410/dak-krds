import { useEffect, useRef, useState } from 'react';
import { getColor } from 'src/styles/color/color';
import { Label, TextInput } from '../index';
import * as styles from './PhoneInput.module.css';
import type { PhoneInputProps } from './PhoneInput.type';
import { splitPhoneNumber } from './splitPhoneNumber';

export function PhoneInput({
  id,
  value = '',
  setValue = () => {},
  isRequired = false,
  title,
  titlePosition,
  gap,
  description,
  width = 'fit-content',
  inputWidth,
  inputProps,
  height = '56px', //'40px' | '48px' | '56px'
  minHeight,
  maxHeight,
  titleClassName,
  className,
  ...props
}: PhoneInputProps) {
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const { className: firstClassName, ...firstInputProps } = inputProps?.[0] ?? {};
  const { className: secondClassName, ...secondInputProps } = inputProps?.[1] ?? {};
  const { className: thirdClassName, ...thirdInputProps } = inputProps?.[2] ?? {};

  const [fields, setFields] = useState(['', '', '']);
  useEffect(() => {
    if (value !== fields.join('')) {
      setFields(splitPhoneNumber(value));
    }
  }, [value]);

  const handleChange = (idx: number, v: string) => {
    const num = v.replace(/\D/g, '');
    const next = [...fields];

    if (idx === 0) next[0] = num.slice(0, 3);
    if (idx === 1) next[1] = num.slice(0, 4);
    if (idx === 2) next[2] = num.slice(0, 4);

    setFields(next);
    setValue(next.join(''));

    const nextRef = inputRefs[idx + 1];
    if (
      nextRef &&
      nextRef.current &&
      ((idx === 0 && next[0].length === 3) || (idx === 1 && next[1].length === 4))
    ) {
      nextRef.current.focus();
    }
  };

  return (
    <div
      className={`${styles.wrapper}  ${titlePosition === 'horizontal' ? styles.horizontal : ''}  ${className}`}
      style={{ width, gap }}>
      {(title || description) && (
        <div>
          {title && (
            <div className={`${styles.titleWrapper}`}>
              <Label
                id={`${id}-0`}
                size='s'
                className={titleClassName}
                required={isRequired}
                style={{ fontWeight: 400 }}>
                {title}
              </Label>
            </div>
          )}
          {description && (
            <Label
              id='phone-input-description'
              size='xs'
              style={{ color: getColor('gray-40'), fontWeight: 400 }}>
              {description}
            </Label>
          )}
        </div>
      )}

      <div className={styles.inputGroup}>
        <TextInput
          id={`${id}-0`}
          ref={inputRefs[0]}
          value={fields[0]}
          setValue={(v) => handleChange(0, v)}
          maxLength={3}
          width={inputWidth}
          height={height}
          maxHeight={maxHeight}
          minHeight={minHeight}
          inputMode='numeric'
          pattern='[0-9]*'
          useDelete={false}
          placeholder='010'
          titleAttr={`${title ?? '전화번호'} 첫자리`}
          {...props}
          {...firstInputProps}
          className={`${styles.input} ${firstClassName ?? ''}`}
        />
        <span className={styles.separator}>-</span>
        <TextInput
          id={`${id}-1`}
          titleAttr={`${title ?? '전화번호'} 중간자리`}
          ref={inputRefs[1]}
          value={fields[1]}
          setValue={(v) => handleChange(1, v)}
          maxLength={4}
          width={inputWidth}
          height={height}
          maxHeight={maxHeight}
          minHeight={minHeight}
          inputMode='numeric'
          pattern='[0-9]*'
          useDelete={false}
          placeholder='1234'
          {...props}
          {...secondInputProps}
          className={`${styles.input} ${secondClassName ?? ''}`}
        />
        <span className={styles.separator}>-</span>
        <TextInput
          id={`${id}-2`}
          titleAttr={`${title ?? '전화번호'} 끝자리`}
          ref={inputRefs[2]}
          value={fields[2]}
          setValue={(v) => handleChange(2, v)}
          maxLength={4}
          width={inputWidth}
          height={height}
          maxHeight={maxHeight}
          minHeight={minHeight}
          inputMode='numeric'
          pattern='[0-9]*'
          useDelete={false}
          placeholder='5678'
          {...props}
          {...thirdInputProps}
          className={`${styles.input} ${thirdClassName ?? ''}`}
        />
      </div>
    </div>
  );
}
