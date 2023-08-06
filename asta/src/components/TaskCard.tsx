import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from 'react-beautiful-dnd'
import DropdownMenu from './DropdownMenu';


type TaskCardProps = {
  task: Task;
  index: number;
  id: ParentType;
  innerRef: (element: HTMLElement | null ) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}


function TaskCard({task, index, id, innerRef, dragHandleProps, draggableProps,}: TaskCardProps) {

  return (
    <div {...draggableProps} {...dragHandleProps} ref={innerRef} className='bg-white/60 hover:bg-slate-500/20 w-[400px] mt-10 py-1 mx-auto rounded-lg space-y-2 px-5 drop-shadow-md'>
      <div className='flex justify-between items-center py-3'>
        <p className='md:max-w-[300px]'>{task.title}</p>
        <div className='flex gap-2 cursor-pointer text-lg'>
            <DropdownMenu task={task} index={index} id={id}/>
        </div>
      </div>
    </div>
  )
}

export default TaskCard