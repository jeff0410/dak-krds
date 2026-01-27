import {
  BlueButton,
  DialogModalButton,
  GreyButton,
  OutlinedBlueButton,
  RedButton,
  SecondaryButton,
} from './Button';
import { DialogModalContainer } from './Container';
import { DialogModalContent } from './Content';
import { DialogModalHeader } from './Header';

export const DialogModal = Object.assign(DialogModalContainer, {
  Header: DialogModalHeader,
  Footer: DialogModalButton,
  Content: DialogModalContent,
  PrimaryButton: BlueButton,
  DangerButton: RedButton,
  OutlinedBlueButton: OutlinedBlueButton,
  SecondaryButton: SecondaryButton,
  TeriaryButton: GreyButton,
});
