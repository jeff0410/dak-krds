import type { TableProps } from './Table.type';
import type { MRT_RowData } from 'material-react-table';

export interface GroupedTableProps<T extends MRT_RowData> extends Omit<TableProps<T>, 'data'> {
  data: T[];
  groupBy?: string; // 그룹화 기준 컬럼 (선택사항)
  mergeColumns?: string[]; // 병합할 컬럼들 (선택사항)
  rowSpanKey?: string; // rowSpan 정보가 들어있는 키 (기본값: '__rowSpan')
  rowHeight?: number; // 행 높이 (기본값: 57px)
  autoDetectMergeColumns?: boolean;
  groupKey?: keyof T;
}
