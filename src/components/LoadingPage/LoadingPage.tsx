import { Spinner } from "src/components";
import styles from "./LoadingPage.module.css";

export function LoadingPage({
	message = "페이지를 불러오는 중입니다.",
}: {
	message?: string;
}) {
	return (
		<div className={styles.loadingPageContainer}>
			<Spinner size="m" />
			<span className={styles.loadingPageContent}>{message}</span>
		</div>
	);
}
