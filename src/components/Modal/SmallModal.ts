import {
	BlueButton,
	GreyButton,
	OutlinedBlueButton,
	RedButton,
	SecondaryButton,
	SmallModalButton,
} from "./Button";
import { SmallModalContainer } from "./Container";
import { SmallModalContent } from "./Content";
import { SmallModalHeader } from "./Header";

export const SmallModal = Object.assign(SmallModalContainer, {
	Header: SmallModalHeader,
	Footer: SmallModalButton,
	PrimaryButton: BlueButton,
	OutlinedBlueButton: OutlinedBlueButton,
	SecondaryButton: SecondaryButton,
	DangerousButton: RedButton,
	TeriaryButton: GreyButton,
	Content: SmallModalContent,
});
