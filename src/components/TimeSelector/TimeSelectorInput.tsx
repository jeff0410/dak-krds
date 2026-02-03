import { useState } from 'react';
import { Button, Icon, Label } from 'src/components';
import { usePopup } from 'src/components/TimeSelector/usePopup';
import * as styles from './TimeSelector.module.css';

interface CustomTimeSelectorProps {
  options: string[];
  value: string;
  setValue: (value: string) => void;
  id: string;
}

export function TimeSelectorInput({ options, value, setValue, id }: CustomTimeSelectorProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const popupRef = usePopup(setVisible);

  return (
    <div className={styles.container} ref={popupRef}>
      <div className={styles.selector} onClick={() => setVisible((v) => !v)}>
        <Label label={value || '--'} weight={'bold'} size={'l'} id={id} />
        <div className={styles.iconWrapper}>
          <Icon icon={'ArrowDropDown'} size={20} viewBox={'0 0 16 16'} />
        </div>
      </div>
      {visible && (
        <div className={styles.popup}>
          {options.map((it) => (
            <Button
              key={it}
              variant={'text'}
              className={styles.fullWidth}
              onClick={() => {
                setValue(it);
                setVisible(false);
              }}>
              {it}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
