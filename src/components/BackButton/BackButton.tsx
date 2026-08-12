import { Icon } from "../Icon";
import a11y from "../../styles/a11y.module.css";
import styles from "./BackButton.module.css";
import type { BackButtonProps } from "./BackButton.type";

export function BackButton({
	title,
	label = "이전 화면으로",
	confirmMessage,
	onBack,
	className = "",
	...props
}: BackButtonProps) {
	const handleClick = () => {
		if (confirmMessage && !window.confirm(confirmMessage)) return;
		if (onBack) {
			onBack();
			return;
		}
		window.history.back();
	};

	return (
		<div className={`${styles.topBar} ${className}`.trim()} {...props}>
			<button type="button" className={styles.button} onClick={handleClick}>
				<Icon icon="ArrowLeft" size={24} />
				<span className={a11y.srOnly}>{label}</span>
			</button>
			{title && <h1 className={styles.title}>{title}</h1>}
		</div>
	);
}
