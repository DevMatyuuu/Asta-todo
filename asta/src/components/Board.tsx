import React from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useBoardStore } from '../store/BoardStore';
import Column from './Column';
import { useDarkModeStore } from '../store/DarkModeStore';

function Board() {
  const { board, setBoardState } = useBoardStore();
  const isDark = useDarkModeStore((state) => state.isDark);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) return;

    if (type === 'column') {
      const newColumns = [...board.columns];
      const [removed] = newColumns.splice(source.index, 1);
      newColumns.splice(destination.index, 0, removed);
      setBoardState({ columns: newColumns });
    } else if (type === 'task') {
      if (source.droppableId === destination.droppableId) {
        const sourceColumn = board.columns.find((col) => col.id === source.droppableId);
        if (sourceColumn) {
          const newTasks = [...sourceColumn.tasks];
          const [removed] = newTasks.splice(source.index, 1);
          newTasks.splice(destination.index, 0, removed);

          const newColumns = board.columns.map((col) =>
            col.id === source.droppableId ? { ...col, tasks: newTasks } : col
          );

          setBoardState({ columns: newColumns });
        }
      } else {
        const sourceColumn = board.columns.find((col) => col.id === source.droppableId);
        const destinationColumn = board.columns.find((col) => col.id === destination.droppableId);

        if (sourceColumn && destinationColumn) {
          const sourceTasks = [...sourceColumn.tasks];
          const [removed] = sourceTasks.splice(source.index, 1);
          const destinationTasks = [...destinationColumn.tasks];
          destinationTasks.splice(destination.index, 0, removed);

          const newColumns = board.columns.map((col) =>
            col.id === source.droppableId
              ? { ...col, tasks: sourceTasks }
              : col.id === destination.droppableId
              ? { ...col, tasks: destinationTasks }
              : col
          );

          setBoardState({ columns: newColumns });
        }
      }
    }
  };

  return (
    <div className={isDark ? 'bg-black h-screen' : ''}>
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
