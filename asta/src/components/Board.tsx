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
  
    if (type === 'task') {
      if (source.droppableId === destination.droppableId) {
        // Reorder task within the same column
        const column = board.columns.find((col) => col.id === source.droppableId);
  
        if (column) {
          const newTasks = [...column.tasks];
          const [movedTask] = newTasks.splice(source.index, 1);
          newTasks.splice(destination.index, 0, movedTask);
  
          const newColumns = board.columns.map((col) =>
            col.id === source.droppableId ? { ...col, tasks: newTasks } : col
          );
  
          setBoardState({ columns: newColumns });
        }
      } else {
        // Move task from one column to another
        const sourceColumn = board.columns.find((col) => col.id === source.droppableId);
        const destinationColumn = board.columns.find((col) => col.id === destination.droppableId);
  
        if (sourceColumn && destinationColumn) {
          const sourceTasks = [...sourceColumn.tasks];
          const [movedTask] = sourceTasks.splice(source.index, 1);
          const destinationTasks = [...destinationColumn.tasks];
          destinationTasks.splice(destination.index, 0, movedTask);
  
          // Get the index of the destination column
          const destinationIndex = board.columns.findIndex(
            (col) => col.id === destination.droppableId
          );
  
          // Update the status of the moved task based on the index
          // You can change this logic to suit your needs
          let newStatus: ParentType;
          switch (destinationIndex) {
            case 0:
              newStatus = 'To-do';
              break;
            case 1:
              newStatus = 'In-progress';
              break;
            case 2:
              newStatus = 'Done';
              break;
            default:
              newStatus = 'To-do';
          }
          movedTask.status = newStatus;
  
          const updatedColumns = board.columns.map((col) =>
            col.id === source.droppableId
              ? { ...col, tasks: sourceTasks }
              : col.id === destination.droppableId
              ? { ...col, tasks: destinationTasks }
              : col
          );
  
          setBoardState({ columns: updatedColumns });
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
                className="grid grid-cols-1 lg:grid-cols-3 gap-5 p-5 max-w-[1400px] mx-auto"
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
