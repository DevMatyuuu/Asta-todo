import { FormEvent, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useAddModalStore } from '../store/AddModalStore'
import { useBoardStore } from '../store/BoardStore';
import { Button } from '@material-tailwind/react';
import { useDarkModeStore } from '../store/DarkModeStore';



function AddModal() {
  const [isOpen, modalClose, modalCategoryTitle] = useAddModalStore((state) => [state.isOpen, state.modalClose, state.modalCategoryTitle, state.setModalCategoryTitle]);
  const [addTask, addTaskInput, setAddTaskInput] = useBoardStore((state) => [state.addTask, state.addTaskInput, state.setAddTaskInput]);
  const isDark = useDarkModeStore((state) => state.isDark)

  let title = '';
  if (modalCategoryTitle === 'To-do' ) {
    title = 'Add To-do';
  } else if (modalCategoryTitle === 'In-progress') {
    title = 'Add In-progress'
  } else if (modalCategoryTitle === 'Done') {
    title = 'Add Done'
  }


  const handleAddTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!addTaskInput) return;
    addTask(addTaskInput, modalCategoryTitle);
    setAddTaskInput('');
    modalClose(); 
  };  
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='form' onSubmit={handleAddTask} onClose={modalClose} className='flex absolute top-60 m-auto left-0 right-0'>
        <div className="fixed inset-0 bg-black/30 bg-opacity-25" />
          <Dialog.Panel className={`${isDark ? 'bg-[#1F2022]' : 'bg-slate-300'} transition-all mx-auto max-w-md transform overflow-hidden p-6 rounded-2xl shadow-xl align-middle w-full`}>
            <Dialog.Title className={`${isDark ? 'text-white' : 'text-black'} text-center md:mb-5 text-[18px]`}>{title}</Dialog.Title>
            <div>
                <input className='rounded-lg md:px-4 md:py-2 w-full md:mb-5' type='text' value={addTaskInput} onChange={(e) => setAddTaskInput(e.target.value)} placeholder='What is your task?'/>
            </div>
            <div className='flex gap-5 float-right'>
                <Button onClick={modalClose} className='bg-slate-500/20 hover:bg-slate-400 px-4'>
                    <p>Cancel</p>
                </Button>
                <Button className={`bg-slate-500/20 px-4 ${!addTaskInput ? 'text-slate-100' : 'text-black hover:bg-slate-400'} `} type='submit' disabled={!addTaskInput}>
                    <p>Add</p>
                </Button>
            </div>
          </Dialog.Panel>
      </Dialog>
    </Transition>
  )
}
export default AddModal