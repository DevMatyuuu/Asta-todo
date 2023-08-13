import {create} from 'zustand';
import { persist } from 'zustand/middleware';


interface AddModalState {
  isAddModalOpen: boolean;
  addModalOpen: () => void;
  addModalClose: () => void;
  modalCategoryTitle: ParentType;
  setModalCategoryTitle: (id: ParentType) => void;
}

export const useModalStore = create<AddModalState>()(
  persist(
    (set) => ({
      isAddModalOpen: false,
      addModalOpen: () => set({ isAddModalOpen: true }),
      addModalClose: () => set({ isAddModalOpen: false }),
      modalCategoryTitle: 'To-do',
      setModalCategoryTitle: (id) => set({ modalCategoryTitle: id }),
    }),
    {
      name: 'add-modal-store', // Specify a name for the storage
 
    }
  )
);

export default useModalStore;
