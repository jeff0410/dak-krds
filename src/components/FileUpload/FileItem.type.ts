export type FileStatus = "uploading" | "success";

export interface FileObject {
	file: File;
	name: string;
	size: number;
	status: FileStatus;
}

export interface FileItemProps {
	name: string;
	size?: number;
	status?: "uploading" | "success";
	className?: string;
	maxWidth?: string;

	showDownload?: boolean;
	showPreview?: boolean;

	onDownload?: () => void;
	onRemove?: () => void;
}
