import { createContext, useContext } from "react";
import type { ModalListProps } from "../Modal.type";

interface ModalManagerContextProps {
	modalList: ModalListProps[];
}
export const ModalManagerContext = createContext<
	ModalManagerContextProps | undefined
>(undefined);

export const useModalManagerContext = () => {
	const context = useContext(ModalManagerContext);

	if (!context) throw new Error("ModalManagerContext is undefined");

	return context;
};
