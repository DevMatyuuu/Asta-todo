import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { persist } from 'zustand/middleware';

interface BoardState {
  board: {
    columns: Column[];
  };
  getBoard: () => void;
  setBoardState: (board: { columns: Column[] }) => void;
  addTaskInput: string;
  setAddTaskInput: (input: string) => void;
  addTask: (task: string, columnId: ParentType) => void;
  updateTaskInput: string;
  setUpdateTaskInput: (input: string) => void;
  updateTask: (taskId: string, title: string) => void;
  deleteTask: (taskId: string, id: ParentType) => void;
}

export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      board: {
        columns: [
          { id: 'To-do', tasks: [] },
          { id: 'In-progress', tasks: [] },
          { id: 'Done', tasks: [] },
        ],
      },
      addTaskInput: '',
      updateTaskInput: '',
      getBoard: () => {},
      setBoardState: (board) => set({ board }),
      setAddTaskInput: (input: string) => set({ addTaskInput: input }),
      addTask: (task: string, columnId: ParentType) => {
        set((state) => {
          const newColumns = [...state.board.columns];

          const newTask: Task = {
            $id: uuidv4(),
            title: task,
            status: columnId,
          };

          const columnIndex = newColumns.findIndex((column) => column.id === columnId);
          if (columnIndex !== -1) {
            newColumns[columnIndex].tasks.push(newTask);
          }

          return {
            board: {
              columns: newColumns,
            },
          };
        });
      },
      setUpdateTaskInput: (input: string) => set({ updateTaskInput: input }),
      updateTask: (taskId: string, title: string) => {
        set((state) => {
          const newColumns = [...state.board.columns];

          for (const column of newColumns) {
            const taskIndex = column.tasks.findIndex((task) => task.$id === taskId);
            if (taskIndex !== -1) {
              column.tasks[taskIndex].title = title;
              break;
            }
          }

          return {
            board: {
              columns: newColumns,
            },
          };
        });
      },
      deleteTask: (taskId: string, columnId: ParentType) => {
        set((state) => {
          const newColumns = [...state.board.columns];

          const columnIndex = newColumns.findIndex((column) => column.id === columnId);
          if (columnIndex !== -1) {
            const updatedTasks = newColumns[columnIndex].tasks.filter((task) => task.$id !== taskId);
            newColumns[columnIndex].tasks = updatedTasks;
          }

          return {
            board: {
              columns: newColumns,
            },
          };
        });
      },
    }),
    {
      name: 'board-storage', // A unique name for the localStorage key
    }
  )
);
