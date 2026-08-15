import { forwardRef, useId } from "react";
import { Heading, Icon } from "../../index";
import styles from "./Header.module.css";
import type { ModalLargeHeaderProps } from "./Header.type";

export const LargeModalHeader = forwardRef<
	HTMLDivElement,
	ModalLargeHeaderProps
>(({ title, children, icon, subTitle, extra }, ref) => {
	const titleId = useId();

	return (
		<div
			className={`${styles.modalHeaderLarge} ${styles.modalHeader}`}
			ref={ref}
			role="dialog"
			aria-modal="true"
			aria-labelledby={titleId}
		>
			<Heading id={titleId} size={3} className={styles.modalHeaderLargeTitle}>
				{icon && (
					<span>
						<Icon icon={icon} size={24} />
					</span>
				)}
				<div>{title ?? children}</div>
			</Heading>

			<div className={styles.modalHeaderRight}>
				{extra && <div className={styles.modalHeaderExtra}>{extra}</div>}
			</div>
			{subTitle && <div className={styles.modalHeaderSubTitle}>{subTitle}</div>}
		</div>
	);
});
