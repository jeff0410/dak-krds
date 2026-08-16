import { forwardRef, useId } from "react";
import { Heading, Icon } from "../../index";
import styles from "./Header.module.css";
import type { ModalHeaderProps } from "./Header.type";

export const SmallModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
	({ title, children, onClose: _onClose, icon }, ref) => {
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
				className={`${styles.modalHeaderSmall} ${styles.modalHeader}`}
				role="dialog"
				aria-modal="true"
				aria-labelledby={titleId}
			>
				<Heading
					id={titleId}
					size={3}
					className={styles.modalHeaderSmallTitle}
				>
					{icon && (
						<span>
							<Icon icon={icon} size={24} />
						</span>
					)}
					{title ?? children}
				</Heading>
				{/*   {useClose && (
          <button
            type='button'
            aria-label='닫기'
            className={styles.modalCloseButton}
            onClick={onClick}>
            <Icon icon='Close' size={20} />
          </button>
        )} */}
			</div>
		);
	},
);
