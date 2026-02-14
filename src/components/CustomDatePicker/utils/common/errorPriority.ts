export function getErrorPriority(
  startValid: boolean,
  startMsg: string,
  endValid: boolean,
  endMsg: string,
) {
  if (!startValid && startMsg.includes('형식')) return { type: 'start', message: startMsg };
  if (!endValid && endMsg.includes('형식')) return { type: 'end', message: endMsg };

  if (!startValid && startMsg.includes('이전')) return { type: 'start', message: startMsg };
  if (!endValid && endMsg.includes('이후')) return { type: 'end', message: endMsg };

  if (!startValid && startMsg) return { type: 'start', message: startMsg };
  if (!endValid && endMsg) return { type: 'end', message: endMsg };

  return { type: null, message: '' };
}
