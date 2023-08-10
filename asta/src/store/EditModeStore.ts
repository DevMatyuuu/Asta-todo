import {create} from 'zustand';
import { persist } from 'zustand/middleware';

interface UpdateTaskState {
  isUpdating: boolean;
  openInput: (taskId: string) => void;
  closeInput: () => void;
  updatingTaskId: string | null;
  setUpdatingTaskId: (taskId: string) => void;
}

export const useEditModeStore = create<UpdateTaskState>()(
  persist(
    (set) => ({
      isUpdating: false,
      openInput: (taskId) => set({ isUpdating: true, updatingTaskId: taskId }),
      closeInput: () => set({ isUpdating: false, updatingTaskId: null }),
      updatingTaskId: '',
      setUpdatingTaskId: (taskId: string) => set({ updatingTaskId: taskId }),
    }),
    {
      name: 'update-task-store', 
    }
  )
);

export default useEditModeStore;
