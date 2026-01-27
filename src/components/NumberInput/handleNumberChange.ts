export type NumberOnChangeOptions = {
  allowDecimal?: boolean;
  decimalScale?: number;
};

export function handleNumberChange(v: string, options: NumberOnChangeOptions): string {
  const { allowDecimal, decimalScale } = options;

  let raw = v.replace(/,/g, '');
  if (!allowDecimal && raw.includes('.')) return '';

  if (allowDecimal && decimalScale !== undefined && raw.includes('.')) {
    const [int, dec] = raw.split('.');
    raw = int + '.' + dec.slice(0, decimalScale);
  }

  if (/^[0-9]*\.?[0-9]*$/.test(raw) || raw === '' || raw === '.') {
    return raw;
  }
  return '';
}
