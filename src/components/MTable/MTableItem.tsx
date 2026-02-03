import * as styles from './MTable.module.css';
import type { MTableItemProps } from 'src/components';
import type { TableRowData } from 'src/components/Table/Table.type';

export function MTableItem<T extends TableRowData>({
  data,
  idKey,
  labelMap,
  excludes,
  customContent,
  customLabel,
}: MTableItemProps<T>) {
  return (
    <>
      {Object.keys(data)
        .filter((it) => Object.keys(labelMap).includes(it) && !excludes?.includes(it))
        .map((key: keyof T) => (
          <div
            key={`${data[idKey as keyof T]?.toString()}-${key.toString()}`}
            className={styles.mTableItemContent}>
            {customLabel?.[key]?.(data) ?? labelMap[key]}
            {' : '}
            {customContent?.[key]?.(data) ?? (data[key] as React.ReactNode)}
          </div>
        ))}
    </>
  );
}
