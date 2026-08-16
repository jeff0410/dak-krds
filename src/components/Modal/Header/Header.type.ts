import type { ReactNode } from "react";
import type { IconType } from "../../Icon";

export interface ModalHeaderProps {
	/**
	 * 제목. children 으로 넣어도 된다.
	 * 둘 다 있으면 title 이 우선한다.
	 */
	title?: ReactNode;
	children?: ReactNode;
	onClose?: VoidFunction;
	icon?: IconType;
	extra?: ReactNode;
}

export interface ModalLargeHeaderProps extends ModalHeaderProps {
	subTitle?: ReactNode;
}
