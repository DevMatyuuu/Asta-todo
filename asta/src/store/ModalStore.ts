import {create} from 'zustand';
import { persist } from 'zustand/middleware';


interface AddModalState {
  isAddModalOpen: boolean;
  isClearModalOpen: boolean;
  addModalOpen: () => void;
  addModalClose: () => void;
  clearModalOpen: () => void;
  clearModalClose: () => void;
  modalCategoryTitle: ParentType;
  setModalCategoryTitle: (id: ParentType) => void;
}

export const useModalStore = create<AddModalState>()(
  persist(
    (set) => ({
      isAddModalOpen: false,
      isClearModalOpen: false,
      addModalOpen: () => set({ isAddModalOpen: true }),
      addModalClose: () => set({ isAddModalOpen: false }),
      clearModalOpen: () => set({ isClearModalOpen: true }),
      clearModalClose: () => set({ isClearModalOpen: false }),
      modalCategoryTitle: 'To-do',
      setModalCategoryTitle: (id) => set({ modalCategoryTitle: id }),
    }),
    {
      name: 'add-modal-store', // Specify a name for the storage
 
    }
  )
);

export default useModalStore;
