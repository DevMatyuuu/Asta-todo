import { Draggable, Droppable } from 'react-beautiful-dnd'
import TaskCard from './TaskCard'
import { Button } from '@material-tailwind/react'
import {AiFillPlusCircle} from 'react-icons/ai'
import { useAddModalStore } from '../store/AddModalStore'


type ColumnProps = {
    id: ParentType,
    tasks: Task[],
    index: number
} 



function Column({id, tasks, index}: ColumnProps) {
    const [setModalCategoryTitle, modalOpen,] = useAddModalStore((state) => [state.setModalCategoryTitle, state.modalOpen,])

   
    const handleAddTask = () => {
        modalOpen()
        setModalCategoryTitle(id)
    }



  return (
    <Draggable draggableId={id} index={index}>
        {(provided) => (
            <div 
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}>
                    <Droppable droppableId={index.toString()} type='card'>
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className={`pb-7 p-2 rounded-2xl shadow-sm ${snapshot.isDraggingOver ? 'bg-slate-300' : 'bg-slate-400/20'}`}>
                               <h2 className='flex md:ml-5 ml-3 justify-between text-[17px]'>{id}
                               <p className='md:mr-2 bg-slate-400/40 rounded-full w-8 h-7 text-center'>{tasks.length}</p>
                               </h2>
                               <div className='space-y-2'>
                                    {tasks.map((task, index) => (
                                        <Draggable key={task.$id} draggableId={task.$id} index={index}>
                                            {(provided) => (
                                                <TaskCard task={task} index={index} id={id} innerRef={provided.innerRef} draggableProps={provided.draggableProps} dragHandleProps={provided.dragHandleProps}/>
                                            )}
                                        </Draggable>   
                                    ))}
                                {provided.placeholder}
                               </div>
                               <div>
                                    <Button onClick={handleAddTask} className='bg-slate-500/20 w-[400px] md:ml-3 md:mt-5 py-3 hover:bg-slate-500/50'>
                                        <div className='flex items-center justify-center gap-1'>
                                            <AiFillPlusCircle size={20}/> 
                                            <p className='text-[15px]'>Add</p>
                                        </div>
                                    </Button>
                                </div>
                            </div>
                            
                        )}
                    </Droppable>

            </div>
        )}
    </Draggable>
  )
}

export default Column