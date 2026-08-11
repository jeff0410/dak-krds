import { Spinner } from "../Spinner";
import a11y from "../../styles/a11y.module.css";
import styles from "./SplashScreen.module.css";
import type { SplashScreenProps } from "./SplashScreen.type";

export function SplashScreen({
	logo,
	message,
	showSpinner = true,
	background,
	label = "화면을 불러오는 중입니다",
	className = "",
	...props
}: SplashScreenProps) {
	return (
		<div
			role="status"
			aria-live="polite"
			className={`${styles.splashScreen} ${className}`.trim()}
			style={background ? { backgroundColor: background } : undefined}
			{...props}
		>
			<div className={styles.logo}>{logo}</div>
			{message && <p className={styles.message}>{message}</p>}
			{showSpinner && (
				<div className={styles.spinner}>
					<Spinner />
				</div>
			)}
			<span className={a11y.srOnly}>{label}</span>
		</div>
	);
}
