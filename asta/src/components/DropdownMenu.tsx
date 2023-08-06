import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
  } from "@material-tailwind/react";
import {BsThreeDotsVertical} from 'react-icons/bs'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { Tooltip } from '@material-tailwind/react';
import { useBoardStore } from '../store/BoardStore';

type ActionProps = {
  task: Task;
  index: number;
  id: ParentType;
}

function DropdownMenu({task, id,}: ActionProps){
  const deleteTask = useBoardStore((state) => state.deleteTask)
  return (
    <Menu placement='bottom'>
    <MenuHandler>
        <button><BsThreeDotsVertical/></button>
    </MenuHandler>
    <MenuList className='grid gap-4 rounded-lg text-[14px] py-3 px-1 shadow-md text-center bg-white'>
      <MenuItem className='rounded-lg px-5 text-center text-lg'>
        <Tooltip content="Edit" placement="right" className="text-black bg-slate-300 font-normal px-3 font-poppins" animate={{ mount: { scale: 1, y: 2, x:10 },unmount: { scale: 0, y: 0 },}} >
            <button><FaEdit /></button>
        </Tooltip>
      </MenuItem>
      <MenuItem className='rounded-lg px-5 text-center text-lg'>
        <Tooltip content="Delete" placement="right" className="text-black bg-slate-300 font-normal px-3 font-poppins" animate={{ mount: { scale: 1, y: 2, x:10 },unmount: { scale: 0, y: 0 },}}>
          <button onClick={() => deleteTask(task.$id, id)}><FaTrash /></button>
        </Tooltip>
      </MenuItem>
    </MenuList>
  </Menu>
);
}

export default DropdownMenu