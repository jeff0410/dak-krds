import { forwardRef, useId } from "react";
import { Heading, Icon } from "../../index";
import styles from "./Header.module.css";
import type { ModalHeaderProps } from "./Header.type";

export const MediumModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
	({ title, children, onClose: _onClose, icon, extra }, ref) => {
		/*     const onClose = () => {
      const customEvent = new CustomEvent('pop');
      document.dispatchEvent(customEvent);
    };
    const onClick = _onClose ?? onClose;
 */
		const titleId = useId();

		return (
			<div
				ref={ref}
				className={`${styles.modalHeaderMedium}  ${styles.modalHeader}`}
				role="dialog"
				aria-modal="true"
				aria-labelledby={titleId}
			>
				<Heading
					id={titleId}
					size={3}
					className={styles.modalHeaderMediumTitle}
				>
					{icon && (
						<span>
							<Icon icon={icon} size={24} />
						</span>
					)}
					<div>{title ?? children}</div>
				</Heading>
				<div className={styles.modalHeaderRight}>
					{extra && <div className={styles.modalHeaderExtra}>{extra}</div>}

					{/*   {useClose && (
            <button type='button' className={styles.modalCloseButton} onClick={onClick}>
              <Icon icon='Close' size={20} />
            </button>
          )} */}
				</div>
			</div>
		);
	},
);
