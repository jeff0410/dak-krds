import flagUrl from "./flag.svg?url";
import styles from "./Masthead.module.css";
import type { MastheadProps } from "./Masthead.type";

export function Masthead({
	maxWidth = "1200px",
	className = "",
	...props
}: MastheadProps) {
	return (
		<div className={`${styles.masthead} ${className}`.trim()} {...props}>
			<div className={styles.inner} style={{ maxWidth }}>
				<img src={flagUrl} alt="대한민국 국기" className={styles.flag} />
				<span className={styles.label}>
					이 누리집은 대한민국 공식 전자정부 누리집입니다.
				</span>
			</div>
		</div>
	);
}
