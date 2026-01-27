type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'teriary'
  | 'text'
  | 'gray'
  | 'danger'
  | 'danger-secondary'
  | 'black'
  | 'success'
  | 'success-secondary'
  | 'warning'
  | 'outline'
  | 'transparent'
  | 'custom';

export interface FileButtonUploadProps {
  /** 버튼 라벨 텍스트 */
  label?: string;

  // 버튼 variant
  variant?: ButtonColor;

  /** 허용된 파일 확장자 (예: 'image/png,image/jpg') */
  accept?: string;

  /** 최대 업로드 파일 용량 (MB 단위) */
  maxSizeMB?: number;

  /** 최대 업로드 파일 개수 (기본값: 1) */
  maxFiles: number;

  /** 선택된 파일 정보 (1개만 사용 시) */
  value?: File[];

  initialFileName?: string

  /** 파일 변경 핸들러 */
  onChange: (files: File[]) => void;

  /** 설명 텍스트 최대 4개까지 */
  subDescription: string[];

  /** 권장 이미지 크기 (예: '282 × 388') */
  recommendedSize?: string;

  /** 보조 텍스트*/
  helpText?: string[];

  useIcon?: boolean;
}
