import { Draggable, Droppable } from 'react-beautiful-dnd'
import TaskCard from './TaskCard'
import { Button } from '@material-tailwind/react'
import {AiFillPlusCircle} from 'react-icons/ai'
import useModalStore from '../store/ModalStore'
import { useDarkModeStore } from '../store/DarkModeStore'
import { FaTrash } from 'react-icons/fa'



type ColumnProps = {
    id: ParentType,
    tasks: Task[],
    index: number
} 



function Column({id, tasks, index}: ColumnProps) {
    const [setModalCategoryTitle, addModalOpen,] = useModalStore((state) => [state.setModalCategoryTitle, state.addModalOpen,])
    const isDark = useDarkModeStore((state) => state.isDark)
    const clearModalOpen = useModalStore((state) => state.clearModalOpen)
    

   
    const handleAddTask = () => {
        addModalOpen()
        setModalCategoryTitle(id)
    }

    const handleClearTasks = () => {
        clearModalOpen()
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
                                className={`pb-7 p-2 rounded-xl shadow-sm ${isDark ? 'bg-[#1F2022]/40' : 'bg-slate-700/10'} ${snapshot.isDraggingOver ? `${isDark ? 'bg-slate-600/70' : 'bg-slate-500'}` : ''}`}>
                               <h2 className={` ${isDark ? 'text-white' : 'text-black'} flex mt-2 md:ml-5 ml-6 justify-between text-[17px] font-semibold`}>{id}
                               <p className={`${isDark ? 'text-white' : 'text-black'} md:mr-2 mr-6 bg-slate-600/40 rounded-full w-6  h-6 md:pt-[2px] pt-[1px] text-sm text-center`}>{tasks.length}</p>
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
                               <div className='justify-center flex gap-3'>
                                    <Button  onClick={handleClearTasks} className={`${isDark ? 'bg-[#1F2022]' : 'bg-slate-400/30' }  w-[130px] disabled:cursor-not-allowed disabled:hover:bg-slate-400/30 mt-5 md:mt-5 py-0 hover:bg-slate-500/50 }`} disabled={tasks.length === 0}>
                                        <div className={` ${isDark ? 'text-white' : 'text-black'} flex items-center justify-center gap-1`}>
                                            <FaTrash /> 
                                            <p className='text-[15px]'>Clear All</p>
                                        </div>
                                    </Button>
                                    <Button onClick={handleAddTask} className={`${isDark ? 'bg-[#1F2022]' : 'bg-slate-400/30' }  w-[270px]  mt-5 md:mt-5 py-3 hover:bg-slate-500/50`}>
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