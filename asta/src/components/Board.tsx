import { useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useBoardStore } from '../store/BoardStore';
import Column from './Column';
import { useDarkModeStore } from '../store/DarkModeStore';

function Board() {
  const { board,  clearAllTask } = useBoardStore();
  const isDark = useDarkModeStore((state) => state.isDark);
  
  // Create local state for the board
  const [localBoard, setLocalBoard] = useState(board);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) return;

    if (type === 'task') {
      if (source.droppableId === destination.droppableId) {
        // Reorder task within the same column
        const column = localBoard.columns.find((col) => col.id === source.droppableId);

        if (column) {
          const newTasks = [...column.tasks];
          const [movedTask] = newTasks.splice(source.index, 1);
          newTasks.splice(destination.index, 0, movedTask);

          const newColumns = localBoard.columns.map((col) =>
            col.id === source.droppableId ? { ...col, tasks: newTasks } : col
          );

          // Update localBoard state
          setLocalBoard({ columns: newColumns });
        }
      } else {
        // Move task from one column to another
        const sourceColumn = localBoard.columns.find((col) => col.id === source.droppableId);
        const destinationColumn = localBoard.columns.find((col) => col.id === destination.droppableId);

        if (sourceColumn && destinationColumn) {
          const sourceTasks = [...sourceColumn.tasks];
          const [movedTask] = sourceTasks.splice(source.index, 1);
          const destinationTasks = [...destinationColumn.tasks];

          // Update the status property of the moved task
          movedTask.status = destination.droppableId as ParentType;

          destinationTasks.splice(destination.index, 0, movedTask);

          const updatedColumns = localBoard.columns.map((col) =>
            col.id === source.droppableId
              ? { ...col, tasks: sourceTasks }
              : col.id === destination.droppableId
              ? { ...col, tasks: destinationTasks }
              : col
          );

          // Update localBoard state
          setLocalBoard({ columns: updatedColumns });

          // Call clearAllTask function to ensure the task is properly cleared
          clearAllTask(destination.droppableId as ParentType);
        }
      }
    }
  };

  return (
    <div className={isDark ? 'bg-[#020403]' : ''}>
      <div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="board" direction="horizontal" type="column">
            {(provided) => (
              <div
                className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5 max-w-[1400px] mx-auto md:mt-5"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {localBoard.columns.map((col, index) => (
                  <Column key={col.id} id={col.id} tasks={col.tasks} index={index} />
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default Board;
