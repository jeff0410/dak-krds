import styles from "./Identifier.module.css";
import type { IdentifierProps } from "./Identifier.type";

export function Identifier({
	organization,
	logoSrc,
	logoAlt,
	variant = "light",
	className = "",
	...props
}: IdentifierProps) {
	return (
		<section
			className={`${styles.identifier} ${styles[variant]} ${className}`.trim()}
			aria-label="운영기관 정보"
			{...props}
		>
			{logoSrc && (
				<img
					src={logoSrc}
					alt={logoAlt ?? organization}
					className={styles.logo}
				/>
			)}
			<p className={styles.description}>
				이 누리집은 {organization}에서 운영하는 누리집입니다.
			</p>
		</section>
	);
}
