import type { PropsWithChildren } from "react";
import styles from "./Content.module.css";
import type { ModalContentProps } from "./Modal.type";

export const SmallModalContent = ({
	children,
	className = "",
	contentMaxHeight,
	...props
}: PropsWithChildren<ModalContentProps>) => {
	return (
		<section
			className={`${className} ${styles.modalContent} ${styles.modalContentSmall}`}
			aria-label="모달 내용 스크롤 영역"
			{...props}
		>
			{children}
		</section>
	);
};
