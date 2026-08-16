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
	/** DialogModal 과 이름을 맞추기 위한 별칭 */
	DangerButton: RedButton,
	TeriaryButton: GreyButton,
	Content: SmallModalContent,
});
