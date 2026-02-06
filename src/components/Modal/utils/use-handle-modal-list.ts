import type { Dispatch, SetStateAction } from "react";
import type { ModalListProps } from "../Modal.type";

export const useHandleModalList = ({
	modalList,
	setModalList,
}: {
	modalList: ModalListProps[];
	setModalList: Dispatch<SetStateAction<ModalListProps[]>>;
}) => {
	const hideLatestModal = () => {
		/** show 가 true 인 것 중 가장 마지막 modalItem 의 id */
		const visibleForefrontModalId = [...modalList]
			.reverse()
			.find((modalItem) => modalItem.show)?.id;

		if (!visibleForefrontModalId) return;

		hideModalById(visibleForefrontModalId);
	};

	/** id 를 가진 modalItem.show 를 false 로 변경 */
	// modal close animation 실행 후 display none 처리 후 showModal 실행 시 show false인 모달 clear
	const hideModalById = (id: string) => {
		if (!modalList.length) return;
		if (!modalList.find((modal) => modal.id === id)) return;

		setModalList((prev) =>
			prev.map((modal) =>
				modal.id === id ? { ...modal, show: false } : modal,
			),
		);
	};

	const hideAllModal = () =>
		setModalList((prev) => prev.map((modal) => ({ ...modal, show: false })));

	return {
		hideLatestModal,
		hideModalById,
		hideAllModal,
	};
};
