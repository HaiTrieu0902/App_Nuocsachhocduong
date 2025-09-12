import { useCallback, useState } from 'react';

interface IModalState {
  isOpen: boolean;
}

interface IModalActions {
  toggleModal: () => void;
  closeModal: () => void;
}

const useModal = (): [IModalState, IModalActions] => {
  const [modalState, setModalState] = useState<IModalState>({ isOpen: false });

  const toggleModal = useCallback(() => {
    setModalState((prevState) => ({ isOpen: !prevState.isOpen }));
  }, []);

  const closeModal = useCallback(() => {
    setModalState({ isOpen: false });
  }, []);

  return [modalState, { toggleModal, closeModal }];
};

export default useModal;
