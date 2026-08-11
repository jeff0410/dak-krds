import type * as React from "react";

/**
 * TextArea 컴포넌트 😸
 * 텍스트 에리어 입력 필드
 *
 * @param id - textarea의 고유 id
 * @param title - 라벨 텍스트
 * @param description - 설명 텍스트
 * @param placeholder - placeholder 텍스트
 * @param size - textarea 크기 ('s' | 'm' | 'l')
 * @param useCount - 글자 수 카운트 표시 여부
 * @param maxLength - 최대 입력 글자 수
 * @param isValid - 유효성 검사 결과
 * @param error - 에러 메시지
 * @param info - 안내 메시지
 * @param value - textarea 값
 * @param setValue - 값 변경 함수
 * @param disabled - 비활성화 여부
 * @param className - wrapper에 추가할 클래스
 * @param titleClassName - 라벨에 추가할 클래스
 * @param inputClassName - textarea에 추가할 클래스
 * @param width - textarea 전체 너비
 * @param height - textarea 높이
 * @param minHeight - textarea 최소 높이
 * @param maxHeight - textarea 최대 높이
 */

export type TextAreaProps = {
	id: string;
	title?: string;
	titlePosition?: "vertical" | "horizontal";
	gap?: string | number;
	description?: string;
	placeholder?: string;
	size?: "s" | "m" | "l";
	useCount?: boolean;
	maxLength?: number;
	isValid?: boolean;
	isRequired?: boolean;
	error?: string;
	info?: string;
	value: string;
	setValue: (value: string) => void;
	disabled?: boolean;
	className?: string;
	titleClassName?: string;
	inputClassName?: string;
	width?: string | number;
	height?: string | number;
	minHeight?: string | number;
	maxHeight?: string | number;
	 
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;
