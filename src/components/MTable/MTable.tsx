import type { MTableLabelMap, MTableProps } from 'src/components';
import type { TableRowData } from 'src/components/Table/Table.type';
import { MTableItem } from 'src/components/MTable/MTableItem';
import * as styles from './MTable.module.css';

export function MTable<T extends TableRowData>({
  data,
  columns,
  idKey = 'id',
  title,
  excludes,
  customLabel,
  customContent,
  onRowClick,
  customRow,
}: MTableProps<T>) {
  const labelMap: MTableLabelMap<T> = columns.reduce((acc: MTableLabelMap<T>, item) => {
    acc[item.accessorKey as keyof T] = item.header;
    return acc;
  }, {} as MTableLabelMap<T>);

  return (
    <div>
      {data.map((it, index) => (
        <div
          className={styles.mTableItem}
          key={it[idKey]?.toString() || `${String(idKey)}-${index}`}
          onClick={(e) => onRowClick?.(it, e)}>
          {title && <div className={styles.mTableItemTitle}>{title(it)}</div>}
          {customRow ? (
            customRow(it)
          ) : (
            <MTableItem
              data={it}
              labelMap={labelMap}
              idKey={idKey}
              excludes={excludes}
              customLabel={customLabel}
              customContent={customContent}
            />
          )}
        </div>
      ))}
    </div>
  );
}
