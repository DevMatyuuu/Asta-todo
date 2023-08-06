import { create } from 'zustand'


interface UpdateTaskState {
    isUpdating: boolean;
    openInput: (taskId:string) => void;
    closeInput: () => void;
    updatingTaskId: string | null;
    setUpdatingTaskId: (taskId: string) => void;

}

export const useUpdateTaskStore = create<UpdateTaskState>()((set) => ({
    isUpdating: false,
    openInput: (taskId) => set({ isUpdating: true, updatingTaskId: taskId }),
    closeInput: () => set({ isUpdating: false, updatingTaskId: null }),
    updatingTaskId: '',
    setUpdatingTaskId: (taskId: string) => set({ updatingTaskId: taskId }),
}))

