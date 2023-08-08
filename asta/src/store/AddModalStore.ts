import {create} from 'zustand';
import { persist } from 'zustand/middleware';


interface AddModalState {
  isOpen: boolean;
  modalOpen: () => void;
  modalClose: () => void;
  modalCategoryTitle: ParentType;
  setModalCategoryTitle: (id: ParentType) => void;
}

export const useAddModalStore = create<AddModalState>()(
  persist(
    (set) => ({
      isOpen: false,
      modalOpen: () => set({ isOpen: true }),
      modalClose: () => set({ isOpen: false }),
      modalCategoryTitle: 'To-do',
      setModalCategoryTitle: (id) => set({ modalCategoryTitle: id }),
    }),
    {
      name: 'add-modal-store', // Specify a name for the storage
 
    }
  )
);

export default useAddModalStore;
