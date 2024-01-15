import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from 'react-beautiful-dnd'
import DropdownMenu from './DropdownMenu';
import { useEditModeStore} from '../store/EditModeStore';
import { useBoardStore } from '../store/BoardStore';
import { useEffect, useRef } from 'react';
import { useDarkModeStore } from '../store/DarkModeStore';
import { BsXCircleFill } from 'react-icons/bs'
import { Typography } from '@material-tailwind/react';

type TaskCardProps = {
  task: Task;
  index: number;
  id: ParentType;
  innerRef: (element: HTMLElement | null ) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}


function TaskCard({task, index, id, innerRef, dragHandleProps, draggableProps,}: TaskCardProps) {
  const [closeInput, updatingTaskId, openInput] = useEditModeStore((state) => [state.closeInput, state.updatingTaskId, state.openInput])
  const [setUpdateTaskInput, updateTaskInput ,updateTask] = useBoardStore((state) => [state.setUpdateTaskInput, state.updateTaskInput, state.updateTask])
  const isDark = useDarkModeStore((state) => state.isDark)

  const isUpdatingSpecificTask = updatingTaskId === task.$id;

  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleUpdateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (updateTaskInput.trim() !== '') {
      updateTask(task.$id, updateTaskInput);
      closeInput();
    }
  };


  // Reset the input to the initial task title when clicked outside the input
  const handleInputBlur = () => {
    setUpdateTaskInput(task.title);
    closeInput();
  };

  const handleEdit = () => {
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
    <div {...draggableProps} {...dragHandleProps} ref={innerRef} className={`${isDark ? 'bg-[#1F2022] hover:bg-slate-500/20' : 'bg-white/60  hover:bg-slate-500/20'} w-[95%] mt-10 py-1 mx-auto rounded-lg space-y-2 px-5 drop-shadow-md`}>
      <div className='flex justify-between items-center py-3'>
      {!isUpdatingSpecificTask ? (
          <Typography className={`${isDark ? 'text-white' : 'text-black'} max-w-[90%] break-all`}>{task.title}</Typography>

        ) : (
          <form onSubmit={handleUpdateTask}>
            <input ref={inputRef} value={updateTaskInput} onChange={(e) => setUpdateTaskInput(e.target.value)} onBlur={handleInputBlur} className='w-[320px] lg:w-[330px] h-auto pl-4 pr-12 py-2 rounded-lg break-all' />
            <div className='absolute top-[28px] right-[80px] md:right-[65px] hover:text-red-700'>
              <BsXCircleFill size={18}/>
            </div>
          </form>
          )}
        <div className={` ${isDark ? 'text-white' : 'text-black'} flex gap-2 cursor-pointer text-lg`}>
            <DropdownMenu task={task} index={index} id={id} onEditClick={handleEdit}/>
        </div>
      </div>
    </div>
  )
}

export default TaskCard