import { useMemo, useState } from 'react';
import { Icon, TextInput } from 'src/components';
import { TimeSelectorProps } from 'src/components/TimeSelector/TimeSelector.type';
import { TimeSelectorPopup } from 'src/components/TimeSelector/TimeSelectorPopup';
import * as styles from './TimeSelector.module.css';

export function TimeSelector({
  value,
  onChange,
  height,
  useAP = false,
  placeholder = '--:-- --',
  width = '100%',
}: TimeSelectorProps) {
  const [visible, setVisible] = useState(false);
  const timeText = useMemo(() => {
    if (value) {
      const h = value.split(':')[0];
      const m = value.split(':')[1];
      const meridiem = h ? (Number(h) >= 12 ? 'PM' : 'AM') : '--';
      return `${h}:${m} ${meridiem}`;
    }
    return placeholder;
  }, [value, placeholder]);

  const onUpdateTime = (h: string, m: string) => {
    const time = `${h || '--'}:${m || '--'}`;
    if (useAP) {
      const meridiem = Number(h) >= 12 ? 'PM' : 'AM';
      onChange(`${time} ${meridiem}`);
      return;
    }
    onChange(time);
  };

  return (
    <div className={styles.container}>
      <TextInput
        className={styles.timeInput}
        id={'time-selector'}
        width={width}
        icon={<Icon icon={'Time'} />}
        useIcon
        height={height}
        iconPosition={'right'}
        value={timeText}
        readOnly
        onFocus={() => setVisible(true)}
      />
      {visible && (
        <TimeSelectorPopup
          visible={visible}
          setVisible={setVisible}
          time={value}
          onUpdateTime={onUpdateTime}
        />
      )}
    </div>
  );
}
