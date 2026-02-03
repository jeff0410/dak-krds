import type { MouseEvent, ReactElement } from 'react';
import type { TableRowData } from 'src/components/Table/Table.type';
import type { MRT_ColumnDef } from 'material-react-table';

export interface MTableProps<T extends TableRowData> {
  columns: MRT_ColumnDef<T>[];
  data: T[];
  noData?: string | ReactElement;
  onRowClick?: (row: T, e?: MouseEvent<Element>) => void;
  idKey?: keyof T;
  title?: (row: T) => ReactElement;
  excludes?: (keyof T)[];
  customLabel?: MTableRenderMap<T>;
  customContent?: MTableRenderMap<T>;
  customRow?: (row: T) => ReactElement;
}

export type MTableLabelMap<T extends TableRowData> = {
  [key in keyof T]: string;
};

export type MTableRenderMap<T extends TableRowData> = {
  [key in keyof T]: (row: T) => ReactElement;
};

export interface MTableItemProps<T extends TableRowData> {
  data: T;
  idKey?: keyof T;
  labelMap: MTableLabelMap<T>;
  excludes?: (keyof T)[];
  customLabel?: MTableRenderMap<T>;
  customContent?: MTableRenderMap<T>;
}
