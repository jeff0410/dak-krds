import { useFocusInContent } from '../../../hooks';
import { MODAL_LIST_TYPE } from '../Modal.type';
import { useFocusInDialog } from './use-focus-in-dialog';

interface UseFocusInModalManagerProps {
  id?: string;
  type: MODAL_LIST_TYPE;
}

export const useFocusInModalManager = ({ id, type }: UseFocusInModalManagerProps) => {
  // modal의 경우
  useFocusInContent({ id: type === MODAL_LIST_TYPE.MODAL ? id : undefined });
  // dialog의 경우
  useFocusInDialog({ id: type === MODAL_LIST_TYPE.DIALOG ? id : undefined });
};
