import { uniqueId } from "lodash-es";
import type { ReactNode } from "react";
import type { ModalListProps, ModalProps } from "../Modal.type";
import { MODAL_LIST_TYPE } from "../Modal.type";

const type = MODAL_LIST_TYPE.MODAL;

export const modalService = {
	push(contents: ReactNode, props?: ModalProps): string {
		const id = props?.id || uniqueId();

		const modalItem: ModalListProps = {
			type: props?.type ?? type,
			id,
			show: true,
			contents,
			onKeydown: props?.onKeydown,
			zIndex: props?.zIndex,
			top: props?.top,
		};

		const customEvent = new CustomEvent("push", { detail: modalItem });
		document.dispatchEvent(customEvent);

		return id;
	},

	pop() {
		const customEvent = new CustomEvent("pop");
		document.dispatchEvent(customEvent);
	},

	popById(id: string) {
		const customEvent = new CustomEvent("popById", { detail: id });
		document.dispatchEvent(customEvent);
	},

	popAll() {
		const customEvent = new CustomEvent("popAll");
		document.dispatchEvent(customEvent);
	},
};
