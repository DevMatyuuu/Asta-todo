import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  addTaskInput: string;
  setAddTaskInput: (input: string) => void;
  addTask: (task: string, columnId: ParentType) => void;
  updateTask: (taskId: string, title: string) => void;
  deleteTask: (taskId: string, id: ParentType) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  board: {
    columns: new Map<ParentType, Column>([
      ['To-do', { id: 'To-do', tasks: [] }],
      ['In-progress', { id: 'In-progress', tasks: [] }],
      ['Done', { id: 'Done', tasks: [] }],
    ]),
  },
  addTaskInput: '',
  getBoard: () => {
  },
  setBoardState: (board) => {
      // Function to set the board state and save it to localStorage
      set({ board });
      localStorage.setItem('board', JSON.stringify(board));
    },

  setAddTaskInput: (input: string) => set({ addTaskInput: input }),

  addTask: (task: string, columnId: ParentType) => {
    set((state) => {
      const newColumns = new Map(state.board.columns);
      const column = newColumns.get(columnId);

      if (column) {
        const $id = uuidv4();
        const $createdAt = new Date().toISOString();

        const newTask: Task = {
          $id,
          $createdAt,
          title: task,
          status: columnId,
        };

        column.tasks.push(newTask);
      }

      return {
        board: {
          columns: newColumns,
        },
      };
    });
  },

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
  deleteTask: (taskId: string, id: ParentType) => {
    set((state) => {
      const newColumns = new Map(state.board.columns);

      const column = newColumns.get(id);
      if (column) {
        column.tasks = column.tasks.filter((task) => task.$id !== taskId);
      }

      return {
        board: {
          columns: newColumns,
        },
      };
    });
  },
}));
