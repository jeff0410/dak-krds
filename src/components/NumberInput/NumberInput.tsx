import { useEffect, useRef, useState } from 'react';
import { TextInput } from '../TextInput/TextInput';
import type { NumberInputProps } from './NumberInput.type';
import { handleNumberChange } from './handleNumberChange';

export function NumberInput({
  id,
  title,
  titleAttr,
  titlePosition,
  gap,
  description,
  isValid,
  error,
  placeholder,
  width = '100%',
  height = '48px', //'40px' | '48px' | '56px'
  minHeight,
  maxHeight,
  className = '',
  titleClassName = '',
  inputClassName = '',
  value,
  setValue = () => {},
  onEnterKeyPress = () => {},
  useComma = true, // 1000 -> 1,000
  defaultZero = false, // 빈 값일 때 0으로 표시
  allowDecimal = false, // 소수점 허용
  decimalScale, // 소수점 자리수
  isRequired = false,
  ...props
}: NumberInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [cursorPosition, setCursorPosition] = useState<number | null>(null);

  const addComma = (v: string) => {
    if (!v || v === '.' || v === '-') return v;
    const [int, dec] = v.split('.');
    const withComma = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return dec !== undefined ? `${withComma}.${dec}` : withComma;
  };

  const displayValue =
    value === '' && defaultZero ? '0' : useComma && value ? addComma(value) : value;

  const handleInputChange = (v: string) => {
    const prevValue = value ?? '';
    const prevDisplayValue = useComma ? addComma(prevValue) : prevValue;

    const currentCursor = inputRef.current?.selectionStart ?? 0;
    const raw = handleNumberChange(v, {
      allowDecimal,
      decimalScale,
    });
    if (raw === null) {
      return;
    }

    setValue(raw);

    if (useComma) {
      const newDisplayValue = addComma(raw);
      const prevCommaCount = (prevDisplayValue.slice(0, currentCursor).match(/,/g) || []).length;
      const nextCommaCount = (newDisplayValue.slice(0, currentCursor).match(/,/g) || []).length;
      const diff = nextCommaCount - prevCommaCount;
      setCursorPosition(currentCursor + diff);
    }
  };

  useEffect(() => {
    if (cursorPosition !== null && inputRef.current) {
      inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
      setCursorPosition(null);
    }
  }, [displayValue, cursorPosition]);

  return (
    <TextInput
      id={id}
      ref={inputRef}
      title={title}
      titleAttr={titleAttr}
      titlePosition={titlePosition}
      isRequired={isRequired}
      gap={gap}
      description={description}
      isValid={isValid}
      inputMode='numeric'
      pattern='[0-9]*'
      value={displayValue}
      setValue={handleInputChange}
      width={width}
      height={height}
      error={error}
      placeholder={placeholder}
      className={className}
      titleClassName={titleClassName}
      inputClassName={inputClassName}
      onEnterKeyPress={onEnterKeyPress}
      minHeight={minHeight}
      maxHeight={maxHeight}
      {...props}
    />
  );
}
