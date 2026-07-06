import { create } from "zustand";

export type ModalId = "login" | "set-password";

interface ModalState {
  activeModal: ModalId | null;
  openModal: (id: ModalId) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  openModal: (id) => set({ activeModal: id }),
  closeModal: () => set({ activeModal: null }),
}));
