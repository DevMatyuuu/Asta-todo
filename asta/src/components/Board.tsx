import { useEffect } from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { useBoardStore } from '../store/BoardStore';
import Column from './Column';


function Board() {
    const [getBoard, board, setBoardState,] = useBoardStore((state) => [state.getBoard, state.board, state.setBoardState, state.addTask, state.addTaskInput,]);
    

    useEffect(() => {
        getBoard();
      }, [getBoard]);

    const handleonDragEnd = (result: DropResult) => {
        const {destination, source, type} = result;

        //if no valid destination go back to initial destination or do nothing
        if (!destination) return;

        //if dropped in a valid destination, the dragged whole column will have a new arrangement
        if (type === 'column') {
            const entries = Array.from(board.columns.entries());
            const [removed] = entries.splice(source.index, 1);
            entries.splice(destination.index, 0, removed);
            const finalArrangement = new Map(entries);
            setBoardState({columns: finalArrangement,
            })
        };

        const columns = Array.from(board.columns);
        const initialPosIndex = columns[Number(source.droppableId)];
        const finalPosIndex = columns[Number(destination.droppableId)];

        const initialCol: Column = {
            id: initialPosIndex[0],
            tasks: initialPosIndex[1].tasks
        };

        const finalCol: Column = {
            id: finalPosIndex[0],
            tasks: finalPosIndex[1].tasks
        };

        //same as on the logic above, if no valid destination do nothing
        if (!initialCol || !finalCol) return;

        if (!initialPosIndex || !finalPosIndex) {
            console.error('Column with the specified ID not found.');
            return;
          }

        //if dropped in the same column and same index, do nothing
        if (source.index === destination.index && initialCol === finalCol) return;

        const arrangedTasks = initialCol.tasks;
        const [taskDragged] = arrangedTasks.splice(source.index, 1);

        if (initialCol.id === finalCol.id) {
            //dragging of task in the same xolumn
            arrangedTasks.splice(destination.index, 0, taskDragged);
            const newCol = {
                id: initialCol.id,
                tasks: arrangedTasks,
            };
            const newColumns = new Map(board.columns);
            newColumns.set(initialCol.id, newCol);
        
            setBoardState({columns: newColumns})
        } else {
            //dragging of task from one to another column
            const migrateTasks = Array.from(finalCol.tasks);
            migrateTasks.splice(destination.index, 0, taskDragged);;
            const newCol = {
                id: initialCol.id,
                tasks: arrangedTasks,
            };
            const newColumns = new Map(board.columns);
            newColumns.set(initialCol.id, newCol);
            newColumns.set(finalCol.id, {
                id: finalCol.id,
                tasks: migrateTasks,
            });

            setBoardState({columns: newColumns})
        };
    };


  return (
<div>
      <DragDropContext onDragEnd={handleonDragEnd}>
        <Droppable droppableId='board' direction='horizontal' type='column'>
          {(provided) => (
            <div
              className='grid grid-cols-1 md:grid-cols-3 gap-5 p-5 max-w-[1400px] mx-auto md:mt-5'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {Array.from(board.columns.values()).map((column, index) => (
                <Column key={column.id} id={column.id} tasks={column.tasks} index={index} />
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default Board