import {
	BlueButton,
	DialogModalButton,
	GreyButton,
	OutlinedBlueButton,
	RedButton,
	SecondaryButton,
} from "./Button";
import { DialogModalContainer } from "./Container";
import { DialogModalContent } from "./Content";
import { DialogModalHeader } from "./Header";

export const DialogModal = Object.assign(DialogModalContainer, {
	Header: DialogModalHeader,
	Footer: DialogModalButton,
	Content: DialogModalContent,
	PrimaryButton: BlueButton,
	DangerButton: RedButton,
	/** 다른 모달과 이름을 맞추기 위한 별칭 */
	DangerousButton: RedButton,
	OutlinedBlueButton: OutlinedBlueButton,
	SecondaryButton: SecondaryButton,
	TeriaryButton: GreyButton,
});
