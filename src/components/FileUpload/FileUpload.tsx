import type React from 'react';
import { useRef, useState } from 'react';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Label } from '../Label';
import { FileItem } from './FileItem';
import * as styles from './FileUpload.module.css';
import type { FileObject, FileUploadComponentProps } from './FileUpload.type';
import { useFileuploadAlertModal } from './use-fileupload-alert-modal';

export const FileUpload: React.FC<FileUploadComponentProps> = ({
  title,
  description,
  subDescription,
  maxFiles = 3,
  onUpload,
  onRemove,
  onChange,
  maxFileSize = 1 * 1024 * 1024, // 1MB
  accept,
  compactDisplay,
  showCountLabel = true,
  fileList,
  maxWidth = '75rem',
}) => {
  const { showAlertModal } = useFileuploadAlertModal();
  const [files, setFiles] = useState<FileObject[]>(fileList || []);
  const [, setIsDragActive] = useState(false);
  const fileInputRef = useRef<globalThis.HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const updateFiles = (newFiles: FileObject[]) => {
    setFiles(newFiles);
    onChange?.(newFiles);
  };

  const handleFiles = async (newFiles: FileList) => {
    const filesArray = Array.from(newFiles);
    // [단일 파일 업로드 처리]
    if (maxFiles === 1) {
      if (filesArray.length > 1) {
        showAlertModal('maxFiles', { maxFiles });
        return;
      }

      const file = filesArray[0];

      if (file.size >= maxFileSize) {
        const maxSizeMB = Math.floor(maxFileSize / 1024 / 1024);
        showAlertModal('maxFileSize', { maxSizeMB });
        return;
      }

      const newFile: FileObject = {
        file,
        name: file.name,
        size: file.size,
        status: 'uploading',
      };

      updateFiles([newFile]);

      updateFiles([
        {
          ...newFile,
          status: 'success',
        },
      ]);
      return;
    }

    // [다중 파일 업로드 처리]
    const totalCount = files.length + filesArray.length;
    const remainingSlots = maxFiles - files.length;

    let slicedFiles = filesArray;

    if (totalCount > maxFiles) {
      showAlertModal('maxFiles', { maxFiles });
      slicedFiles = filesArray.slice(0, remainingSlots);
    }

    const validFiles: FileObject[] = [];
    let oversizedCount = 0;

    for (const file of slicedFiles) {
      if (file.size >= maxFileSize) {
        oversizedCount++;
        continue;
      }
      validFiles.push({
        file,
        name: file.name,
        size: file.size,
        status: 'uploading',
      });
    }

    if (oversizedCount > 0) {
      const maxSizeMB = Math.floor(maxFileSize / 1024 / 1024);
      showAlertModal('maxFileSize', { maxSizeMB });
    }

    const initialFiles = [...files, ...validFiles];
    updateFiles(initialFiles);

    const updatedFiles = [...initialFiles];

    for (const fileData of validFiles) {
      await onUpload(fileData.file);
      const index = updatedFiles.findIndex((f) => f.name === fileData.name);
      if (index !== -1) {
        updatedFiles[index] = {
          ...updatedFiles[index],
          status: 'success',
        };
      }
    }

    updateFiles(updatedFiles);
  };

  const removeFile = (fileName: string) => {
    const updated = files.filter((file) => file.name !== fileName);
    updateFiles(updated);
    onRemove(fileName);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(e.target.files);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className={styles.container} style={{ maxWidth }}>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}

      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div
        ref={dropZoneRef}
        onDragEnter={(e) => {
          e.preventDefault();
          setIsDragActive(true);
        }}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={(e) => {
          if (e.target === dropZoneRef.current) setIsDragActive(false);
        }}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={styles.dropZone}
        style={{ maxWidth }}>
        <input
          type='file'
          ref={fileInputRef}
          onChange={handleFileInput}
          title={'파일 업로드'}
          multiple
          accept={accept}
          className={styles.hiddenInput}
        />
        <Label id={`file-upload-info`} size='s' color='gray-60' className={styles.infoLabel}>
          첨부할 파일을 여기에 끌어다 놓거나, 파일 선택 버튼을 직접 선택해주세요.
        </Label>
        {subDescription && <p className={styles.subDescription}>{subDescription}</p>}

        <Button
          label={compactDisplay && files.length > 0 ? '파일재선택' : '파일선택'}
          variant='secondary'
          size='s'
          width={compactDisplay && files.length > 0 ? '6.813rem' : '96px'}
          icon={<Icon icon='Upload' size={24} color='#0B50D0' />}
        />
      </div>

      <div className={styles.fileList} style={{ maxWidth }}>
        {showCountLabel && (
          <div className={styles.fileListHeader}>
            <Label id={`current-file-count`} size='s' className={styles.currentLabel}>
              {files.length}개
            </Label>
            <Label id={`total-file-count`} size='s' className={styles.totalLabel}>
              &nbsp;/ {maxFiles}개
            </Label>
          </div>
        )}

        {compactDisplay
          ? files.length > 0 && (
              <p className={styles.compactFileLabel}>
                {files[0].name} 외 {files.length - 1}개
              </p>
            )
          : files.map((file) => (
              <FileItem
                key={`${file.name}-${file.size}-${file.status}`}
                name={file.name}
                size={file.size}
                status={file.status}
                maxWidth={maxWidth}
                onRemove={() => removeFile(file.name)}
              />
            ))}
      </div>
    </div>
  );
};
