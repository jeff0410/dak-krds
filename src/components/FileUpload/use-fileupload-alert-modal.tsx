import { Button } from "../Button";
import { SmallModal } from "../Modal/SmallModal";
import { modalService } from "../Modal/service";

export const useFileuploadAlertModal = () => {
	const isStorybook =
		typeof window !== "undefined" &&
		window.location.href.includes("localhost:6006");

	const showAlertModal = (
		type: "maxFileSize" | "maxFiles",
		payload?: { maxFiles?: number; maxSizeMB?: number },
	) => {
		const message =
			type === "maxFileSize"
				? `파일 용량은 최대 ${payload?.maxSizeMB ?? "-"}MB까지 가능합니다.`
				: `최대 ${payload?.maxFiles ?? "-"}개만 업로드할 수 있습니다.`;

		if (isStorybook) {
			window.alert(message); // ✅ 스토리북에서는 alert로 처리
			return;
		}
		modalService.push(
			<SmallModal>
				<SmallModal.Header title="파일업로드" />
				<SmallModal.Content>{message}</SmallModal.Content>
				<SmallModal.Footer>
					<div className="flex justify-end">
						<Button onClick={() => modalService.pop()}>확인</Button>
					</div>
				</SmallModal.Footer>
			</SmallModal>,
		);
	};

	return { showAlertModal };
};
