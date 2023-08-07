import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from 'react-beautiful-dnd'
import DropdownMenu from './DropdownMenu';
import { useUpdateTaskStore } from '../store/UpdateTaskStore';
import { useBoardStore } from '../store/BoardStore';
import { useEffect, useRef } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';



type TaskCardProps = {
  task: Task;
  index: number;
  id: ParentType;
  innerRef: (element: HTMLElement | null ) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}


function TaskCard({task, index, id, innerRef, dragHandleProps, draggableProps,}: TaskCardProps) {
  const [closeInput, updatingTaskId, openInput] = useUpdateTaskStore((state) => [state.closeInput, state.updatingTaskId, state.openInput])
  const [setUpdateTaskInput, updateTaskInput ,updateTask] = useBoardStore((state) => [state.setUpdateTaskInput, state.updateTaskInput, state.updateTask])

  const isUpdatingSpecificTask = updatingTaskId === task.$id;

  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleUpdateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (updateTaskInput.trim() !== '') { // Check if the input is not empty
      updateTask(task.$id, updateTaskInput);
      closeInput();
    }
  };

  const handleInputBlur = () => {
    // Reset the input to the initial task title when clicked outside the input
    setUpdateTaskInput(task.title);
    closeInput();
  };

  const handleEditClick = () => {
    setUpdateTaskInput(task.title);
    openInput(task.$id);
  };

  useEffect(() => {
    const handleClickOutsideInput = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        handleInputBlur();
      }
    };

    document.addEventListener('mousedown', handleClickOutsideInput);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideInput);
    };
  }, []);

  return (
    <div {...draggableProps} {...dragHandleProps} ref={innerRef} className='bg-white/60 hover:bg-slate-500/20 w-[400px] mt-10 py-1 mx-auto rounded-lg space-y-2 px-5 drop-shadow-md'>
      <div className='flex justify-between items-center py-3'>
      {!isUpdatingSpecificTask ? (
          <p className='md:max-w-[300px]'>{task.title}</p>
        ) : (
          <form onSubmit={handleUpdateTask}>
            <input ref={inputRef} value={updateTaskInput} onChange={(e) => setUpdateTaskInput(e.target.value)} onBlur={handleInputBlur} className='md:max-w-[300px] md:w-[300px] md:h-10 rounded-lg md:pl-3' />
            <div className='absolute top-7 right-24'>
              <AiFillCloseCircle />
            </div>
          </form>
        )}
        <div className='flex gap-2 cursor-pointer text-lg'>
            <DropdownMenu task={task} index={index} id={id} onEditClick={handleEditClick}/>
        </div>
      </div>
    </div>
  )
}

export default TaskCard