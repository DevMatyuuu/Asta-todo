import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
  } from "@material-tailwind/react";
import {BsThreeDotsVertical} from 'react-icons/bs'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { useBoardStore } from '../store/BoardStore';
import {GoArrowSwitch} from 'react-icons/go'



type DropdownProps = {
  task: Task;
  index: number;
  id: ParentType;
  onEditClick: () => void;
}


function DropdownMenu({task, id, onEditClick}: DropdownProps){
  const [deleteTask] = useBoardStore((state) => [state.deleteTask])

  
  return (
    //I created two menu, one for big and the the other one is for small screen sizes. 
    <div>
      <div className="hidden md:flex">
        <Menu placement='bottom' >
        <MenuHandler>
            <button><BsThreeDotsVertical/></button>
        </MenuHandler>
        <MenuList className='grid rounded-lg text-[14px] md:py-3 py-4 shadow-md text-start bg-white'>
        <MenuItem>
                <Menu placement="right">
                <MenuHandler className='flex gap-2 items-center rounded-lg md:px-[9px] px-2 md:w-28 w-20 text-center md:text-[15px] hover:bg-slate-200 py-1 md:py-2'>
                  <button className="flex items-center">
                    <GoArrowSwitch />
                    <p>Move to</p>
                  </button>
                </MenuHandler>
                <MenuList className="rounded-md py-3 md:ml-3 md:mt-8">
                  <MenuItem className="rounded-lg">
                    <div className="grid gap-2 justify-center">
                      <p className="hover:bg-slate-200 md:w-24 rounded-md py-1 pl-2">To-do</p>
                      <p className="hover:bg-slate-200 md:w-24 rounded-md py-1 pl-2">In-progress</p>
                      <p className="hover:bg-slate-200 md:w-24 rounded-md py-1 pl-2">Done</p>
                    </div>
                  </MenuItem>
                </MenuList>
                </Menu>
          </MenuItem>
          <MenuItem>
                <button onClick={onEditClick} className='rounded-lg md:px-[9px] px-2 md:w-28 w-20 text-center md:text-[15px] hover:bg-slate-200 py-1 md:py-2'>
                  <div className="flex items-center gap-2">
                    <FaEdit/>
                    <p>Edit</p>
                  </div>
                </button>
          </MenuItem>
          <MenuItem >
              <button onClick={() => deleteTask(task.$id, id)} className='rounded-lg px-[8px] md:w-28 text-center md:text-[15px] hover:bg-slate-200 py-1 md:py-2'>
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