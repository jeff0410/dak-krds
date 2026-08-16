import {
	BlueButton,
	GreyButton,
	OutlinedBlueButton,
	RedButton,
	SecondaryButton,
} from "./Button";
import { LargeModalButton } from "./Button/Large";
import { LargeModalContainer } from "./Container";
import { LargeModalContent } from "./Content";
import { LargeModalHeader } from "./Header";

export const LargeModal = Object.assign(LargeModalContainer, {
	Header: LargeModalHeader,
	Footer: LargeModalButton,
	PrimaryButton: BlueButton,
	OutlinedBlueButton: OutlinedBlueButton,
	SecondaryButton: SecondaryButton,
	DangerousButton: RedButton,
	/** DialogModal 과 이름을 맞추기 위한 별칭 */
	DangerButton: RedButton,
	TeriaryButton: GreyButton,
	Content: LargeModalContent,
});
