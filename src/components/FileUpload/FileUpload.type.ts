import type React from 'react';

export interface FileObject {
  file: File;
  name: string;
  size: number;
  status: 'uploading' | 'success';
  errorMessage?: string;
}

export interface FileUploadComponentProps {
  title: string;
  description?: string | React.ReactNode;
  subDescription?: string;
  maxFiles?: number;
  maxFileSize?: number;
  onUpload: (file: File) => Promise<boolean>;
  onRemove: (fileName: string) => void;
  onChange?: (files: FileObject[]) => void;
  accept?: string;
  compactDisplay?: boolean;
  showCountLabel?: boolean;
  fileList?: FileObject[];
  maxWidth?: string;
}
