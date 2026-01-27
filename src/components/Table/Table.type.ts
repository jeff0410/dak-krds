import type { CSSProperties, MouseEvent, ReactNode } from 'react';
import type {
  MRT_ColumnDef,
  MRT_Row,
  MRT_RowData,
  MRT_SortingState,
  MRT_TableOptions,
} from 'material-react-table';

export interface TableRowData extends MRT_RowData {
  [key: string]: any;
}

export interface TableProps<T extends TableRowData> {
  columns: MRT_ColumnDef<T>[];
  data: T[];
  sorting?: MRT_SortingState;
  setSorting?: (sorting: MRT_SortingState) => void;
  height?: string;
  noData?: string | ReactNode;
  allowOverflow?: boolean;
  enableStickyHeader?: boolean;
  activeKey?: keyof T;
  draggable?: boolean;
  onDrop?: (dragRowIndex: number, dropRowIndex: number) => void;
  dragHandlePosition?: 'left' | 'right';
  customDropColumnOption?: Partial<MRT_ColumnDef<T>>;
  customRowStyle?: CSSProperties;
  customHeaderStyle?: CSSProperties;
  customRowStyleAction?: (row: MRT_Row<T>) => CSSProperties;
  customTableOption?: Partial<MRT_TableOptions<T>>;
  onRowClick?: (row: MRT_Row<T>, e?: MouseEvent<HTMLTableRowElement>) => void;
  //hover
  useHover?: boolean;
  // 어코디언 관련 props
  enableAccordion?: boolean;
  accordionContent?: (row: MRT_Row<T>) => ReactNode;
  defaultExpanded?: boolean;
  expandedRows?: Set<number>;
  onExpandedRowsChange?: (expandedRows: Set<number>) => void;
  accordionToggleColumnKey?: string;
  fontSize?: string;
  caption?: ReactNode;
}

export interface TableRowWithIconProps {
  prefix?: ReactNode;
  suffix?: ReactNode;
  children: ReactNode;
  allowOverflow?: boolean;
  lineClamp?: number;
}
