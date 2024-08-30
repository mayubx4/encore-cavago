'use Client';

import {
  ReactNode, createContext, useContext, useState,
} from 'react';
import { Modal } from 'antd';

type SharedModalPopupProps = {
  header?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
};

type ModalStateProps = {
  modalProps: SharedModalPopupProps
  open: boolean;
  closeModal: () => void;
  showModal: (opt: SharedModalPopupProps) => void;
};

export const SharedModalPopupContext = createContext<ModalStateProps | null>(null);

export function useSharedModalPopupContext() {
  const ctx = useContext(SharedModalPopupContext);
  if (!ctx) {
    throw new Error('to use shared modal wrap the parent with ShareModalProvider');
  }

  return ctx;
}

export function SharedModalPopupContextProvider({ children }:
  { children: ReactNode }) {
  const [modalState, setModalState] = useState<ModalStateProps>({
    modalProps: {},
    open: false,
    closeModal: () => set('open', false),
    showModal: (opt) => {
      set('open', true);
      set('modalProps', opt);
    },
  });

  function set<Key extends keyof ModalStateProps>(k: Key, v: ModalStateProps[Key]) {
    setModalState((value: any) => ({ ...value, [k]: v }));
  }

  return (
    <SharedModalPopupContext.Provider value={modalState}>
      {children}
      <Modal
        open={modalState?.open}
        onCancel={modalState?.closeModal}
        footer={modalState?.modalProps?.footer}
      >
        {modalState.modalProps.header}
        {modalState?.modalProps?.body}
      </Modal>
    </SharedModalPopupContext.Provider>
  );
}
