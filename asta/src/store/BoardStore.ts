import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';


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
  persist(
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
      getBoard: () => {},
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
    {
      name: 'board-store', // Specify a name for the storage
    }
  )
);

export default useBoardStore;
