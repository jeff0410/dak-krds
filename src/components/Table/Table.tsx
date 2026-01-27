/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Icon } from '../Icon';
import * as styles from './Table.module.css';
import type { TableProps, TableRowWithIconProps } from './Table.type';
import {
  type MRT_ColumnDef,
  type MRT_RowData,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

export function TableRowWithIcon({
  prefix,
  suffix,
  children,
  allowOverflow,
}: TableRowWithIconProps) {
  return (
    <div className={styles.rowWithIcon}>
      {prefix && <div style={{ flexShrink: 0 }}>{prefix}</div>}
      <div className={[styles.rowWithIconContent, allowOverflow && styles.allowOverflow].join(' ')}>
        {children}
      </div>
      {suffix && <div style={{ flexShrink: 0 }}>{suffix}</div>}
    </div>
  );
}

export function Table<T extends MRT_RowData>({
  columns,
  data,
  sorting,
  setSorting,
  height = 'auto',
  noData = '조회된 결과가 없습니다.',
  allowOverflow = false,
  enableStickyHeader = true,
  activeKey,
  draggable = false,
  onDrop,
  customDropColumnOption,
  accordionToggleColumnKey,
  customRowStyle,
  customHeaderStyle,
  customRowStyleAction,
  dragHandlePosition = 'left',
  customTableOption,
  onRowClick,
  enableAccordion,
  accordionContent,
  fontSize = '17px',
  useHover = true,
  caption,
}: TableProps<T>) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragImage, setDragImage] = useState<HTMLElement | null>(null);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (dragImage) {
        const rect = dragImage.getBoundingClientRect();
        dragImage.style.left = `${e.pageX - (dragHandlePosition === 'right' ? rect.width : -5)}px`;
        dragImage.style.top = `${e.pageY}px`;
      }
    },
    [dragHandlePosition, dragImage],
  );

  useEffect(() => {
    document.addEventListener('drag', onMouseMove);
    return () => document.removeEventListener('drag', onMouseMove);
  }, [onMouseMove]);

  const removeDropImage = () => {
    dragImage?.parentElement?.removeChild(dragImage);
    setDragImage(null);
  };

  const dragHandleColumn = () =>
    ({
      accessorKey: 'draggable',
      header: '',
      Header: () => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon icon={'Menu'} size={20} viewBox={'0 0 20 20'} />
        </div>
      ),
      Cell: ({ row }) => (
        <div
          draggable={true}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'grab',
          }}
          onDragStart={async (e) => {
            const rowIndex = row.index;

            setDraggedIndex(rowIndex);
            const rowTr = e.currentTarget.closest('tr') as HTMLElement;
            if (rowTr) {
              const ghostWrapper = document.createElement('div');
              const clone = rowTr.cloneNode(true) as HTMLElement;
              const table = document.createElement('table');
              const tbody = document.createElement('tbody');

              tbody.appendChild(clone);
              table.appendChild(tbody);
              ghostWrapper.appendChild(table);

              Object.assign(ghostWrapper.style, {
                width: `${rowTr.offsetWidth}px`,
                height: `${rowTr.offsetHeight}px`,
                position: 'absolute',
                top: '-9999px',
                left: '-9999px',
                border: '2px solid var(--krds-color-information-5)',
                pointerEvent: 'none',
                zIndex: 999,
              });

              table.style.borderCollapse = 'collapse';
              table.style.width = '100%';
              clone.style.backgroundColor = 'var(--krds-color-information-5)';

              document.body.appendChild(ghostWrapper);
              setDragImage(ghostWrapper);

              const hidden = document.getElementById('hidden');
              if (hidden) e.dataTransfer.setDragImage(hidden, 0, 0);
            }
          }}>
          <Icon icon={'Menu'} size={20} viewBox={'0 0 20 20'} />
        </div>
      ),
      enableSorting: false,
      size: 52,
      ...customDropColumnOption,
    }) as MRT_ColumnDef<T>;

  const draggableColumns = [
    ...(dragHandlePosition === 'left' ? [dragHandleColumn()] : []),
    ...columns,
    ...(dragHandlePosition === 'right' ? [dragHandleColumn()] : []),
  ];

  // columns 수정 로직 개선
  const modifiedColumns = useMemo(() => {
    if (!enableAccordion || !accordionToggleColumnKey) {
      return draggable ? draggableColumns : columns;
    }

    const targetColumns = draggable ? draggableColumns : columns;

    return targetColumns.map((column) => {
      if (
        column.accessorKey === accordionToggleColumnKey ||
        column.id === accordionToggleColumnKey
      ) {
        return {
          ...column,
          Cell: ({ row, cell, column: col, renderedCellValue, ...restProps }: any) => {
            // 기존 Cell 렌더러가 있는지 확인
            const originalCell = column.Cell;
            const cellContent = originalCell
              ? originalCell({ row, cell, column: col, renderedCellValue, table, ...restProps })
              : cell.getValue();

            return (
              <div className={styles.toggleColumnStyle} key={row.id}>
                {/* 기존 셀 내용 유지 */}
                <div className={styles.toggleColumnLabel}>{cellContent}</div>
                {/* 토글 아이콘 */}
                <div className={styles.toggleColumnIcon}>
                  <Icon
                    icon={row.getIsExpanded() ? 'ArrowUp' : 'ArrowDown'}
                    size={20}
                    style={{
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease',
                      flexShrink: 0, // 아이콘 크기 고정
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      row.toggleExpanded();
                    }}
                  />
                </div>
              </div>
            );
          },
        };
      }
      return column;
    });
  }, [columns, draggableColumns, draggable, enableAccordion, accordionToggleColumnKey]);

  const table = useMaterialReactTable({
    columns: modifiedColumns,
    data,
    enableStickyHeader,
    //다중 솔팅 관련 옵션 활성화
    manualSorting: true,
    enableMultiSort: true,
    isMultiSortEvent: () => true,
    ...(sorting &&
      setSorting && {
        state: { sorting },
        onSortingChange: (updater) =>
          setSorting(typeof updater === 'function' ? updater(sorting) : updater),
      }),

    //툴바 및 보조도구 비활성화
    enableTopToolbar: false,
    enableBottomToolbar: false,
    enableColumnActions: false,
    enableColumnFilters: false,

    // 테이블 스타일
    muiTablePaperProps: {
      sx: {
        boxShadow: 'none',
        borderRadius: 0,
        border: 'none',
        outline: 'none',
        height: height,
        display: 'flex',
        flexDirection: 'column',
        '& caption': {
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
        },
      },
    },
    muiTableContainerProps: {
      className: styles.tableContainer,
      sx: {
        height: height === '100%' ? '100%' : height,
        maxHeight: height === '100%' ? '100%' : height,
        overflowY: 'auto',
        overflowX: 'auto',
        flex: height === '100%' ? 1 : 'none',
      },
    },

    // 헤더 스타일
    muiTableHeadCellProps: {
      tabIndex: -1,
      sx: {
        backgroundColor: 'var(--krds-color-secondary-5)',
        color: 'var(--krds-color-gray-90)',
        fontWeight: 'bold',
        fontSize,
        lineHeight: '24px',
        '& .MuiBadge-badge': {
          display: 'none',
        },
        borderBottom: '1px solid var(--krds-color-secondary-20)',
        borderTop: '1px solid var(--krds-color-secondary-20)',
        boxShadow: 'none',
        fontFamily: 'Pretendard GOV',
        boxSizing: 'border-box',
        padding: '8px 0 !important',

        // sticky 헤더 강화
        position: enableStickyHeader ? 'sticky' : 'static',
        top: 0,
        zIndex: enableStickyHeader ? 10 : 'auto',

        ...customHeaderStyle,
      },
      align: 'center',
    },

    // 바디 스,타일
    muiTableBodyCellProps: ({ column, row }) => {
      return {
        tabIndex: -1,
        sx: {
          cursor: useHover ? 'pointer' : 'default',
          width: column.getSize(),
          maxWidth: column.getSize(),
          height: '72px',
          flexGrow: 1,
          minWidth: 0,
          overflow: allowOverflow ? 'visible' : 'hidden',
          whiteSpace: allowOverflow ? 'wrap' : 'nowrap',
          textOverflow: allowOverflow ? 'unset' : 'ellipsis',
          wordBreak: allowOverflow ? 'break-word' : 'keep-all',
          color: 'var(--krds-color-gray-90)',
          fontWeight: 400,
          fontSize,
          lineHeight: '26px',
          boxSizing: 'border-box',
          borderBottom: '1px solid var(--krds-color-gray-20)',
          padding: '10px 16px !important',
          fontFamily: 'Pretendard GOV',
          backgroundColor: `${activeKey && row.original[activeKey] ? 'var(--krds-color-information-5)' : 'transparent'} !important`,
          '::after': {
            backgroundColor: `${activeKey && row.original[activeKey] ? 'var(--krds-color-information-5)' : 'var(--krds-color-gray-5)'} !important`,
          },
          ...customRowStyle,
          ...customRowStyleAction?.(row),
        },
        align: 'center',
      };
    },
    // sort 아이콘
    icons: {
      ArrowDownwardIcon: (props: { className: string }) => {
        const isDesc = props.className?.includes('iconDirectionDesc');
        return (
          <Icon
            role={'button'}
            aria-label={isDesc ? '오름차순 정렬' : '정렬 해제'}
            icon='ArrowSortDown'
            size={16}
            viewBox={'0 0 20 20'}
            style={{ margin: 0, padding: '0 2px' }}
            className={[props.className, styles.sortIcon].join(' ')}
          />
        );
      },
      SyncAltIcon: () => (
        <Icon
          role={'button'}
          aria-label={'오름차순 정렬'}
          icon='ArrowSortBothActive'
          size={20}
          viewBox={'0 0 24 24'}
          style={{ margin: 0, paddingLeft: '4 px' }}
        />
      ),
    },

    // tooltip 비활성화
    localization: {
      sortByColumnAsc: '',
      sortByColumnDesc: '',
      sortedByColumnAsc: '',
      sortedByColumnDesc: '',
      noRecordsToDisplay: String(noData),
    },

    renderEmptyRowsFallback: () => <div className={styles.emptyTable}>{noData}</div>,
    muiTableBodyRowProps: ({ row }) => ({
      className: styles.tableRow,
      'data-index': row.index,
      draggable: false,
      onDrop: (e) => {
        e.preventDefault();
        if (draggedIndex != null) {
          onDrop?.(draggedIndex, row.index);
          setDraggedIndex(null);
        }
        removeDropImage();
      },
      onClick: (e) => {
        // accordionToggleColumnKey가 설정된 경우 행 클릭으로는 토글하지 않음
        onRowClick?.(row, e);
        if (enableAccordion && !accordionToggleColumnKey) {
          row.toggleExpanded();
        }
      },
    }),
    enablePagination: false,
    enableExpanding: enableAccordion,
    renderDetailPanel: accordionContent ? ({ row }) => accordionContent(row) : undefined,

    // expand 컬럼을 완전히 숨기기
    displayColumnDefOptions: {
      'mrt-row-expand': {
        size: 0,
        minSize: 0,
        maxSize: 0,
        // 컬럼을 완전히 숨김
        muiTableHeadCellProps: {
          sx: {
            display: 'none',
          },
        },
        muiTableBodyCellProps: {
          sx: {
            display: 'none',
          },
        },
      },
    },
    muiDetailPanelProps: () => ({
      sx: {
        backgroundColor: 'var(--krds-color-gray-20)',
      },
    }),
    renderCaption: () => <div className={''}>{caption}</div>,
    ...customTableOption,
  });

  return (
    <div
      style={{
        position: 'relative',
        height: height, // 최외곽 div에도 높이 적용
        display: 'flex',
        flexDirection: 'column',
      }}>
      <MaterialReactTable table={table} />
      <div id={'hidden'} style={{ display: 'none' }} />
    </div>
  );
}
