import { create } from 'zustand'


interface AddModalState {
    isOpen: boolean;
    modalOpen: () => void;
    modalClose: () => void;
    modalCategoryTitle: ParentType;
    setModalCategoryTitle: (id: ParentType) => void;

}

export const useAddModalStore = create<AddModalState>()((set) => ({
    isOpen: false,
    modalOpen: () => set({isOpen: true}),
    modalClose: () => set({isOpen: false}),
    modalCategoryTitle: 'To-do' || 'In-progress' || 'Done',
    setModalCategoryTitle: (id) => set({modalCategoryTitle: id}),

}))