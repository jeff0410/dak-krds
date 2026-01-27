import { type Dispatch, type SetStateAction, useEffect } from 'react';
import type { ModalListProps } from '../Modal.type';
import { useHandleModalList } from './use-handle-modal-list';

interface UseModalCustomEventListenerProps {
  modalList: ModalListProps[];
  setModalList: Dispatch<SetStateAction<ModalListProps[]>>;
}
export const useModalCustomEventListener = ({
  modalList,
  setModalList,
}: UseModalCustomEventListenerProps) => {
  const { hideLatestModal, hideModalById, hideAllModal } = useHandleModalList({
    modalList,
    setModalList,
  });

  const cb =
    <T>(event: Event) =>
    (handler: (e: T) => void) => {
      const eventData = event as CustomEvent<T>;
      return handler(eventData.detail);
    };

  const pushCb = (e: Event) =>
    cb<ModalListProps>(e)((newItem) => setModalList((prev) => prev.concat(newItem)));

  const popCb = (e: Event) => cb(e)(hideLatestModal);

  const popByIdCb = (e: Event) => cb<string>(e)(hideModalById);

  const popAllCb = (e: Event) => cb(e)(hideAllModal);

  useEffect(() => {
    document.addEventListener('push', pushCb);
    return () => document.removeEventListener('push', pushCb);
  }, [pushCb]);

  useEffect(() => {
    document.addEventListener('pop', popCb);
    return () => document.removeEventListener('pop', popCb);
  }, [popCb]);

  useEffect(() => {
    document.addEventListener('popById', popByIdCb);
    return () => document.removeEventListener('popById', popByIdCb);
  }, [popByIdCb]);

  useEffect(() => {
    document.addEventListener('popAll', popAllCb);
    return () => document.removeEventListener('popAll', popAllCb);
  }, [popAllCb]);
};
