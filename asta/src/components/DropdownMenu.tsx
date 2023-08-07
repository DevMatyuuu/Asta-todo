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
    <Menu placement='bottom'>
    <MenuHandler>
        <button><BsThreeDotsVertical/></button>
    </MenuHandler>
    <MenuList className='grid rounded-lg text-[14px] py-3 shadow-md text-start bg-white'>
      <MenuItem>
            <button onClick={onEditClick} className='rounded-lg px-7 text-start md:text-[15px] hover:bg-slate-200 md:py-2'>
              <div className="flex items-center gap-2">
                <FaEdit/>
                <p>Edit</p>
              </div>
            </button>
      </MenuItem>
      <MenuItem >
          <button onClick={() => deleteTask(task.$id, id)} className='rounded-lg px-5 text-center md:text-[15px] hover:bg-slate-200 md:py-2'>
            <div className="flex items-center gap-2">
              <FaTrash />
              <p>Delete</p>
            </div>
          </button>
      </MenuItem>
    </MenuList>
  </Menu>
);
}

export default DropdownMenu