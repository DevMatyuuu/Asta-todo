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
import useModalStore from "../store/ModalStore";
import { useState } from "react";



type DropdownProps = {
  task: Task;
  index: number;
  id: ParentType;
  onEditClick: () => void;
}


function DropdownMenu({task, id, onEditClick}: DropdownProps){
  const [deleteTask, moveTask] = useBoardStore((state) => [state.deleteTask, state.moveTask])
  const modalCategoryTitle = useModalStore((state) => state.modalCategoryTitle)
  const [selectedColumn, setSelectedColumn] = useState('');



  const handleMoveTask = (targetColumnId: ParentType) => {
    if (modalCategoryTitle && task.$id && targetColumnId) {
      moveTask(task.$id, targetColumnId);
    }
  }
  
  return (
    //I created two menu, one for big and the the other one is for small screen sizes. 
    <div>
      <div className="hidden lg:flex">
        <Menu placement='bottom' >
        <MenuHandler>
            <button><BsThreeDotsVertical/></button>
        </MenuHandler>
        <MenuList className='grid rounded-lg text-[14px] lg:py-3 py-4 shadow-lg text-start bg-white'>
        <MenuItem>
                <Menu placement="right">
                <MenuHandler className='flex gap-2 items-center rounded-lg lg:px-[9px] px-2 lg:w-28 w-20 text-center lg:text-[15px] hover:bg-slate-200 py-1 lg:py-2'>
                  <button className="flex items-center">
                    <GoArrowSwitch />
                    <p>Move to</p>
                  </button>
                </MenuHandler>
                <MenuList className="rounded-lg py-3 lg:ml-3 lg:mt-8">
                  <MenuItem className="rounded-lg">
                    <div className="grid gap-2 justify-center">
                        <p
                        className={`hover:bg-slate-200 lg:w-24 rounded-lg py-1 pl-2 cursor-pointer ${
                          selectedColumn === 'To-do' ? 'bg-slate-200' : ''
                        }`}
                        onClick={() => {
                          setSelectedColumn('To-do');
                          handleMoveTask('To-do'); // Pass the target column id here
                        }}
                      >
                        To-do
                      </p>
                      <p
                        className={`hover:bg-slate-200 lg:w-24 rounded-lg py-1 pl-2 cursor-pointer ${
                          selectedColumn === 'To-do' ? 'bg-slate-200' : ''
                        }`}
                        onClick={() => {
                          setSelectedColumn('In-progress');
                          handleMoveTask('In-progress'); 
                        }}
                      >
                        In-progress
                      </p>
                      <p
                        className={`hover:bg-slate-200 lg:w-24 rounded-lg py-1 pl-2 cursor-pointer ${
                          selectedColumn === 'To-do' ? 'bg-slate-200' : ''
                        }`}
                        onClick={() => {
                          setSelectedColumn('Done');
                          handleMoveTask('Done'); 
                        }}
                      >
                        Done
                      </p>
                    </div>
                  </MenuItem>
                </MenuList>
                </Menu>
          </MenuItem>
          <MenuItem>
                <button onClick={onEditClick} className='rounded-lg lg:px-[9px] px-2 lg:w-28 w-20 text-center lg:text-[15px] hover:bg-slate-200 py-1 lg:py-2'>
                  <div className="flex items-center gap-2">
                    <FaEdit/>
                    <p>Edit</p>
                  </div>
                </button>
          </MenuItem>
          <MenuItem >
              <button onClick={() => deleteTask(task.$id, id)} className='rounded-lg px-[8px] lg:w-28 text-center lg:text-[15px] hover:bg-slate-200 py-1 lg:py-2'>
                <div className="flex items-center gap-2">
                  <FaTrash />
                  <p>Delete</p>
                </div>
              </button>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>

    <div className="lg:hidden">
    <Menu placement='bottom-start'>
        <MenuHandler>
            <button><BsThreeDotsVertical/></button>
        </MenuHandler>
        <MenuList className='grid rounded-lg text-[14px] lg:py-3 py-4 shadow-lg text-start bg-white lg:px-2 '>
        <MenuItem>
                <Menu placement="left">
                <MenuHandler className='flex gap-2 items-center rounded-lg lg:px-[9px] px-2 lg:w-28 w-24 text-center lg:text-[15px] hover:bg-slate-200 py-1 lg:py-2'>
                  <button className='rounded-lg lg:px-[9px] px-2 lg:w-24 w-24 text-center lg:text-[15px] hover:bg-slate-200 py-1 lg:py-2'>
                    <GoArrowSwitch />
                    <p>Move to</p>
                  </button>
                </MenuHandler>
                <MenuList className="rounded-lg py-3 lg:ml-3 lg:mt-8 mt-8">
                  <MenuItem className="rounded-lg">
                    <div className="grid gap-2 justify-center">
                        <p
                        className={`hover:bg-slate-200 lg:w-24 rounded-lg py-1 pl-2 cursor-pointer ${
                          selectedColumn === 'To-do' ? 'bg-slate-200' : ''
                        }`}
                        onClick={() => {
                          setSelectedColumn('To-do');
                          handleMoveTask('To-do'); // Pass the target column id here
                        }}
                      >
                        To-do
                      </p>
                      <p
                        className={`hover:bg-slate-200 lg:w-24 rounded-lg py-1 pl-2 cursor-pointer ${
                          selectedColumn === 'To-do' ? 'bg-slate-200' : ''
                        }`}
                        onClick={() => {
                          setSelectedColumn('In-progress');
                          handleMoveTask('In-progress'); 
                        }}
                      >
                        In-progress
                      </p>
                      <p
                        className={`hover:bg-slate-200 lg:w-24 rounded-lg py-1 pl-2 cursor-pointer ${
                          selectedColumn === 'To-do' ? 'bg-slate-200' : ''
                        }`}
                        onClick={() => {
                          setSelectedColumn('Done');
                          handleMoveTask('Done'); 
                        }}
                      >
                        Done
                      </p>
                    </div>
                  </MenuItem>
                </MenuList>
                </Menu>
          </MenuItem>
          <MenuItem>
                <button onClick={onEditClick} className='rounded-lg lg:px-[9px] px-2 lg:w-24 w-20 text-center lg:text-[15px] hover:bg-slate-200 py-1 lg:py-2'>
                  <div className="flex items-center gap-2">
                    <FaEdit/>
                    <p>Edit</p>
                  </div>
                </button>
          </MenuItem>
          <MenuItem >
              <button onClick={() => deleteTask(task.$id, id)} className='rounded-lg px-[8px] w-20 text-center lg:text-[15px] hover:bg-slate-200 py-1 lg:py-2'>
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