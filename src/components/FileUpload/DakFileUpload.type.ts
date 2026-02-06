export interface DakFileItem {
	id: string;
	name: string;
	size: number;
	type: "local" | "server";
	file?: File; // 로컬 파일인 경우
	fileId?: string; // 서버 파일인 경우
	url?: string; // 서버 파일 다운로드 URL (선택사항)
}

export interface DakFileUploadProps {
	// 파일 목록 관리
	value?: DakFileItem[];
	onChange: (files: DakFileItem[]) => void;

	// 업로드 제한 설정
	accept?: string; // 허용 확장자 (예: "image/*", ".pdf,.doc,.docx", "image/jpeg,image/png")
	maxFiles?: number; // 최대 파일 개수 (기본: 10개)
	maxSize?: number; // 파일 최대 크기 (bytes, 기본: 10MB)
	maxTotalSize?: number; // 전체 파일 최대 크기 (bytes)
	multiple?: boolean; // 다중 선택 허용 (기본: true)

	// UI 옵션
	disabled?: boolean;
	placeholder?: string; // 업로드 영역 안내 텍스트
	showPreview?: boolean; // 이미지 미리보기 표시 (기본: true)
	showFileSize?: boolean; // 파일 크기 표시 (기본: true)
	usePreview?: boolean;
	enableDownload?: boolean; // 파일 다운로드 기능 사용 여부 (기본: true)

	// 이벤트 핸들러
	onServerFileDownload?: (fileId: string, fileName: string) => void;
	onError?: (errors: string[]) => void; // 에러 발생 시 콜백

	// 커스텀 클래스
	className?: string;
}

export interface FileValidationResult {
	valid: boolean;
	errors: string[];
}
