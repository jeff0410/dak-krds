import { type ChangeEvent, useEffect, useRef, useState } from 'react';
import { Button } from '../Button';
import { Icon } from '../Icon';
import * as styles from './FileButtonUpload.module.css';
import type { FileButtonUploadProps } from './FileButtonUpload.type';

export const FileButtonUpload = ({
  label = '파일 선택',
  variant = 'secondary',
  accept = 'image/png,image/jpg,image/webp',
  maxSizeMB = 1,
  value = [],
  initialFileName,
  onChange,
  subDescription = [],
  maxFiles = 1,
  useIcon = false,
}: FileButtonUploadProps) => {
  const [initialFile, setInitialFile] = useState<string | null>(initialFileName ?? null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInitialFile(initialFileName ?? null);
  }, [initialFileName]);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInitialFile(null);
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files).filter((file) => file.size <= maxSizeMB * 1024 * 1024);
    const totalFiles = maxFiles === 1 ? newFiles : [...value, ...newFiles].slice(0, maxFiles);

    onChange(totalFiles);
    e.target.value = '';
  };

  const handleRemove = (index: number) => {
    const updatedFiles = [...value];
    updatedFiles.splice(index, 1);
    onChange(updatedFiles);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.uploadButtonWrapper}>
        <Button
          label={label}
          variant={variant}
          width='96px'
          height='40px'
          rounded='6px'
          type='button'
          useIcon={useIcon}
          icon={<Icon icon={'Upload'} size={16} color={'var(--krds-color-primary-60)'} />}
          onClick={handleFileClick}
        />
        <input
          ref={fileInputRef}
          type='file'
          accept={accept}
          className={styles.hiddenInput}
          onChange={handleFileChange}
          multiple={maxFiles > 1}
        />

        {/* 파일 없을 경우에만 텍스트 표시 */}
        {value.length === 0 && (!initialFileName || !initialFile) && (
          <span className='text-dak-gray-70 text-dak-t2'>선택된 파일 없음</span>
        )}
      </div>

      {/* 서브 설명 */}
      {subDescription && subDescription.length > 0 && (
        <div className={styles.descriptionWrapper}>
          <Icon icon='SystemInfo' size={22} viewBox='0 0 22 22' />
          <div className={styles.descriptionList}>
            {subDescription.slice(0, 4).map((desc, idx) => (
              <p key={idx} className={styles.description}>
                {desc}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* 파일이 있을 경우만 리스트 표시 */}
      {value.length > 0 && (
        <ul className={styles.fileList}>
          {value.map((file, index) => (
            <li key={index} className={styles.fileItem}>
              <span className='text-dak-t2'>
                {file.name} ({((file?.size ?? 0) / 1024 / 1024).toFixed(1)}MB)
              </span>
              <button
                type='button'
                onClick={() => handleRemove(index)}
                aria-label={`${file.name} 파일 삭제`}
                title={`${file.name} 파일 삭제`}
                className={styles.deleteButton}>
                <Icon icon='DeleteIcon' size={14} viewBox='0 0 14 14' />
              </button>
            </li>
          ))}
        </ul>
      )}
      {value?.length <= 0 && initialFile && (
        <ul className={styles.fileList}>
          <li className={styles.fileItem}>
            <span className='text-dak-t2'>{initialFile}</span>
            <button
              type='button'
              onClick={() => setInitialFile(null)}
              aria-label={`${initialFile} 파일 삭제`}
              title={`${initialFile} 파일 삭제`}
              className={styles.deleteButton}>
              <Icon icon='DeleteIcon' size={14} viewBox='0 0 14 14' />
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};
