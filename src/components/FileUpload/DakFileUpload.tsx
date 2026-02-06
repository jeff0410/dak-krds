/** biome-ignore-all lint/a11y/useKeyWithClickEvents: file upload area requires click events */
/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
/** biome-ignore-all lint/suspicious/noArrayIndexKey: error index is unique per render */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: drag and drop requires mouse events */
import type { ChangeEvent, DragEvent } from "react";
import { useCallback, useRef, useState } from "react";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { Label } from "../Label";
import styles from "./DakFileUpload.module.css";
import type {
	DakFileItem,
	DakFileUploadProps,
	FileValidationResult,
} from "./DakFileUpload.type";

export const DakFileUpload = ({
	value = [],
	onChange,
	accept,
	maxFiles = 10,
	maxSize = 10 * 1024 * 1024,
	maxTotalSize,
	multiple = true,
	disabled = false,
	placeholder = "파일을 드래그하거나 클릭하여 업로드하세요",
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

	const formatFileSize = (bytes: number): string => {
		if (bytes === 0) return "0 Bytes";
		const k = 1024;
		const sizes = ["Bytes", "KB", "MB", "GB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return `${parseFloat((bytes / k ** i)?.toFixed(2))} ${sizes[i]}`;
	};

	const validateFileType = (file: File): boolean => {
		if (!accept) return true;

		const acceptedTypes = accept.split(",").map((type) => type.trim());

		return acceptedTypes.some((acceptedType) => {
			if (acceptedType.startsWith(".")) {
				return file.name.toLowerCase().endsWith(acceptedType.toLowerCase());
			} else if (acceptedType.includes("*")) {
				const [mainType] = acceptedType.split("/");
				const [fileMainType] = file.type.split("/");
				return mainType === fileMainType;
			} else {
				return file.type === acceptedType;
			}
		});
	};

	const validateFiles = (files: File[]): FileValidationResult => {
		const errors: string[] = [];
		const currentFileCount = value.length;

		if (maxFiles && currentFileCount + files.length > maxFiles) {
			errors.push(`최대 ${maxFiles}개의 파일만 업로드 가능합니다.`);
		}

		files.forEach((file) => {
			if (file.size > maxSize) {
				errors.push(
					`${file.name}: 파일 크기가 ${formatFileSize(maxSize)}를 초과합니다.`,
				);
			}

			if (!validateFileType(file)) {
				errors.push(`${file.name}: 지원하지 않는 파일 형식입니다.`);
			}
		});

		if (maxTotalSize) {
			const currentTotalSize = value.reduce(
				(total, item) => total + item.size,
				0,
			);
			const newTotalSize = files.reduce((total, file) => total + file.size, 0);

			if (currentTotalSize + newTotalSize > maxTotalSize) {
				errors.push(
					`전체 파일 크기가 ${formatFileSize(maxTotalSize)}를 초과합니다.`,
				);
			}
		}

		return {
			valid: errors.length === 0,
			errors,
		};
	};

	const fileToFileItem = (file: File): DakFileItem => ({
		id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
		name: file.name,
		size: file.size,
		type: "local",
		file,
	});

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
		[value, onChange, disabled, onError, validateFiles, fileToFileItem],
	);

	const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
		handleFiles(event.target.files);
		if (event.target) {
			event.target.value = "";
		}
	};

	const handleDrag = (e: DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (disabled) return;

		if (e.type === "dragenter" || e.type === "dragover") {
			setDragActive(true);
		} else if (e.type === "dragleave") {
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

	const handleRemoveFile = (fileId: string) => {
		const updatedFiles = value.filter((file) => file.id !== fileId);
		onChange(updatedFiles);
		setErrors([]);
	};

	const handleFileDownload = (fileItem: DakFileItem) => {
		if (fileItem.type === "server") {
			onServerFileDownload?.(fileItem.fileId!, fileItem.name);
		} else if (fileItem.file) {
			const url = URL.createObjectURL(fileItem.file);
			const a = document.createElement("a");
			a.href = url;
			a.download = fileItem.name;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		}
	};

	const handleUploadAreaClick = () => {
		if (!disabled) {
			fileInputRef.current?.click();
		}
	};

	const isImageFile = (fileName: string): boolean => {
		const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"];
		const extension = fileName
			.toLowerCase()
			.substring(fileName.lastIndexOf("."));
		return imageExtensions.includes(extension);
	};

	const getPreviewUrl = (fileItem: DakFileItem): string | null => {
		if (
			fileItem.type === "local" &&
			fileItem.file &&
			isImageFile(fileItem.name)
		) {
			return URL.createObjectURL(fileItem.file);
		}
		return null;
	};

	return (
		<div className={`${styles.container} ${className || ""}`}>
			<div
				className={`${styles.uploadArea} ${
					dragActive ? styles.dragActive : ""
				} ${disabled ? styles.disabled : ""}`}
				onDragEnter={handleDrag}
				onDragLeave={handleDrag}
				onDragOver={handleDrag}
				onDrop={handleDrop}
				onClick={handleUploadAreaClick}
			>
				<Label
					id={`file-upload-info`}
					size="s"
					color="gray-60"
					className={styles.infoLabel}
				>
					첨부할 파일을 여기에 끌어다 놓거나, 파일 선택 버튼을 직접
					선택해주세요.
				</Label>
				<div className={styles.uploadText}>{placeholder}</div>
				<div>
					<Button
						label={"파일선택"}
						variant="secondary"
						size="s"
						width={"96px"}
						icon={<Icon icon="Upload" size={24} color="#0B50D0" />}
					/>
				</div>
			</div>

			<input
				ref={fileInputRef}
				type="file"
				className={styles.hiddenInput}
				accept={accept}
				multiple={multiple}
				onChange={handleFileSelect}
				disabled={disabled}
			/>

			{value.length > 0 && (
				<div className={styles.fileCounter}>
					<span className={styles.fileCount}>{value.length}개</span>/
					<span>{maxFiles}개</span>
				</div>
			)}

			{errors.length > 0 && (
				<div className={styles.errors}>
					{errors.map((error, index) => (
						<div key={index} className={styles.error}>
							{error}
						</div>
					))}
				</div>
			)}

			{value.length > 0 && (
				<div className={styles.fileList}>
					{value.map((fileItem) => {
						const previewUrl = showPreview ? getPreviewUrl(fileItem) : null;

						return (
							<div key={fileItem.id} className={styles.fileItem}>
								<div className={styles.filePreview}>
									{usePreview && previewUrl && (
										<img
											src={previewUrl}
											alt={fileItem.name}
											className={styles.preview}
											onLoad={() => {
												if (
													fileItem.type === "local" &&
													previewUrl.startsWith("blob:")
												) {
												}
											}}
										/>
									)}

									<div className={styles.fileInfo}>
										<div
											className={`${styles.fileName} ${enableDownload ? styles.downloadable : ""}`}
											onClick={
												enableDownload
													? () => handleFileDownload(fileItem)
													: undefined
											}
											title={enableDownload ? "클릭하여 다운로드" : undefined}
										>
											{fileItem.name}
										</div>
										{showFileSize && (
											<div className={styles.fileSize}>
												({formatFileSize(fileItem.size)})
											</div>
										)}
									</div>
								</div>

								<Button
									variant="text"
									label="삭제"
									height="auto"
									icon={<Icon icon="Delete" size={16} viewBox="0 0 16 16" />}
									iconPosition="right"
									className={styles.deleteButton}
									disabled={disabled}
									onClick={() => handleRemoveFile(fileItem.id)}
									width="fit-content"
								/>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};
