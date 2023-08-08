import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
  } from "@material-tailwind/react";
import {BsThreeDotsVertical} from 'react-icons/bs'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { useBoardStore } from '../store/BoardStore';



type DropdownProps = {
  task: Task;
  index: number;
  id: ParentType;
  onEditClick: () => void;
}

function DropdownMenu({task, id, onEditClick}: DropdownProps){
  const [deleteTask] = useBoardStore((state) => [state.deleteTask, state.setUpdateTaskInput, state.updateTaskInput, state.updateTask])

  
  return (
    <div>
      <div className="hidden md:flex">
        <Menu placement='bottom'>
        <MenuHandler>
            <button><BsThreeDotsVertical/></button>
        </MenuHandler>
        <MenuList className='grid rounded-lg text-[14px] md:py-3 py-4 shadow-md text-start bg-white md:px-2'>
          <MenuItem>
                <button onClick={onEditClick} className='rounded-lg md:px-[9px] px-2 md:w-24 w-20 text-center md:text-[15px] hover:bg-slate-200 py-1 md:py-2'>
                  <div className="flex items-center gap-2">
                    <FaEdit/>
                    <p>Edit</p>
                  </div>
                </button>
          </MenuItem>
          <MenuItem >
              <button onClick={() => deleteTask(task.$id, id)} className='rounded-lg px-[8px] w-20 text-center md:text-[15px] hover:bg-slate-200 py-1 md:py-2'>
                <div className="flex items-center gap-2">
                  <FaTrash />
                  <p>Delete</p>
                </div>
              </button>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
    <div className="md:hidden">
    <Menu placement='bottom-start'>
        <MenuHandler>
            <button><BsThreeDotsVertical/></button>
        </MenuHandler>
        <MenuList className='grid rounded-lg text-[14px] md:py-3 py-4 shadow-md text-start bg-white md:px-2'>
          <MenuItem>
                <button onClick={onEditClick} className='rounded-lg md:px-[9px] px-2 md:w-24 w-20 text-center md:text-[15px] hover:bg-slate-200 py-1 md:py-2'>
                  <div className="flex items-center gap-2">
                    <FaEdit/>
                    <p>Edit</p>
                  </div>
                </button>
          </MenuItem>
          <MenuItem >
              <button onClick={() => deleteTask(task.$id, id)} className='rounded-lg px-[8px] w-20 text-center md:text-[15px] hover:bg-slate-200 py-1 md:py-2'>
                <div className="flex items-center gap-2">
                  <FaTrash />
                  <p>Delete</p>
                </div>
              </button>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  </div>
);
}

export default DropdownMenu