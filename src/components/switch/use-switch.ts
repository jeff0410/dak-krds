import { useState, useCallback, useEffect } from 'react';

interface UseSwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useSwitch = ({ checked: controlledChecked, defaultChecked = false, onChange }: UseSwitchProps) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  useEffect(() => {
    if (!isControlled && defaultChecked !== undefined) {
      setInternalChecked(defaultChecked);
    }
  }, [defaultChecked, isControlled]);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalChecked(event.target.checked);
    }
    onChange?.(event);
  }, [isControlled, onChange]);

  return { checked, handleChange };
};
