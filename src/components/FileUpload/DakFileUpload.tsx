/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <explanation> */
/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
import { ChangeEvent, DragEvent, useCallback, useRef, useState } from 'react';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Label } from '../Label';
import * as styles from './DakFileUpload.module.css';
import { DakFileItem, DakFileUploadProps, FileValidationResult } from './DakFileUpload.type';


export const DakFileUpload = ({
  value = [],
  onChange,
  accept,
  maxFiles = 10, // 기본값 10개로 설정
  maxSize = 10 * 1024 * 1024, // 기본 10MB
  maxTotalSize,
  multiple = true,
  disabled = false,
  placeholder = '파일을 드래그하거나 클릭하여 업로드하세요',
  showPreview = true,
  showFileSize = true,
  usePreview = false,
  enableDownload = false,
  onServerFileDownload,
  onError,
  className,
}: DakFileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  // 파일 크기를 읽기 쉬운 형태로 변환
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes[i];
  };

  // 파일 확장자 검증
  const validateFileType = (file: File): boolean => {
    if (!accept) return true;

    const acceptedTypes = accept.split(',').map((type) => type.trim());

    return acceptedTypes.some((acceptedType) => {
      if (acceptedType.startsWith('.')) {
        // 확장자로 검증
        return file.name.toLowerCase().endsWith(acceptedType.toLowerCase());
      } else if (acceptedType.includes('*')) {
        // MIME 타입 패턴으로 검증 (예: image/*)
        const [mainType] = acceptedType.split('/');
        const [fileMainType] = file.type.split('/');
        return mainType === fileMainType;
      } else {
        // 정확한 MIME 타입으로 검증
        return file.type === acceptedType;
      }
    });
  };

  // 파일 유효성 검증
  const validateFiles = (files: File[]): FileValidationResult => {
    const errors: string[] = [];
    const currentFileCount = value.length;

    // 파일 개수 검증
    if (maxFiles && currentFileCount + files.length > maxFiles) {
      errors.push(`최대 ${maxFiles}개의 파일만 업로드 가능합니다.`);
    }

    // 각 파일 검증
    files.forEach((file) => {
      // 파일 크기 검증
      if (file.size > maxSize) {
        errors.push(`${file.name}: 파일 크기가 ${formatFileSize(maxSize)}를 초과합니다.`);
      }

      // 파일 타입 검증
      if (!validateFileType(file)) {
        errors.push(`${file.name}: 지원하지 않는 파일 형식입니다.`);
      }
    });

    // 전체 파일 크기 검증
    if (maxTotalSize) {
      const currentTotalSize = value.reduce((total, item) => total + item.size, 0);
      const newTotalSize = files.reduce((total, file) => total + file.size, 0);

      if (currentTotalSize + newTotalSize > maxTotalSize) {
        errors.push(`전체 파일 크기가 ${formatFileSize(maxTotalSize)}를 초과합니다.`);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  };

  // File을 FileItem으로 변환
  const fileToFileItem = (file: File): DakFileItem => ({
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name: file.name,
    size: file.size,
    type: 'local',
    file,
  });

  // 파일 추가 처리
  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || disabled) return;

      const fileArray = Array.from(files);
      const validation = validateFiles(fileArray);

      if (!validation.valid) {
        setErrors(validation.errors);
        onError?.(validation.errors);
        return;
      }

      setErrors([]);
      const newFileItems = fileArray.map(fileToFileItem);
      const updatedFiles = [...value, ...newFileItems];

      onChange(updatedFiles);
    },
    [value, onChange, disabled, maxFiles, maxSize, maxTotalSize, accept, onError],
  );

  // 파일 선택 처리
  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    handleFiles(event.target.files);
    // input 값 리셋 (같은 파일 재선택 가능하도록)
    if (event.target) {
      event.target.value = '';
    }
  };

  // 드래그 이벤트 처리
  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (disabled) return;

    handleFiles(e.dataTransfer.files);
  };

  // 파일 삭제
  const handleRemoveFile = (fileId: string) => {
    const updatedFiles = value.filter((file) => file.id !== fileId);
    onChange(updatedFiles);
    setErrors([]); // 파일 제거 시 에러 초기화
  };

  // 파일 다운로드
  const handleFileDownload = (fileItem: DakFileItem) => {
    if (fileItem.type === 'server') {
      onServerFileDownload?.(fileItem.fileId!, fileItem.name);
    } else if (fileItem.file) {
      // 로컬 파일 다운로드
      const url = URL.createObjectURL(fileItem.file);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileItem.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  // 업로드 영역 클릭
  const handleUploadAreaClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  // 이미지 파일 여부 확인
  const isImageFile = (fileName: string): boolean => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
    const extension = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));
    return imageExtensions.includes(extension);
  };

  // 이미지 미리보기 URL 생성
  const getPreviewUrl = (fileItem: DakFileItem): string | null => {
    if (fileItem.type === 'local' && fileItem.file && isImageFile(fileItem.name)) {
      return URL.createObjectURL(fileItem.file);
    }
    return null;
  };

  return (
    <div className={`${styles.container} ${className || ''}`}>
      {/* 파일 업로드 영역 */}
      <div
        className={`${styles.uploadArea} ${
          dragActive ? styles.dragActive : ''
        } ${disabled ? styles.disabled : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleUploadAreaClick}>
        <Label id={`file-upload-info`} size='s' color='gray-60' className={styles.infoLabel}>
          첨부할 파일을 여기에 끌어다 놓거나, 파일 선택 버튼을 직접 선택해주세요.
        </Label>
        <div className={styles.uploadText}>{placeholder}</div>
        <div>
          <Button
            label={'파일선택'}
            variant='secondary'
            size='s'
            width={'96px'}
            icon={<Icon icon='Upload' size={24} color='#0B50D0' />}
          />
        </div>
      </div>

      {/* 숨겨진 파일 input */}
      <input
        ref={fileInputRef}
        type='file'
        className={styles.hiddenInput}
        accept={accept}
        multiple={multiple}
        onChange={handleFileSelect}
        disabled={disabled}
      />

      {/* 파일 카운터 */}
      {value.length > 0 && (
        <div className={styles.fileCounter}>
          <span className={styles.fileCount}>{value.length}개</span>/<span>{maxFiles}개</span>
        </div>
      )}

      {/* 에러 메시지 */}
      {errors.length > 0 && (
        <div className={styles.errors}>
          {errors.map((error, index) => (
            <div key={index} className={styles.error}>
              {error}
            </div>
          ))}
        </div>
      )}

      {/* 파일 목록 */}
      {value.length > 0 && (
        <div className={styles.fileList}>
          {value.map((fileItem) => {
            const previewUrl = showPreview ? getPreviewUrl(fileItem) : null;

            return (
              <div key={fileItem.id} className={styles.fileItem}>
                <div className={styles.filePreview}>
                  {/* 미리보기 이미지 */}
                  {usePreview && previewUrl && (
                    <img
                      src={previewUrl}
                      alt={fileItem.name}
                      className={styles.preview}
                      onLoad={() => {
                        if (fileItem.type === 'local' && previewUrl.startsWith('blob:')) {
                          // URL.revokeObjectURL(previewUrl); // 필요시 메모리 정리
                        }
                      }}
                    />
                  )}

                  {/* 파일 정보 */}
                  <div className={styles.fileInfo}>
                    <div
                      className={`${styles.fileName} ${enableDownload ? styles.downloadable : ''}`}
                      onClick={enableDownload ? () => handleFileDownload(fileItem) : undefined}
                      title={enableDownload ? '클릭하여 다운로드' : undefined}>
                      {fileItem.name}
                    </div>
                    {showFileSize && (
                      <div className={styles.fileSize}>({formatFileSize(fileItem.size)})</div>
                    )}
                  </div>
                </div>

                {/* 파일 액션 */}
                <Button
                  variant='text'
                  label='삭제'
                  height='auto'
                  icon={<Icon icon='DeleteIcon' size={16} viewBox='0 0 16 16' />}
                  iconPosition='right'
                  className={styles.deleteButton}
                  disabled={disabled}
                  onClick={() => handleRemoveFile(fileItem.id)}
                  width='fit-content'
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
