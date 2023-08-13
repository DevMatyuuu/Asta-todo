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
 
      //move task to different column without drag and drop
      moveTask: (taskId: string, id: ParentType) => {
        set((state) => {
          const newColumns = [...state.board.columns];
      
          const defaultTask: Task = {
            $id: '',
            title: '',
            status: 'To-do',
          };
          
          let movedTask: Task = defaultTask; //assign a default value
          
          //find and remove task from old column
          for (const column of newColumns) {
            const taskIndex = column.tasks.findIndex((task) => task.$id === taskId);
            if (taskIndex !== -1) {
              movedTask = column.tasks.splice(taskIndex, 1)[0];
              break;
            }
          }
          
          //add task to new column
          if (movedTask !== defaultTask) { 
            //update the status property of the moved task
            movedTask.status = id; //add this line
            const columnIndex = newColumns.findIndex((column) => column.id === id);
            if (columnIndex !== -1) {
              newColumns[columnIndex].tasks.push(movedTask);
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
