import type { FC } from 'react';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Label } from '../Label';
import { Spinner } from '../Spinner';
import styles from './FileItem.module.css';
import type { FileItemProps } from './FileItem.type';

export const FileItem: FC<FileItemProps> = ({
  name,
  size = 0,
  status,
  showDownload,
  className,
  maxWidth,
  onDownload,
  onRemove,
}) => {
  const rawSizeMB = size / (1024 * 1024);
  const fileSizeMB = Number.isInteger(rawSizeMB)
    ? rawSizeMB.toFixed(0)
    : Number(rawSizeMB ?? 0).toFixed(2);

  const isReadOnly = !status && showDownload;

  return (
    <div className={`${styles.fileItem} ${className}`} style={{ maxWidth }}>
      <div className={styles.fileItemHeader}>
        <Label id={`file-name-${name}`} size='s' className={styles.fileNameLabel}>
          {name} ({fileSizeMB}MB)
        </Label>

        {status === 'uploading' && <Spinner />}

        {isReadOnly && (
          <div className={styles.buttonGroup}>
            {showDownload && (
              <Button
                label='다운로드'
                variant='text'
                useIcon
                iconPosition='right'
                icon={<Icon icon='Download' size={20} viewBox='0 0 24 24' />}
                className={styles.viewButton}
                onClick={onDownload}
              />
            )}
          </div>
        )}

        {status === 'success' && (
          <Button
            variant='text'
            label='삭제'
            height='auto'
            useIcon
            icon={<Icon icon='Delete' size={16} viewBox='0 0 16 16' />}
            iconPosition='right'
            className={styles.deleteButton}
            onClick={onRemove}
            width='fit-content'
          />
        )}
      </div>
    </div>
  );
};
