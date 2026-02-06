import type { PropsWithChildren } from "react";
import { useEffect } from "react";
import { useAnimationToggle, useBlockDocumentScroll } from "../../hooks";
import { Portal } from "../Portal";
import type { ModalPresenterProps } from "./Modal.type";
import { useAddModalAnimationStyle, useFocusInModalManager } from "./utils";

export const Modal = ({
	type,
	children,
	show,
	id,
	top,
	zIndex = 2200,
	removeInvisibleModal,
}: PropsWithChildren<ModalPresenterProps>) => {
	const { mounted, trigger, onShow, onHide } = useAnimationToggle({
		transitionDuration: 200,
		onHide: removeInvisibleModal,
	});

	const { ref } = useAddModalAnimationStyle({ id, trigger: !!trigger, top });

	useBlockDocumentScroll(trigger === 100 && mounted);
	useFocusInModalManager({ id: trigger ? id : undefined, type });

	useEffect(() => {
		if (show) return onShow();

		onHide();
	}, [show, onShow, onHide]);

	if (!mounted) return null;

	return (
		<Portal
			style={{
				position: "fixed",
				top: 0,
				right: 0,
				left: 0,
				bottom: 0,
				zIndex,
			}}
		>
			<div
				ref={ref}
				id={id}
				className="portal-wrap"
				role="presentation"
				data-id={id}
			>
				{children}
			</div>
		</Portal>
	);
};
