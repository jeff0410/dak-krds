import type * as React from "react";

/**
 * TextInput 컴포넌트 😸
 * 텍스트 입력 필드
 *
 * @param id - input의 고유 id
 * @param type - input 타입 (text, password 등)
 * @param title - 라벨 텍스트
 * @param titlePosition - 라벨 위치 ('vertical' | 'horizontal')
 * @param gap - 라벨과 input 사이의 간격
 * @param description - 설명 텍스트
 * @param isValid - 유효성 검사 결과
 * @param isRequired - 필수 입력 여부
 * @param error - 에러 메시지
 * @param placeholder - placeholder 텍스트
 * @param width - input 전체 너비
 * @param height - input 높이
 * @param minHeight - input 최소 높이
 * @param maxHeight - input 최대 높이
 * @param className - wrapper에 추가할 클래스
 * @param titleClassName - 라벨에 추가할 클래스
 * @param inputClassName - input에 추가할 클래스
 * @param value - input 값
 * @param setValue - 값 변경 함수
 * @param onEnterKeyPress - 엔터키 입력 시 콜백
 * @param useIcon - 아이콘 사용 여부
 * @param icon - 커스텀 아이콘 컴포넌트
 * @param iconPosition - 아이콘 위치 ('left' | 'right')
 * @param useDelete - 삭제(X) 버튼 사용 여부
 * @param deleteAction - 삭제 버튼 클릭 시 콜백
 * @param disabled - 비활성화 여부
 * @param ...props - 기타 input props
 */

export type TextInputProps = {
	id: string;
	type?: "text" | "password";
	title?: string;
	titlePosition?: "vertical" | "horizontal";
	gap?: string | number;
	description?: string;
	isValid?: boolean;
	isRequired?: boolean;
	error?: string;
	info?: string;
	placeholder?: string;
	className?: string;
	titleClassName?: string;
	inputClassName?: string;
	width?: string | number;
	height?: "40px" | "48px" | "56px" | string | number;
	minHeight?: string | number;
	maxHeight?: string | number;
	style?: React.CSSProperties;
	maxLength?: number;
	value?: string;
	useIcon?: boolean;
	icon?: React.ReactNode;
	useDelete?: boolean;
	iconPosition?: "left" | "right";
	clickableIcon?: boolean;
	deleteAction?: () => void;
	onEnterKeyPress?: () => void;
	setValue?: (value: string) => void;
	titleAttr?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
