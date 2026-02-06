import type { HTMLAttributes, ReactNode } from "react";

/**
 * keyboard event 구분을 위한 type
 * - modal의 경우 modal container에 focus
 * - dialog의 경우 primary button에 focus
 * - custom의 경우 수동으로 동작을 추가해주세요
 */
export enum MODAL_LIST_TYPE {
	MODAL = "modal",
	DIALOG = "dialog",
	CUSTOM = "custom",
}

export interface ModalListProps {
	type: MODAL_LIST_TYPE; // keyboard event 구분을 위한 type 추가
	id?: string;
	show?: boolean;
	contents: ReactNode;
	zIndex?: number;
	top?: string;
	onConfirm?: () => void;
	onKeydown?: (e: KeyboardEvent) => void;
}

export interface ModalProps {
	type?: MODAL_LIST_TYPE;
	id?: string;
	show?: boolean;
	zIndex?: number;
	top?: string;
	onKeydown?: (e: KeyboardEvent) => void;
}

export interface ModalPresenterProps {
	type: MODAL_LIST_TYPE;
	id?: string;
	show?: boolean;
	zIndex?: number;
	top?: string;
	removeInvisibleModal: () => void;
}

export interface DialogProps {
	id?: string;
	show?: boolean;
	onConfirmCb?: () => void;
	zIndex?: number;
}

export interface DimmedBackdropProps {
	onClickBackdrop?: () => void;
	staticBackdrop?: boolean;
}

export interface ModalContainerProps extends HTMLAttributes<HTMLDivElement> {
	/**
	 * backdrop click, esc keyDown 에 공통된 close func 을 넘겨주고 싶을 때 사용.
	 * 아무것도 넘기지 않으면 modalService.pop 실행됨.
	 */
	onClose?: () => void;
	/**
	 * custom backdropClick func
	 */
	onClickBackdrop?: () => void;
	/**
	 * custom escKeyDown func
	 */
	onEscKeyDown?: () => void;
	backdropType?: BackdropType;
	staticBackdrop?: boolean;
	useClose?: boolean;
}

export interface BackdropProps {
	backdropType: BackdropType;
	onClickBackdrop?: () => void;
	staticBackdrop?: boolean;
}

export type BackdropType = "dimmed" | "clear";

export type ModalCustomService = "push" | "pop" | "popAll" | "popById";
