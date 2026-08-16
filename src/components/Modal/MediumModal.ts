import {
	BlueButton,
	GreyButton,
	MediumModalButton,
	OutlinedBlueButton,
	RedButton,
	SecondaryButton,
} from "./Button";
import { MediumModalContainer } from "./Container";
import { MediumModalContent } from "./Content";
import { MediumModalHeader } from "./Header";

export const MediumModal = Object.assign(MediumModalContainer, {
	Header: MediumModalHeader,
	Footer: MediumModalButton,
	PrimaryButton: BlueButton,
	OutlinedBlueButton: OutlinedBlueButton,
	SecondaryButton: SecondaryButton,
	DangerousButton: RedButton,
	/** DialogModal 과 이름을 맞추기 위한 별칭 */
	DangerButton: RedButton,
	TeriaryButton: GreyButton,
	Content: MediumModalContent,
});
