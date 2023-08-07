import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { persist } from 'zustand/middleware';

interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  addTaskInput: string;
  setAddTaskInput: (input: string) => void;
  addTask: (task: string, columnId: ParentType) => void;
  updateTaskInput: string;
  setUpdateTaskInput: (input: string) => void;
  updateTask: (taskId: string, title: string) => void;
  deleteTask: (taskId: string, id: ParentType) => void;
}

export const useBoardStore = create<BoardState>()(
  persist<BoardState>(
    (set) => ({
      board: {
        columns: new Map<ParentType, Column>([
          ['To-do', { id: 'To-do', tasks: [] }],
          ['In-progress', { id: 'In-progress', tasks: [] }],
          ['Done', { id: 'Done', tasks: [] }],
        ]),
      },
      addTaskInput: '',
      updateTaskInput: '',
      getBoard: () => {
        // Optional: Load the persisted data from your server or API instead of LocalStorage
      },
      setBoardState: (board) => set({ board }),

      setAddTaskInput: (input: string) => set({ addTaskInput: input }),

      addTask: (task: string, columnId: ParentType) => {
        set((state) => {
          const newColumns = new Map(state.board.columns);

          const newTask: Task = {
            $id: uuidv4(),
            title: task,
            status: columnId,
          };

          const column = newColumns.get(columnId);
          if (column) {
            column.tasks.push(newTask);
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
          const newColumns = new Map(state.board.columns);

          for (const [, column] of newColumns) {
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
          const newColumns = new Map(state.board.columns);

          const column = newColumns.get(columnId);
          if (column) {
            const updatedTasks = column.tasks.filter((task) => task.$id !== taskId);
            column.tasks = updatedTasks;
          }

          return {
            board: {
              columns: newColumns,
            },
          };
        });
      },
    }),
    { name: 'board-storage' } // Provide a unique name for the localStorage key
  )
);
