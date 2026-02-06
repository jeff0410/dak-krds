import type { Dispatch, SetStateAction } from "react";
import { useCustomEventListener } from "../../../hooks";
import type {
	ToastBarEventListenerType,
	ToastBarProps,
} from "../ToastBar.type";
import { useHandleToastBarList } from "./use-handle-toast-bar-list";

interface UseToastBarCustomEventListenerProps {
	toastbars: ToastBarProps[];
	setToastbars: Dispatch<SetStateAction<ToastBarProps[]>>;
}

export const useToastBarCustomEventListener = ({
	toastbars,
	setToastbars,
}: UseToastBarCustomEventListenerProps) => {
	const { closeByIdToastBar, closeAllToastBar } = useHandleToastBarList({
		toastbars,
		setToastbars,
	});

	const addCb = (newItem: ToastBarProps) =>
		setToastbars((prev) => prev.concat(newItem));

	/* toastbar 이벤트감지 핸들러 **/
	useCustomEventListener<ToastBarEventListenerType, ToastBarProps>({
		eventType: "[toastbar] show dangerMsg",
		handler: addCb,
		depths: [addCb],
	});

	useCustomEventListener<ToastBarEventListenerType, ToastBarProps>({
		eventType: "[toastbar] show succeedMsg",
		handler: addCb,
		depths: [addCb],
	});

	useCustomEventListener<ToastBarEventListenerType, ToastBarProps>({
		eventType: "[toastbar] show warningMsg",
		handler: addCb,
		depths: [addCb],
	});

	useCustomEventListener<ToastBarEventListenerType, ToastBarProps>({
		eventType: "[toastbar] show infoMsg",
		handler: addCb,
		depths: [addCb],
	});

	useCustomEventListener<ToastBarEventListenerType, string>({
		eventType: "[toastbar] close Toast",
		handler: closeByIdToastBar,
		depths: [closeByIdToastBar],
	});

	useCustomEventListener<ToastBarEventListenerType, void>({
		eventType: "[toastbar] close all toast",
		handler: closeAllToastBar,
		depths: [closeAllToastBar],
	});
};
