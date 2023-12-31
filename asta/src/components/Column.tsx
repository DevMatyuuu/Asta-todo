import { Draggable, Droppable } from 'react-beautiful-dnd'
import TaskCard from './TaskCard'
import { Button } from '@material-tailwind/react'
import {AiFillPlusCircle} from 'react-icons/ai'
import useModalStore from '../store/ModalStore'
import { useDarkModeStore } from '../store/DarkModeStore'




type ColumnProps = {
    id: ParentType,
    tasks: Task[],
    index: number
} 



function Column({id, tasks, index}: ColumnProps) {
    const [setModalCategoryTitle, addModalOpen,] = useModalStore((state) => [state.setModalCategoryTitle, state.addModalOpen,])
    const isDark = useDarkModeStore((state) => state.isDark)
  
    

   
    const handleAddTask = () => {
        addModalOpen()
        setModalCategoryTitle(id)
    }


  return (
    <Draggable draggableId={id} index={index}>
        {(provided) => (
            <div 
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}>
                    <Droppable droppableId={id} type='task'>
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className={`pb-7 p-2 rounded-xl shadow-sm ${isDark ? 'bg-[#1F2022]/40' : 'bg-slate-700/10'} ${snapshot.isDraggingOver ? `${isDark ? 'bg-[#2E3033]' : 'bg-slate-800/20'}` : ''}`}>
                               <h2 className={` ${isDark ? 'text-white' : 'text-black'} flex mt-2 lg:ml-3 sm:ml-6 ml-4 justify-between text-[17px] font-semibold`}>{id}
                               <p className={`${isDark ? 'text-white' : 'text-black'} lg:mr-2 mr-3 sm:mr-5 bg-slate-600/40 rounded-full w-6  h-6 lg:pt-[2px] pt-[2px] pr-[1px] text-sm text-center`}>{tasks.length}</p>
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
                               <div className='flex justify-center '>
                                    <Button onClick={handleAddTask} className={`${isDark ? 'bg-[#1F2022]' : 'bg-slate-400/30' }  w-[95%]  lg:ml-0 mt-5 lg:mt-5 py-3 hover:bg-slate-500/50`}>
                                        <div className={` ${isDark ? 'text-white' : 'text-black'} flex items-center justify-center gap-1`}>
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