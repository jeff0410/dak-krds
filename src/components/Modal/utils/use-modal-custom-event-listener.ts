import { type Dispatch, type SetStateAction, useEffect } from "react";
import type { ModalListProps } from "../Modal.type";
import { useHandleModalList } from "./use-handle-modal-list";

interface UseModalCustomEventListenerProps {
	modalList: ModalListProps[];
	setModalList: Dispatch<SetStateAction<ModalListProps[]>>;
}

const cb =
	<T>(event: Event) =>
	(handler: (e: T) => void) => {
		const eventData = event as CustomEvent<T>;
		return handler(eventData.detail);
	};

export const useModalCustomEventListener = ({
	modalList,
	setModalList,
}: UseModalCustomEventListenerProps) => {
	const { hideLatestModal, hideModalById, hideAllModal } = useHandleModalList({
		modalList,
		setModalList,
	});

	useEffect(() => {
		const pushCb = (e: Event) =>
			cb<ModalListProps>(e)((newItem) =>
				setModalList((prev) => prev.concat(newItem)),
			);

		document.addEventListener("push", pushCb);
		return () => document.removeEventListener("push", pushCb);
	}, [setModalList]);

	useEffect(() => {
		const popCb = (e: Event) => cb(e)(hideLatestModal);

		document.addEventListener("pop", popCb);
		return () => document.removeEventListener("pop", popCb);
	}, [hideLatestModal]);

	useEffect(() => {
		const popByIdCb = (e: Event) => cb<string>(e)(hideModalById);

		document.addEventListener("popById", popByIdCb);
		return () => document.removeEventListener("popById", popByIdCb);
	}, [hideModalById]);

	useEffect(() => {
		const popAllCb = (e: Event) => cb(e)(hideAllModal);

		document.addEventListener("popAll", popAllCb);
		return () => document.removeEventListener("popAll", popAllCb);
	}, [hideAllModal]);
};
