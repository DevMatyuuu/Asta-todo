import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useBoardStore } from '../store/BoardStore';
import Column from './Column';
import { useDarkModeStore } from '../store/DarkModeStore';

type boardState = {
  columns: Column[];
};

function Board() {
  const { board, setBoardState } = useBoardStore();
  const isDark = useDarkModeStore((state) => state.isDark);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) return;

    if (type === 'task') {
      const sourceColumnId = source.droppableId;
      const destinationColumnId = destination.droppableId;

      if (sourceColumnId === destinationColumnId) {
        const sourceColumn = board.columns.find((col) => col.id === sourceColumnId);

        if (sourceColumn) {
          const sourceTasks = [...sourceColumn.tasks];
          const [movedTask] = sourceTasks.splice(source.index, 1);
          sourceTasks.splice(destination.index, 0, movedTask);

          const updatedColumns = board.columns.map((col) =>
            col.id === sourceColumnId ? { ...col, tasks: sourceTasks } : col
          );

          setBoardState({ columns: updatedColumns });
        }
      } else {
        const sourceColumn = board.columns.find((col) => col.id === sourceColumnId);
        const destinationColumn = board.columns.find((col) => col.id === destinationColumnId);

        if (sourceColumn && destinationColumn) {
          const sourceTasks = [...sourceColumn.tasks];
          const [movedTask] = sourceTasks.splice(source.index, 1);

          // Update the task's status
          const updatedMovedTask = {
            ...movedTask,
            status: destinationColumnId as ParentType, // Use predefined status value here
          };

          destinationColumn.tasks.splice(destination.index, 0, updatedMovedTask);

          // Update the columns' task lists directly
          setBoardState({
            columns: board.columns.map((col) =>
              col.id === sourceColumnId
                ? sourceColumn
                : col.id === destinationColumnId
                ? destinationColumn
                : col
            ),
          });
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
                {board.columns.map((col, index) => (
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
