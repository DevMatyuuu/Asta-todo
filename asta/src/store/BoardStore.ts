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
  clearAllTask: (id: ParentType) => void;
  moveTask: (taskId: string, id: ParentType) => void;
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
      getBoard: () => {},
      setBoardState: (board) => set({ board }),

      //add task state
      addTaskInput: '',
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

      //update task state
      updateTaskInput: '',
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

      //delete task state
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

      // Clear all tasks in the column
      clearAllTask: (columnId: ParentType) => {
        set((state) => {
          const newColumns = [...state.board.columns];
          const columnIndex = newColumns.findIndex((column) => column.id === columnId);
      
          if (columnIndex !== -1 && newColumns[columnIndex].tasks.length > 0) {
            newColumns[columnIndex].tasks = [];
          }
      
          return {
            board: {
              columns: newColumns,
            },
          };
        });
      },
      
      //move task to different column without drag and drop
      moveTask: (taskId: string, targetColumnId: ParentType) => {
        set((state) => {
          const newColumns = [...state.board.columns];
      
          // Find the source column and task index
          let sourceColumnIndex = -1;
          let taskIndex = -1;
          for (let columnIndex = 0; columnIndex < newColumns.length; columnIndex++) {
            taskIndex = newColumns[columnIndex].tasks.findIndex((task) => task.$id === taskId);
            if (taskIndex !== -1) {
              sourceColumnIndex = columnIndex;
              break;
            }
          }
      
          if (sourceColumnIndex !== -1 && taskIndex !== -1) {
            const taskToMove = newColumns[sourceColumnIndex].tasks.splice(taskIndex, 1)[0];
      
            // Find the target column index
            const targetColumnIndex = newColumns.findIndex((column) => column.id === targetColumnId);
      
            if (targetColumnIndex !== -1) {
              newColumns[targetColumnIndex].tasks.push(taskToMove);
            }
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
      name: 'board-storage', 
    }
  )
);
