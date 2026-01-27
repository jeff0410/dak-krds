import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import { ModalManagerContext } from './contexts';
import { useModalCustomEventListener } from './utils';
import { Modal } from './Modal';
import type { ModalListProps } from './Modal.type';

export const ModalManager = ({ children }: PropsWithChildren) => {
  const [modalList, setModalList] = useState<ModalListProps[]>([]);
  const removeInvisibleModal = () => setModalList((prev) => prev.filter(({ show }) => show));

  useModalCustomEventListener({ modalList, setModalList });

  return (
    <ModalManagerContext.Provider value={{ modalList }}>
      {modalList.map((modalProps) => (
        <Modal
          key={modalProps.id}
          id={modalProps.id}
          show={modalProps.show}
          type={modalProps.type}
          zIndex={modalProps.zIndex}
          top={modalProps.top}
          removeInvisibleModal={removeInvisibleModal}>
          {modalProps.contents}
        </Modal>
      ))}
      {children}
    </ModalManagerContext.Provider>
  );
};
