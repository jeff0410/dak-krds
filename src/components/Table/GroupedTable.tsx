/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
import { useMemo } from 'react';
import type { GroupedTableProps } from './GroupedTable.type';
import { Table } from './Table';
import type { MRT_RowData } from 'material-react-table';

function detectMergeColumns<T extends MRT_RowData>(
  data: T[],
  rowSpanKey: string = '__rowSpan',
): string[] {
  if (data.length === 0) return [];

  const mergeColumns: string[] = [];
  let currentGroup: T[] = [];

  data.forEach((row) => {
    const rowSpan = (row as any)[rowSpanKey] || 0;

    if (rowSpan > 0) {
      if (currentGroup.length > 0) {
        processGroup(currentGroup, mergeColumns, rowSpanKey);
      }
      currentGroup = [row];
    } else if (currentGroup.length > 0) {
      currentGroup.push(row);
    }
  });

  if (currentGroup.length > 0) {
    processGroup(currentGroup, mergeColumns, rowSpanKey);
  }

  return mergeColumns;
}

function processGroup<T extends MRT_RowData>(
  group: T[],
  mergeColumns: string[],
  rowSpanKey: string,
): void {
  if (group.length <= 1) return;

  const firstRow = group[0];
  if (!firstRow) return;

  Object.keys(firstRow).forEach((key) => {
    if (key.startsWith('_') || key === rowSpanKey) return;

    const firstValue = firstRow[key];
    const isSameInGroup = group.every((r) => r[key] === firstValue);

    if (isSameInGroup && !mergeColumns.includes(key)) {
      mergeColumns.push(key);
    }
  });
}

// rowSpan 기반 그룹화된 데이터 처리
function processRowSpanData<T extends MRT_RowData>(
  data: T[],
  rowSpanKey: string = '__rowSpan',
): T[] {
  return data.map((row, index) => {
    const rowSpan = (row as any)[rowSpanKey] || 0;
    const nextRow = data[index + 1];
    const isLastInGroup = rowSpan === 0 && (!nextRow || (nextRow as any)[rowSpanKey] > 0);

    return {
      ...row,
      _rowSpan: rowSpan,
      _isGrouped: true,
      _groupIndex: rowSpan > 0 ? 0 : 1,
      _isLastInGroup: isLastInGroup,
    } as T;
  });
}

export function GroupedTable<T extends MRT_RowData>({
  columns,
  data,
  groupBy,
  mergeColumns,
  rowSpanKey = '__rowSpan',
  rowHeight = 57,
  autoDetectMergeColumns = true,
  ...tableProps
}: GroupedTableProps<T>) {
  const detectedMergeColumns = useMemo(() => {
    if (mergeColumns) return mergeColumns;
    if (!autoDetectMergeColumns) return [];

    if (rowSpanKey && data.length > 0 && (data[0] as any)[rowSpanKey] !== undefined) {
      return detectMergeColumns(data, rowSpanKey);
    }

    return [];
  }, [data, mergeColumns, rowSpanKey, autoDetectMergeColumns]);

  const processedData = useMemo(() => {
    if (rowSpanKey && data.length > 0 && (data[0] as any)[rowSpanKey] !== undefined) {
      return processRowSpanData(data, rowSpanKey);
    }

    return data;
  }, [data, detectedMergeColumns, rowSpanKey]);

  const processedColumns = useMemo(() => {
    if (detectedMergeColumns.length === 0) return columns;

    return columns.map((column) => {
      const accessorKey = typeof column.accessorKey === 'string' ? column.accessorKey : '';

      if (detectedMergeColumns.includes(accessorKey)) {
        return {
          ...column,
          Cell: (props: any) => {
            const { cell } = props;
            const value = cell.getValue();
            const original = props.row.original as T & {
              _rowSpan?: number;
              _isGrouped?: boolean;
            };
            const rowSpan = original._rowSpan || 0;
            const isGrouped = original._isGrouped;

            // 병합된 행의 경우 렌더링하지 않음
            if (isGrouped && rowSpan === 0) {
              return null;
            }

            // 병합 대상 셀의 경우 세로 중앙 정렬
            if (isGrouped && rowSpan > 0) {
              return (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                  }}>
                  {column.Cell ? column.Cell(props) : value}
                </div>
              );
            }

            return column.Cell ? column.Cell(props) : value;
          },
        };
      }

      return column;
    });
  }, [columns, detectedMergeColumns]);

  return (
    <Table
      {...tableProps}
      columns={processedColumns}
      data={processedData}
      customTableOption={{
        ...tableProps.customTableOption,
        muiTableBodyRowProps: (params) => {
          const existingProps = tableProps.customTableOption?.muiTableBodyRowProps;
          const baseProps =
            typeof existingProps === 'function' ? existingProps(params) : existingProps || {};

          const original = params.row.original as T & {
            _rowSpan?: number;
            _isGrouped?: boolean;
            _isLastInGroup?: boolean;
          };
          const rowSpan = original._rowSpan || 0;
          const isGrouped = original._isGrouped;
          const isLastInGroup = original._isLastInGroup;

          return {
            ...baseProps,
            sx: {
              ...baseProps.sx,
              height: `${rowHeight}px`,
              minHeight: `${rowHeight}px`,

              ...(isGrouped &&
                rowSpan === 0 && {
                  height: '0px !important',
                  '& td': {
                    height: '0px !important',
                    padding: '0px !important',
                    borderBottom: 'none !important',
                    lineHeight: '0px',
                    overflow: 'hidden',
                  },
                }),
              ...(isLastInGroup && {
                '& td': {
                  borderBottom: '1px solid var(--krds-color-gray-20) !important',
                },
              }),
            },
          };
        },
        muiTableBodyCellProps: (params) => {
          const { cell, row } = params;
          const existingProps = tableProps.customTableOption?.muiTableBodyCellProps;
          const baseProps =
            typeof existingProps === 'function' ? existingProps(params) : existingProps || {};

          const accessorKey =
            typeof cell.column.columnDef.accessorKey === 'string'
              ? cell.column.columnDef.accessorKey
              : '';
          const original = row.original as T & {
            _rowSpan?: number;
            _isGrouped?: boolean;
          };
          const rowSpan = original._rowSpan || 0;
          const isGrouped = original._isGrouped;
          const isMergeColumn = detectedMergeColumns.includes(accessorKey);

          if (isGrouped && isMergeColumn && rowSpan > 1) {
            return {
              ...baseProps,
              rowSpan: rowSpan,
              sx: {
                ...baseProps.sx,
                verticalAlign: 'middle',
                textAlign: 'center',
              },
            };
          }

          if (isGrouped && isMergeColumn && rowSpan === 0) {
            return {
              ...baseProps,
              sx: {
                ...baseProps.sx,
                display: 'none',
                padding: '0px',
                height: '0px',
                borderBottom: 'none',
              },
            };
          }

          return baseProps;
        },

        muiTableContainerProps: {
          sx: {
            '& .MuiTable-root': {
              borderCollapse: 'separate',
              borderSpacing: 0,
            },
            '& .MuiTableCell-root': {
              borderBottom: '1px solid var(--krds-color-gray-20)',
              textAlign: 'center',
            },
          },
        },
      }}
    />
  );
}
