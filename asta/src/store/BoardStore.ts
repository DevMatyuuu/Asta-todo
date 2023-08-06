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
  loading: boolean;
}

export const useBoardStore = create<BoardState>()(
  persist(
    // persist options
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
      loading: true,
      getBoard: () => {
        // Load the persisted data from LocalStorage (if available)
        const storedData = localStorage.getItem('board-storage');
        if (storedData) {
          const { board, addTaskInput, updateTaskInput } = JSON.parse(storedData);
          set({ board, addTaskInput, updateTaskInput, loading: false });
        } else {
          set({ loading: false }); // Set loading to false if there's no data in LocalStorage
        }
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

          // Save the updated board state to localStorage
          set({ board: { columns: newColumns }, addTaskInput: state.addTaskInput });

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

          // Save the updated board state to localStorage
          set({ board: { columns: newColumns }, addTaskInput: state.addTaskInput });

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

          // Save the updated board state to localStorage
          set({ board: { columns: newColumns }, addTaskInput: state.addTaskInput });

          return {
            board: {
              columns: newColumns,
            },
          };
        });
      },
    }),
    // persist options
    { name: 'board-storage' } // Provide a unique name for the localStorage key
  )
);
